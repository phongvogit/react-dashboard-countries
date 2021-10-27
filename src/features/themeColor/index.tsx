import { Avatar, Button, makeStyles } from '@material-ui/core';
import React from 'react';

export interface ThemeColorProps {
  label: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));

export default function ThemeColor({ label }: ThemeColorProps) {
  const classes = useStyles();
  return (
    <Button className={classes.root} fullWidth>
      <Avatar variant="square" style={{ backgroundColor: label }}>
        {label[0].toLocaleUpperCase()}
      </Avatar>
    </Button>
  );
}
