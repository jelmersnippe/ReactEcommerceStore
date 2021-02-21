import globalAxios from 'axios';
import {Configuration} from '../generated';
import {
	AppApi,
	CategoryApi,
	UserApi
} from '../generated';

globalAxios.interceptors.request.use((requestConfig) => {
    console.log('axios request', requestConfig);
    return requestConfig;
});

globalAxios.interceptors.response.use((response) => {
    console.log('axios response', response);
    return response;
});

const baseUrl = 'http://localhost:4040';

class Api {
    apiConfig = new Configuration({basePath: baseUrl});

    app = new AppApi(this.apiConfig)
	category = new CategoryApi(this.apiConfig)
	user = new UserApi(this.apiConfig)

    setBearerAccessToken(accessToken: string) {
        this.apiConfig = new Configuration({basePath: baseUrl, accessToken: accessToken})
        this.updateApiInstances()
    }

    removeAccessToken() {
        this.apiConfig = new Configuration({basePath: baseUrl})
        this.updateApiInstances()
    }

    updateApiInstances() {
        this.app = new AppApi(this.apiConfig)
		this.category = new CategoryApi(this.apiConfig)
		this.user = new UserApi(this.apiConfig)

    }
}

const api = new Api();

export default api;

