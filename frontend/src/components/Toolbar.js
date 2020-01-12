import React, {useState, useEffeft} from 'react';
import { styled } from '@material-ui/core/styles';
import '../styles/Toolbar.scss';
import Button from "@material-ui/core/Button"

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

const MyInput = styled(Input)({
  width: '60px',
  margin: '0 10px 0 40px',
});

const Toolbar = props => {
  const [values, setValues] = React.useState({
    approximation: 100
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return(
    <div className="toolbar">
      <Button variant="contained" color="primary">
        Save
      </Button>
      <MyInput
            id="standard-adornment-approximation"
            value={values.approximation}
            onChange={handleChange('approximation')}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
      <Button color="primary"><ZoomInIcon/></Button>
      <Button color="primary"><ZoomOutIcon/></Button>
      <Button color="primary">Align</Button>
    </div>
  );
}

export default Toolbar;