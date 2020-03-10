import React from 'react';
import './ItemAddForm.css';

class ItemAddForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            label: ''
        };
    }

    onLabelChange = (event)=> {
        this.setState({
            label: event.target.value
        });
    }

    onSubmitValue = (event)=> {
        event.preventDefault();
        this.props.addItem(this.state.label);
        this.setState({
            label: ''
        });
    }

    render(){
        return(
            <form className="ItemAddForm d-flex" onSubmit={this.onSubmitValue}>
                <input type="text"
                        className="form-control"
                        placeholder="What's need to be done..."
                        value={this.state.label}
                        onChange={this.onLabelChange} />
                <button className="btn btn-success" 
                        type="submit" >Add</button>
            </form>
        );
    }
}

export default ItemAddForm;