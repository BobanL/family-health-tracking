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
  componentDidMount() {
    const cookies = new Cookies();
    if (cookies.get("familyUnit")) {
      //const get = await fetch(`http://localhost:3001/get/med_rec/1/1`);
      //fullResponse = await get.json();
    }
  }

  render() {
    const cookies = new Cookies();
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    let fullResponse = [{}];
    const handleChange = (event) => {
      //setValue(event.target.value);
      console.log(event.target.value);
    };
    // const [value, setValue] = React.useState("female");

    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                {!cookies.get("familyUnit") ? (
                  "Please select your family account"
                ) : (
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          {Object.keys(fullResponse[0]).map((key) => (
                            <TableCell>{key}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {fullResponse.map((row) => (
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
                )}
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                {" "}
                <FormControl component="fieldset">
                  <FormLabel component="legend">Table</FormLabel>
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
