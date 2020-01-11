import React, {useState, useEffeft} from 'react';
import Diagram from './Diagram';
import '../styles/Dashboard.css';

const Dashboard = props => {
  return(
    <div className="dashboard">
      <h2>Dashboard</h2>
      <Diagram />
      <Diagram />
    </div>
  );
}

export default Dashboard;
