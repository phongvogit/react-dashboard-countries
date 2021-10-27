import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListPage from './pages/ListPage';
import ViewPage from './pages/ViewPage';

export default function CountryFeature() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.path} exact>
        <ListPage />
      </Route>

      <Route path={`${match.path}/:countryName`}>
        <ViewPage />
      </Route>
    </Switch>
  );
}
