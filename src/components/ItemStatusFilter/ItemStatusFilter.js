import React from 'react';
import './ItemStatusFilter.css';

export default class ItemStatusFilter extends React.Component {

  constructor(props){
    super(props);

    this.state = { buttons:[
      {name: 'All'},
      {name: 'Active'},
      {name: 'Done'}
    ]};
  }
  
  render(){
    const {filter, onStatusChange} = this.props;

    const button = this.state.buttons.map((el)=>{
      const rez = filter === el.name;
      const putClass = rez ? 'btn-info' : 'btn-outline-secondary';
      return(
        <button type="button"
                className={`btn ${putClass}`}
                onClick={()=>onStatusChange(el.name)}
                key={el.name}>{el.name}</button>
      );
    });

    return (
      <div className="btn-group">
        {button}
      </div>
    );
  }
}