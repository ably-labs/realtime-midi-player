import { selectName } from 'features/auth/redux/authSelectors';
import Header from 'features/header';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import EnterNameView from 'views/EnterNameView';
import LandingView from 'views/LandingView';
import RoomView from 'views/RoomView';
import './App.css';

const App = () => {
  const name = useSelector(selectName);

  if (name === null) {
    return (
      <>
        <Header />
        <EnterNameView />
      </>
    );
  }

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/jam">
            <RoomView />
          </Route>
          <Route path="/">
            <LandingView />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
