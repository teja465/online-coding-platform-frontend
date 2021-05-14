import './App.css';
import Body from "./components/body/Body"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
         
        </Switch>
      </div>
    </Router>
    
  );
}


export default App;
