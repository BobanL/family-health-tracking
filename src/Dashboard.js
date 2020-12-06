import * as React from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Orders from "./Orders";
import { Header } from "./Header";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Cookies from "universal-cookie";
import { style } from "./styles";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioButtonValue: "",
      radioButtonQueryResponse: null,
      last5MedRecords: null,
      famUnit: null,
    };
  }

  async componentDidMount() {
    const cookies = new Cookies();
    if (cookies.get("familyUnit")) {
      this.setState({ famUnit: cookies.get("familyUnit") });
      console.log(this.state.famUnit);
      const get = await fetch(
        `http://localhost:3001/getBy/Last5MedicalRecords`,
        {
          method: "POST",
          body: JSON.stringify({ params: cookies.get("familyUnit") }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const fullResponse = await get.json();
      console.log(fullResponse[0]);
      this.setState({ last5MedRecords: fullResponse[0] });
    }
  }

  render() {
    const { classes } = this.props;
    const cookies = new Cookies();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const handleChange = (event) => {
      //setValue(event.target.value);
      console.log(event.target.value);
      this.setState({ radioButtonValue: event.target.value });
    };
    const noCookies = "Please select your family account";
    let lastRecords = "Unable to retrieve last 5 records";
    console.log(this.state.last5MedRecords);
    if (this.state.last5MedRecords) {
      lastRecords = (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {Object.keys(this.state.last5MedRecords[0]).map((key) => (
                  <TableCell>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.last5MedRecords.map((row) => (
                <TableRow>
                  {Object.keys(row).map((key) => (
                    <TableCell component="th" scope="row">
                      {row[key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                {!cookies.get("familyUnit") ? noCookies : lastRecords}
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                {" "}
                <FormControl component="fieldset">
                  <FormLabel component="legend">Query</FormLabel>
                  <RadioGroup
                    aria-label="table"
                    name="table1"
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          <Box sx={{ pt: 4 }}></Box>
        </Container>
      </main>
    );
  }
}

export default withStyles(style)(Dashboard);
