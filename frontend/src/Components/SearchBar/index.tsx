import './searchbar.scss';

import SearchIcon from '@material-ui/icons/Search';
import {FunctionComponent} from 'react';

const SearchBar: FunctionComponent = () => {
    return (
        <div className="searchbar">
            <input id="search-input" placeholder="Search the entire store..."/>
            <button className="action icon-link search">
                <SearchIcon className="icon"/>
            </button>
        </div>
    );
};

export default SearchBar;
