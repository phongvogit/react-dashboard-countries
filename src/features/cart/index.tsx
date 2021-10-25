import { Avatar, Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { ArrowForward, Delete } from '@material-ui/icons';
import { useAppSelector } from 'app/hooks';
import { Country } from 'model';
import React from 'react';
import { useDispatch } from 'react-redux';
import { cartActions, selectCartItems, selectCartToggle } from './cartSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    height: '100vh',
    top: '0px',
    backgroundColor: '#ffff',
    zIndex: 3,
    padding: theme.spacing(2),
    transition: 'all 0.5s linear',
    marginRight: '35px',
    right: '-35px',
  },
  label: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    fontSize: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(3),

    whiteSpace: 'nowrap',
  },
  itemWrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',

    marginBottom: '20px',
  },
  item: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  icon: {
    marginRight: '0px',
  },
}));

export default function Cart() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const toggle = useAppSelector(selectCartToggle);
  const items = useAppSelector(selectCartItems);

  const handleCloseCart = () => {
    dispatch(cartActions.changeToggle());
  };

  const handleRemoveItem = (country: Country) => {
    dispatch(cartActions.removeItems(country));
  };

  return (
    <Box
      className={classes.root}
      width={toggle ? '350px' : '0px'}
      visibility={toggle ? 'visible' : 'hidden'}
      overflow={toggle ? 'scroll' : 'hidden'}
    >
      <Box className={classes.label}>
        <Typography>FLAGS CART</Typography>
        <IconButton className={classes.icon} color="inherit" onClick={handleCloseCart}>
          <ArrowForward />
        </IconButton>
      </Box>
      {items.map((item) => (
        <Box key={item.name} className={classes.itemWrapper}>
          <Box className={classes.item}>
            <Avatar src={item.flag} alt={`image_${item.name}`} variant="rounded"></Avatar>
            <Box ml={2} fontSize="16px">
              {item.name}
            </Box>
          </Box>
          <IconButton
            className={classes.icon}
            color="inherit"
            onClick={() => handleRemoveItem(item)}
          >
            <Delete />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}
