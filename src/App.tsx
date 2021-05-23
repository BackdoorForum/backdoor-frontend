import React from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import Landing from './screens/Landing/Landing';
import Signup from './screens/Signup/Signup';
import Login from './screens/Login/Login'
import Threads from './screens/Threads/Threads';
import { ToastContainer } from 'react-toastify';
import { checkAuthenticated } from './api/index';
import { authenticate, setUsername, setPermissionLevel } from './store/userSlice';
import { IStore } from './store/userInterface';
import { AnimatePresence } from 'framer-motion';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import './App.scss';
import './scss/ReactToastify.scss';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector<IStore>(state => state.user.isAuthenticated);

  useEffect(() => {
    checkAuthenticated()
      .then(res => {
        dispatch(authenticate());
        dispatch(setUsername(res.data.username));
        dispatch(setPermissionLevel(res.data.permissionLevel));
      })
      .catch(err => {
      })
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/threads">
            <Threads />
          </Route>
          <Route path="/">
            {/* If user is not authenticated, show landing page, else redirect to /threads */}
            {!isAuthenticated
              ? <Landing />
              : <Redirect to="/threads" />
            }
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;
