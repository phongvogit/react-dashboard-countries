import { Box, makeStyles } from '@material-ui/core';
import { Header, Sidebar } from 'components/Common';
import Cart from 'features/cart';
import CountryFeature from 'features/country';
import Dashboard from 'features/dashboard';
import React from 'react';
import { Route, Switch } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: '100vh',
    position: 'relative',
  },

  header: {
    gridArea: 'header',
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
  },

  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.primary.main,
  },

  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2, 3),
  },
}));

export function AdminLayout() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <Dashboard />
          </Route>
          <Route path="/admin/countries">
            <CountryFeature />
          </Route>
        </Switch>
      </Box>
      <Cart />
    </Box>
  );
}
