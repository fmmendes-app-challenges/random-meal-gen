import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Random from '../pages/Random';
// import Saved from '../pages/Saved';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/random" component={Random} isPrivate />
      {/* <Route path="/saved" component={Saved} isPrivate /> */}
    </Switch>
  );
};

export default Routes;
