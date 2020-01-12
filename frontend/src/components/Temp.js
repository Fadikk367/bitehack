import React, {useState, useEffeft} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ProgressBall from './ProgressBall';

import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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

const SingleTask = ({name, checked, handleChange, done}) => {
    return(
        <ListItem >
            <Checkbox
                name={name}
                checked={done || checked}
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

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top:"50%",
    left: "50%",
    transform:"translate(-50%,-50%)"
  },
  modal: {
    
  }
}));

const Temp = props => {
    const [list, setList] = useState(props.list || mock);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');

    const handleClick = () => {
      setShow(!show);
      setValue('');
    }

    const calcProgress = () => {
      let result = parseInt(100*(list.tasks.filter(el => el.done).length / list.tasks.length));
      return result;
    }

    const handleTextChange = (e) => {
      setValue(e.target.value);
    }

    const handleTaskAdd = () => {
      if (value.length === 0) return alert('Task name cannot be en empty string');
      const task = {
        name: value,
        checked: false
      }
      setValue('');
      setShow(false);
      console.log(props.idx);
      props.addTask(task, props.idx);
    }
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleChange = (e) => {
      const newList = Object.assign({}, list);
      const idx = newList.tasks.findIndex(task => task.name === e.target.name);
      newList.tasks[idx].checked = e.target.checked;
      newList.tasks[idx].done = e.target.checked;
      newList.completed = newList.tasks.reduce((total, b) => (total && b.checked));
      props.updateList(newList);
      setList(newList);
    }

    const items = list.tasks.map((item, idx) => (
        <SingleTask key={idx} done={item.done} handleChange={handleChange} name={item.name} checked={item.checked}/>
    ))

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <Box width={300} style={{position: 'relative'}}>
        <div className="tasks_list" data-previous={props.previous}>
        <Card 
            style={{border: "1px solid rgb(212, 212, 212)"}}
        >
            <CardHeader
                title={list.name}
                action={
                  <div>
                  <IconButton aria-label="settings" onClick={handleOpen} style={{marginTop: '10px', color: 'white'}}>
                    <MoreVertIcon />
                  </IconButton>
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                  >
                    <div  className={classes.paper}>
                      <h2 id="simple-modal-title">{list.name}</h2>
                      <h3>{list.date&&list.date!=Date(0)?list.date:""}</h3>
                      <p id="simple-modal-description">
                      {list.description||""}
                      </p>
                      <List component="nav" aria-label="mailbox folders">
                          {items}
                      </List>
                    </div>
                  </Modal>
                  </div>
                }
                subheader={list.date&&list.date!=Date(0)?list.date:""}
                color="primary"
                style={{backgroundColor: 'rgb(63, 81, 181)', color: 'white', textAlign: 'right'}}
            />
             <CardContent>
                <ProgressBall val={calcProgress()}
                  style={{backgroundColor: 'white'}}
                >
                </ProgressBall>
                <List component="nav" aria-label="mailbox folders">
                    {items}
                    <Divider light />

                    <ListItem>
                      <Button style={{display: 'block'}} variant="contained" color="primary" onClick={handleClick} style={!show ? {display: 'block'} : {display: 'none'}}>
                        add
                      </Button><br />
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
