import React from 'react';
import { Route, Switch } from 'react-router';
import ListPage from './pages/ListPage';
import ViewPage from './pages/ViewPage';

export default function CountryFeature() {
  return (
    <Switch>
      <Route path="/" exact>
        <ListPage />
      </Route>

      <Route path="/:countryName">
        <ViewPage />
      </Route>
    </Switch>
  );
}
