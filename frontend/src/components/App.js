import React, {useState, useEffect} from 'react';
import Menu from './Menu';
import Dashboard from './Dashboard';
import Header from './Header';
import {default as MyToolbar} from './Toolbar';
import '../styles/App.scss';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AddTaskForm from './AddTaskForm';
import PlusButton from './PlusButton';
import BuildIcon from '@material-ui/icons/Build';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import CallSplitIcon from '@material-ui/icons/CallSplit';

const iconSet = [<CallSplitIcon />, <EqualizerIcon />, <BuildIcon />];

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


const App = () => {
  const [data, setData] = useState({});
  const [lists, setLists] = useState({});
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    console.log(show);
    setShow(!show);
  }

  const addList = (list) => {
    const newLists = {...lists};
    newLists.data.push(list);
    setLists(newLists);
  }

  const addTask = async (task, listIDX) => {
    const newLists = {...lists};
    newLists.data[listIDX].tasks.push(task);
    await setLists(newLists);

    fetch('https://diagramtest1.herokuapp.com/list', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newLists.data[listIDX])
    })
      .then(res => res.json())
      .then(result => console.log(result));
  }

  const fetchInitialData = () => {
    fetch('https://diagramtest1.herokuapp.com/dashboard?name=dashboard')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(data);
      });
  }

  const fetchLists = () => {
    fetch(`https://diagramtest1.herokuapp.com/list?dashboardID=5e19f563b4237a46748739dc`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setLists(data);
      });
  }

  const updateList = (list) => {
    const newLists = {...lists};
    const idx = newLists.data.findIndex(el => el._id === list._id);
    newLists.data[idx] = list;
    fetch('https://diagramtest1.herokuapp.com/list', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newLists.data[idx])
    })
      .then(res => res.json())
      .then(result => console.log(result));
  
    setLists(newLists);
  }
  
  useEffect(async () => {
    await fetchInitialData();
    fetchLists();
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Title
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['View', 'Statistics', 'Settings'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{iconSet[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main>
        <aside>
          {<Menu />}
        </aside>
        <section className="page">
          {<MyToolbar />}
          {<Dashboard lists={lists ? lists.data : null } addTask={addTask} updateList={updateList}/>}
        </section>
      </main>
      <section className="add__task">
        
        {show ? <AddTaskForm addList={addList} show={show} toggleShow={handleToggle}/> : null}
      </section>
      <div className="pls__btn" >
        {<PlusButton toggleShow={handleToggle}/>}
      </div>
      <div className="overlay" style={show ? {display: 'block'} : {display: 'none'}}></div>
    </div>
  );
}

export default App;
