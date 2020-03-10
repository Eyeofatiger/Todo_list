import React from 'react';
import './SearchPanel.css';

const SearchPanel = (props)=>{

  const {onInputSearch} = props;

  return (
      <input type="text"
                className="form-control search-input"
                placeholder="type to search"
                onChange={ event => onInputSearch(event.target.value)} />
    );

}

export default SearchPanel;
