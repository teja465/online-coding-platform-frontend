import './App.css';
import Body from "./components/body/Body"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ContributeProblem from "./components/contributions/ContributeProblem";
import Login from './components/authentication/login/Login'


import { DetailedQuestion } from "./components/body/DetailedQuestion";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Body />
          </Route>
          <Route exact path="/problem/:id">
            <DetailedQuestion />
          </Route>
          <Route exact path="/contribute-question">
            <ContributeProblem />
          </Route>
          <Route exact path ="/login">
            <Login />
          </Route>
         
        </Switch>
      </div>
    </Router>
    
  );
}


export default App;
