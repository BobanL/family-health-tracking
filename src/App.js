import "./App.css";
import Dashboard from "./Dashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "./Header";
import { CssBaseline } from "@material-ui/core";
import { AddForm } from "./AddForm";
import TablePage from "./TablePage";
import { Login } from "./Login";
import { useStyles } from "./styles";

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <Header></Header>
        <Switch>
          <Route path="/" exact component={Dashboard}></Route>
          <Route path="/AddForm" exact component={AddForm}></Route>
          <Route path="/table" exact component={TablePage}></Route>
          <Route path="/login" exact component={Login}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
