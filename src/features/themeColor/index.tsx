import { Box, Button, makeStyles } from '@material-ui/core';
import React from 'react';

export interface ThemeColorProps {
  label: string;
  onClick?: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  image: {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2.5),
    color: '#ffff',
    fontSize: '24px',
  },

  label: {
    textAlign: 'start',
    marginLeft: theme.spacing(1),
    textTransform: 'capitalize',
  },
}));

export default function ThemeColor({ label, onClick }: ThemeColorProps) {
  const classes = useStyles();
  return (
    <Button onClick={onClick} className={classes.root} fullWidth>
      <Box className={classes.image} style={{ backgroundColor: label }}>
        {label[0].toLocaleUpperCase()}
      </Box>
      <Box className={classes.label}>{label}</Box>
    </Button>
  );
}
