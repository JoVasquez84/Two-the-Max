import Home from './components/FormatSwitcher.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navBar/NavRender'
import IssuedTools from './components/tools/IssuedTools.js'
import AllTools from './components/tools/AllTools.js'
import Personnel from './components/personnel/Personnel.js'

function App() {
  return (
    <div>
      <Navbar/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home MainTable={IssuedTools} />
          </Route>
          <Route path="AllTools/">
            <Home MainTable={AllTools} />
          </Route>
          <Route path="Personnel/">
            <Home MainTable={Personnel} />
          </Route>
        </Switch>
      </Router >
    </div>
  );
}

export default App;
