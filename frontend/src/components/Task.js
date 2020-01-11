import React from 'react';
import '../styles/Task.scss';

const Task = ({name, checked, handleChange}) => {
  return(
    <li className="list__item">
      <input 
        type="checkbox" 
        name={name}
        checked={checked} 
        onChange={handleChange}
      /> {name}
    </li>
  );
}

export default Task;