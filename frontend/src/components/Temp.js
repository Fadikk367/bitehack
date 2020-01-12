import React, {useState, useEffeft} from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const mock = {
    tasks: [
      {
        id: 0,
        name: "task 11",
        checked: false
      },
      {
        id: 1,
        name: "task 12",
        checked: false
      },
      {
        id: 2,
        name: "task 13",
        checked: false
      },
      {
        id: 3,
        name: "task 14",
        checked: false
      },
      {
        id: 4,
        name: "task 15",
        checked: false
      }
    ],
    completed: false,
    name: "Lista 1"
  };

const SingleTask = ({name, checked, handleChange}) => {
    return(
        <ListItem >
            <Checkbox
                name={name}
                checked={checked}
                value="checkedA"
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Checkbox A' }}
                color="primary"
            />
            <Typography variant="body1" component="span">
                {name}
            </Typography>
        </ListItem>
    );
}

const Temp = props => {
    const [list, setList] = useState(props.list || mock);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');

    const handleClick = () => {
      setShow(!show);
      setValue('');
    }

    const handleTextChange = (e) => {
      setValue(e.target.value);
    }

    const handleTaskAdd = () => {
      const task = {
        name: value,
        checked: false
      }
      setValue('');
      setShow(false);
      console.log(props.idx);
      props.addTask(task, props.idx);
    }

    const handleChange = (e) => {
      const newList = Object.assign({}, list);
      const idx = newList.tasks.findIndex(task => task.name === e.target.name);
      newList.tasks[idx].checked = e.target.checked;
      newList.completed = newList.tasks.reduce((total, b) => (total && b.checked));
      setList(newList);
    }

    const items = list.tasks.map((item, idx) => (
        <SingleTask key={idx} handleChange={handleChange} name={item.name} checked={item.checked}/>
    ))
  return (
    <Box width={300}>
        <div className="tasks_list" data-previous={props.previous}>
        <Card 
            style={{border: "2px solid #008403"}}
        >
            <CardHeader
                title={list.name}
                color="primary"
                style={{backgroundColor: '#68b733', color: 'white'}}
            />
             <CardContent>
                <List component="nav" aria-label="mailbox folders">
                    {items}
                    <Divider light />

                    <ListItem>
                      <Button style={{display: 'block'}} variant="contained" color="primary" onClick={handleClick} style={!show ? {display: 'block'} : {display: 'none'}}>
                        add
                      </Button><br /><br />
                      <div style={show ? {display: 'block'} : {display: 'none'}}>
                        <TextField id="standard-basic" label="Standard" value={value} onChange={handleTextChange}/><Button variant="contained" color="primary" onClick={handleTaskAdd} style={{ marginTop: '10px'}}> add task</Button>
                        <Button color="primary" onClick={() => {setShow(!show)}} style={{ marginTop: '10px', marginLeft: '40px'}}>
                          <CancelIcon/>
                        </Button>
                      </div>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
        </div>
    </Box>
  );
}



export default Temp;