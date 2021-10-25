import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useAppSelector } from 'app/hooks';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
  },
}));

export function Header() {
  const classes = useStyles();
  const backgroundColor = useAppSelector((state) => state.themeColor.color);

  console.log(backgroundColor);

  return (
    <Box className={classes.root}>
      <AppBar position="static" style={{ backgroundColor }}>
        <Toolbar color="red">
          <Typography variant="h6" className={classes.title}>
            ADMIN {'</>'}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
