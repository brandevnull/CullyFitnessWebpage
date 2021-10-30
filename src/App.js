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
import AddClientPage from './Pages/AddClientPage';

function App() {

  return (
    <Router>
      <Helmet bodyAttributes={{style: 'background-color : lightgray'}}/>
      <div>
        <Switch>
          <Route
            path='/addclient'>
              <AddClientPage />
          </Route>   
          <Route
            path='/workout'
            render={(props) => (
              <Workout {...props}/>
            )}
          />
          <Route path="/">
            <NameSelect />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;