import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
