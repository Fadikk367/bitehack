import React from 'react';
import '../styles/PlusButton.scss';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const PlusButton = props => {
  const handleClick = (e) => {
    props.toggleShow();
  }
  return(
    <Fab color="primary" aria-label="add" onClick={props.toggleShow}>
      <AddIcon />
  </Fab>
  );
}

export default PlusButton;