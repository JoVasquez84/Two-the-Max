import './App.css';
import Home from './components/Home.js';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import IssuedTools from './components/tools/IssuedTools.js'
import AllTools from './components/tools/UnissuedTools.js'
import Personnel from './components/personnel/Personnel.js'

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from='/' to='/IssuedTools' />
        <Route exact path="/IssuedTools/">
          <Home MainTable={IssuedTools} />
        </Route>
        <Route exact path="/AllTools/">
          <Home MainTable={AllTools} />
        </Route>
        <Route exact path="/Personnel/">
          <Home MainTable={Personnel} />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
