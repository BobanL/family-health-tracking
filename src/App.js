import "./App.css";
import { Dashboard, useStyles } from "./Dashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "./Header";
import { CssBaseline } from "@material-ui/core";
import { AddForm } from "./AddForm";
import TablePage from "./TablePage";
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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
