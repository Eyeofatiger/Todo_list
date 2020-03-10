import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import SearchPanel from '../SearchPanel/SearchPanel';
import TodoList from '../TodoList/TodoList';
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter';
import ItemAddForm from '../ItemAddForm/ItemAddForm';
import './App.css';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {todoData: [
      this.createTodoListItem('Drink Coffee'),
      this.createTodoListItem('Make Awesome App'),
      this.createTodoListItem('Have a lunch')],
      searchText: '',
      statusFilter: 'All'
    };
  }  

  maxId = 100;
  
  createTodoListItem = (label)=> {
    return { label, important: false, done: false, id: this.maxId++ }
  };  

  deleteItem = (id)=> {
    this.setState(({ todoData })=>{
      const idx = todoData.findIndex((el)=> el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, ...after];

      return {
        todoData: newArray
      }
    });
  };

  addItem = (text)=> {
    const newItem = this.createTodoListItem(text);

    this.setState(({todoData})=> {
      let newArr = [...todoData, newItem];
      
      return{
        todoData: newArr
      }
      
    });
  };

  toggleProperty = (arr, id, propName)=> {
    const idx = arr.findIndex((el)=> el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName]};

    return [ ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx+1)];    
  };

  onToggleImportant = (id)=> {
    this.setState(({ todoData })=> {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }      
    });
  };

  onToggleDone = (id)=> {
    this.setState(({ todoData })=> {
      return{
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });    
  };

  search = (arr, text)=>{
    return arr.filter((el)=> el.label.toLowerCase().indexOf(text.toLowerCase()) !== -1);
  };
    
  onInputSearch = (value)=> {
    this.setState({searchText: value})
  };

  onStatusChange = (value)=> {
    this.setState({statusFilter: value})
  };

  onButtonFilter = (arr, status)=>{
    return arr.filter((el)=> el.done === status);
  };

  render(){
    const { todoData, searchText, statusFilter } = this.state,
          doneCount = todoData.filter(el=> el.done).length,
          todoCount = todoData.length - doneCount;
    let filteredData;

    if(statusFilter === 'All'){
      filteredData = this.search(todoData, searchText);
    };

    if(statusFilter === 'Active'){
      filteredData = this.onButtonFilter(this.search(todoData, searchText), false);
    };

    if(statusFilter === 'Done'){
      filteredData = this.onButtonFilter(this.search(todoData, searchText), true);
    };

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onInputSearch={this.onInputSearch} />
          <ItemStatusFilter onStatusChange={this.onStatusChange}
                            filter={this.state.statusFilter}/>
        </div>

        <TodoList todos={filteredData}
                  onDeleted={ this.deleteItem }
                  onToggleImportant={ this.onToggleImportant }
                  onToggleDone={ this.onToggleDone } />
        <ItemAddForm addItem={this.addItem} />
      </div>
    );
  }
}