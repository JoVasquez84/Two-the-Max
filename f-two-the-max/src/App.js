import './App.css';
import Home from './components/Home.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <Home />
        </Route>
      </div>
    </Router>
  );
}

export default App;
