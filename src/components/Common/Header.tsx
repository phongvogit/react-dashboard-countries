import { Badge, Box, IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Favorite } from '@material-ui/icons';
import { useAppSelector } from 'app/hooks';
import { cartActions, selectCountryItemQuantity } from 'features/cart/cartSlice';
import { selectThemeColor } from 'features/themeColor/themeColorSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
  },
  wrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: theme.spacing(3),
  },
}));

export function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const backgroundColor = useAppSelector(selectThemeColor);
  const quantityItem = useAppSelector(selectCountryItemQuantity);

  const handleShowCart = () => {
    dispatch(cartActions.changeToggle());
  };

  return (
    <Box className={classes.root}>
      <AppBar className={classes.wrapper} position="static" style={{ backgroundColor }}>
        <Toolbar color="red">
          <Typography variant="h6" className={classes.title}>
            ADMIN {'</>'}
          </Typography>
        </Toolbar>
        <IconButton className={classes.icon} color="inherit" onClick={handleShowCart}>
          <Badge badgeContent={quantityItem} color="secondary">
            <Favorite style={{ fontSize: '32px' }} />
          </Badge>
        </IconButton>
      </AppBar>
    </Box>
  );
}
