import React, {useState, useEffeft} from 'react';
import List from './List';
import '../styles/Dashboard.scss';



const mockData2 = {
  tasks: [
    {
      id: 0,
      name: 'task 21',
      checked: false
    },
    {
      id: 1,
      name: 'task 22',
      checked: false
    },
    {
      id: 2,
      name: 'task 23',
      checked: false
    },
  ],
  completed: false
}

const Dashboard = props => {
  return(
    <div className="dashboard">
      <h2>Dashboard</h2>
    </div>
  );
}

export default Dashboard;
