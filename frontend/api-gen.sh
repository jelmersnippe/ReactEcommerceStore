#!/bin/bash

while getopts ":u:s:o:" opt; do
    case $opt in
        u) apiUrl="$OPTARG" ;;
        s) apiSpec="$OPTARG" ;;
        o) outputFile="$OPTARG" ;;
        \?) echo "Invalid option -$OPTARG" >&2 ;;
    esac
done

if [ -z "$apiUrl" ]; then
    echo "[ERROR] Please specify an apiUrl with the -u option"
    exit 1
fi

if [ -z "$apiSpec" ]; then
    echo "[ERROR] Please specify an apiSpec location with the -s option"
    exit 1
fi

if [ -z "$outputFile" ]; then
    echo "[ERROR] Please specify an output file with the -o option"
    exit 1
fi

generatedPath="./generated"

mkdir -p $generatedPath

echo "[STEP 1] Downloading API spec"
wget -O $generatedPath/swagger-json "$apiSpec" || exit 1

echo "[STEP 2] Generating API client"
npx openapi-generator-cli generate -g typescript-axios -i $generatedPath/swagger-json --remove-operation-id-prefix -o $generatedPath --skip-validate-spec || { echo "[ERROR] Make sure openapi-generator-cli is installed. Run npm install -D @openapitools/openapi-generator-cli"; exit 1; }

echo "[STEP 3] Removing unnecessary generated files"
rm -rf $generatedPath/.gitignore $generatedPath/.npmignore $generatedPath/.openapi-generator-ignore $generatedPath/git_push.sh $generatedPath/.openapi-generator

# Check if output file already exist, and ask for confirmation to overwrite the file
if [ -f $"$outputFile" ]; then
    read -p "[WARNING] $outputFile already exists. Performing this action will overwrite the file. Are you sure? [y/Y] " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "[STEP 4] Writing to output file"
mkdir -p "${outputFile%/*}"

calculateRelativePath() {
    local pos="${1%%/}" ref="${2%%/}" down=''

    while :; do
        test "$pos" = '/' && break
        case "$ref" in $pos/*) break ;; esac
        down="../$down"
        pos=${pos%/*}
    done

    echo "$down${ref##$pos/}"
}

# Calculated relative path for imports
absoluteOutputPath="$(cd -P -- "${outputFile%/*}" && pwd)"
absoluteGeneratedPath="$(cd -P -- "$generatedPath" && pwd)"
relativePath=$(calculateRelativePath "$absoluteOutputPath" "$absoluteGeneratedPath")

# Parse the generated api file and get all the different API endpoints
availableApis=()
input="$generatedPath/api.ts"
while IFS= read -r line; do
    if [[ $line =~ "Api extends BaseAPI" ]]; then
        lineElements=($line)
        for element in "${lineElements[@]}"; do
            if [[ $element =~ "Api" ]]; then
                availableApis+=("$element")
                echo "$element"
            fi
        done
    fi
done <"$input"

# Create a list of all imports
printf -v apiImports '\n\t%s,' "${availableApis[@]}"

# Create a new class instance for every API endpoint
apiDeclarations=()
for api in "${availableApis[@]}"; do
    apiName=${api%Api}
    apiName="$(tr '[:upper:]' '[:lower:]' <<<"${apiName:0:1}")${apiName:1}"
    apiDeclarations+=("$apiName = new $api(this.apiConfig)")
done

# Output everything into src/config/api.ts
cat >"$outputFile" <<EOL
import globalAxios from 'axios';
import {Configuration} from '${relativePath}';
import {${apiImports%,}
} from '${relativePath}';

globalAxios.interceptors.request.use((requestConfig) => {
    console.log('axios request', requestConfig);
    return requestConfig;
});

globalAxios.interceptors.response.use((response) => {
    console.log('axios response', response);
    return response;
});

const baseUrl = ${apiUrl};

class Api {
    apiConfig = new Configuration({basePath: baseUrl});

    $(printf '%s\n\t' "${apiDeclarations[@]}")
    setBearerAccessToken(accessToken: string) {
        this.apiConfig = new Configuration({basePath: baseUrl, accessToken: accessToken})
        this.updateApiInstances()
    }

    removeAccessToken() {
        this.apiConfig = new Configuration({basePath: baseUrl})
        this.updateApiInstances()
    }

    updateApiInstances() {
        $(printf 'this.%s\n\t\t' "${apiDeclarations[@]}")
    }
}

const api = new Api();

export default api;

EOL

echo "[FINISHED]"
