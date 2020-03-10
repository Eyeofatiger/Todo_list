import React from 'react';
import './ItemStatusFilter.css';

export default class ItemStatusFilter extends React.Component {
  
  render(){
    const {filter, onStatusChange} = this.props;
     let  putClassAll = '',
          putClassActive = '',
          putClassDone = '';
    
    if(filter === 'All'){
      putClassAll = 'btn-info';
      putClassActive = 'btn-outline-secondary';
      putClassDone = 'btn-outline-secondary';
    } 
    
    if(filter === 'Active'){
      putClassAll = 'btn-outline-secondary';
      putClassActive = 'btn-info';
      putClassDone = 'btn-outline-secondary';
    } 

    if(filter === 'Done'){
      putClassAll = 'btn-outline-secondary';
      putClassActive = 'btn-outline-secondary';
      putClassDone = 'btn-info';
    } 

    return (
      <div className="btn-group">
        <button type="button"
                className={`btn ${putClassAll}`}
                onClick={()=>onStatusChange('All')}>All</button>
        <button type="button"
                className={`btn ${putClassActive}`}
                onClick={()=>onStatusChange('Active')}>Active</button>
        <button type="button"
                className={`btn ${putClassDone}`}
                onClick={()=>onStatusChange('Done')}>Done</button>
      </div>
    );
  }
}