import './App.css';
import Helmet from 'react-helmet';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Workout from './Components/Workout/Workout'
import NameSelect from './Components/NameSelect/NameSelect';
import ImportClients from './Pages/ImportClients';

function App() {

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
