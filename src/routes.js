import React from 'react';
import { Router, Route, browserHistory, DefaultRoute, IndexRoute } from 'react-router';
import { MuiThemeProvider } from "material-ui/styles";

import Authenticate from './hoc/auth';
import Login from './components/login';
import Dashboard from './components/dashboard';

const Routes = () => (
  	<MuiThemeProvider>
	  	<Router history={browserHistory}>
			<Route path="/" component={Login} />
			<Route path="/dashboard" component={Authenticate(Dashboard)} />
	  	</Router>
  	</MuiThemeProvider>
);

export default Routes;