import { AdminLayout } from 'components/Layout';
import React from 'react';
import { Switch } from 'react-router';

function App() {
  return (
    <>
      <Switch>
        <AdminLayout />
      </Switch>
    </>
  );
}

export default App;
