import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, path, loggedIn, ...props }) => {
	return <Route path={path}>{() => (loggedIn ? <Component {...props} /> : <Redirect to='/' />)}</Route>;
};

export default ProtectedRoute;
