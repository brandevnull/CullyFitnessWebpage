import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Client from './Models/Client';
import Helmet from 'react-helmet';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  withRouter
} from "react-router-dom";
import Workout from './Components/Workout/Workout'
import { useState, useEffect } from 'react';
import Exercise from './Models/Exercise';
import Select from 'react-select'
import { Button } from '@mui/material';
import NameSelect from './Components/NameSelect/NameSelect';
import ImportClients from './Pages/ImportClients';

function App() {

  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyBoQT4L3shuLfXGgQeQKR6jv2V0zA-Xnk0',
    authDomain: 'cullyfitness.firebaseapp.com',
    projectId: 'cullyfitness'
  });

  return (
    <Router>
      <Helmet bodyAttributes={{style: 'background-color : lightgray'}}/>
      <div>
        <Switch>
          <Route
            path='/workout'
            render={(props) => (
              <Workout {...props}/>
            )}
          />
          <Route exact path="/">
            <NameSelect />
          </Route>
          <Route
            path="/importClients"
            render={(props) => (
                <ImportClients {...props}/>
              )}>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
