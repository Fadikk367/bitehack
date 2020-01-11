import React, {useEffect, useState} from 'react';
import '../styles/AddTaskForm.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const AddTaskForm = (props) => {
  const [listTitle, setListTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const list = {
      name: listTitle,
      dashboardID: '5e19f563b4237a46748739dc',
      tasks: [],
      tag: []
    }

    setListTitle(e.target.value);
    props.toggleShow();

    fetch('https://diagramtest1.herokuapp.com/list', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(list)
    })
      .then(res => res.json())
      .then(result => props.addList(result.data));
  }

  const handleTitleChange = (e) => {
    setListTitle(e.target.value);
  }

  return(
    <div>
      <form onSubmit={handleSubmit} className="form">
          <TextField id="outlined-basic" label="List title" variant="outlined" onChange={handleTitleChange} value={listTitle}/><br /><br />
        <Button variant="contained" color="primary" disableElevation type="submit">
          Add list
        </Button>
      </form>
    </div>
  );
}

export default AddTaskForm;