import "./App.css";
import { Dashboard, useStyles } from "./Dashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "./Header";
import { CssBaseline } from "@material-ui/core";
function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <Header></Header>
        <Switch>
          <Route path="/" exact component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
