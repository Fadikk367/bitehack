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
        <ListItem>
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

    const handleChange = (e) => {
      const newList = Object.assign({}, list);
      const idx = newList.tasks.findIndex(task => task.name === e.target.name);
      newList.tasks[idx].checked = e.target.checked;
      newList.completed = newList.tasks.reduce((total, b) => (total && b.checked));
      setList(newList);
    }

    const items = list.tasks.map(item => (
        <SingleTask key={item.id} handleChange={handleChange} name={item.name} checked={item.checked}/>
    ))
  return (
    <Box width={300}>
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
                </List>
            </CardContent>
        </Card>
    </Box>
  );
}



export default Temp;