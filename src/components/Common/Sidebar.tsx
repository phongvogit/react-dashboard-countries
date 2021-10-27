import { Box, Collapse } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { ColorLens, Dashboard, ExpandLess, ExpandMore, Public } from '@material-ui/icons';
import ThemeColor from 'features/themeColor';
import { themeColorActions } from 'features/themeColor/themeColorSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },

  link: {
    color: 'inherit',
    textDecoration: 'none',

    '&.active > div': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

  // root: {
  //   display: 'flex',
  //   flexFlow: 'column nowrap',
  // },

  // label: {
  //   fontSize: theme.spacing(3),
  //   borderBottom: `1px solid ${theme.palette.divider}`,
  //   marginLeft: theme.spacing(1),
  //   marginBottom: theme.spacing(2),
  //   padding: theme.spacing(2, 0),
  // },
}));

export function Sidebar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <NavLink to="/admin/dashboard" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <NavLink to="/admin/countries" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Public />
            </ListItemIcon>
            <ListItemText primary="Countries" />
          </ListItem>
        </NavLink>

        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <ColorLens />
          </ListItemIcon>
          <ListItemText primary="Theme color" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            onClick={() => dispatch(themeColorActions.changeColor('red'))}
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ThemeColor label="Red" />
              </ListItemIcon>
              <ListItemText primary="Red" />
            </ListItem>
          </List>
          <List
            component="div"
            disablePadding
            onClick={() => dispatch(themeColorActions.changeColor('green'))}
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ThemeColor label="green" />
              </ListItemIcon>
              <ListItemText primary="Green" />
            </ListItem>
          </List>
          <List
            component="div"
            disablePadding
            onClick={() => dispatch(themeColorActions.changeColor('purple'))}
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ThemeColor label="purple" />
              </ListItemIcon>
              <ListItemText primary="Purple" />
            </ListItem>
          </List>
          <List
            component="div"
            disablePadding
            onClick={() => dispatch(themeColorActions.changeColor('blue'))}
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ThemeColor label="blue" />
              </ListItemIcon>
              <ListItemText primary="blue" />
            </ListItem>
          </List>
        </Collapse>
      </List>
      {/* <Typography className={classes.label}>SWITCH THEME</Typography>
      <ThemeColor
        label="Purple"
        onClick={() => dispatch(themeColorActions.changeColor('purple'))}
      />
      <ThemeColor label="Red" onClick={() => dispatch(themeColorActions.changeColor('red'))} />
      <ThemeColor label="Green" onClick={() => dispatch(themeColorActions.changeColor('green'))} />
      <ThemeColor label="Blue" onClick={() => dispatch(themeColorActions.changeColor('blue'))} /> */}
    </Box>
  );
}
