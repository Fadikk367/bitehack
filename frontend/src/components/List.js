import React, {useState, useEffeft} from 'react';
import Task from './Task';
import '../styles/List.scss';



const List = props => {
  const [list, setList] = useState(props.list || null);

  const handleChange = (e) => {
    const newList = Object.assign({}, list);
    const idx = newList.tasks.findIndex(task => task.name === e.target.name);
    newList.tasks[idx].checked = e.target.checked;
    newList.completed = newList.tasks.reduce((total, b) => (total && b.checked));
    setList(newList);
  }

  const items = list.tasks.map(item => (
    <Task 
      key={item.id} 
      handleChange={handleChange} 
      name={item.name}
      checked={item.checked}
    ></Task>
  ));

  const style = {
    opacity: 1
  }

  return(
    <div className="list" style = {list.completed ? style : null}>
      <h3 className="list__header">Tasks:</h3>
      <ul className="list__list">
        {items}
      </ul>
    </div>
  );
}

export default List;