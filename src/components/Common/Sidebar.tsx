import { Box, IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Brightness5, BrightnessHigh, Dashboard, Public } from '@material-ui/icons';
import { useAppSelector } from 'app/hooks';
import { selectThemeColor, themeColorActions } from 'features/themeColor/themeColorSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.primary.main,
  },

  link: {
    color: '#FFFFFF',
    textDecoration: 'none',

    '&.active > div': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  iconBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  text: {
    color: theme.palette.primary.contrastText,
  },
}));

export function Sidebar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isDark = useAppSelector(selectThemeColor);

  return (
    <Box className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Box className={classes.iconBtn}>
          <IconButton onClick={() => dispatch(themeColorActions.changeColor())}>
            {isDark ? <BrightnessHigh /> : <Brightness5 />}
          </IconButton>
        </Box>

        <NavLink to="/admin/dashboard" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText className={classes.text}>Dashboard</ListItemText>
          </ListItem>
        </NavLink>
        <NavLink to="/admin/countries" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Public />
            </ListItemIcon>
            <ListItemText className={classes.text}>Countries</ListItemText>
          </ListItem>
        </NavLink>
      </List>
    </Box>
  );
}
