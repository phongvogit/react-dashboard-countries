import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ThemeColor from 'features/themeColor';
import { themeColorActions } from 'features/themeColor/themeColorSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },

  label: {
    fontSize: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginLeft: theme.spacing(1),
  },
}));

export function Sidebar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Box className={classes.root}>
      <Typography className={classes.label}>Theme Colors</Typography>
      <ThemeColor
        label="Purple"
        onClick={() => dispatch(themeColorActions.changeColor('purple'))}
      />
      <ThemeColor label="Red" onClick={() => dispatch(themeColorActions.changeColor('red'))} />
      <ThemeColor label="Green" onClick={() => dispatch(themeColorActions.changeColor('green'))} />
      <ThemeColor label="Blue" onClick={() => dispatch(themeColorActions.changeColor('blue'))} />
    </Box>
  );
}
