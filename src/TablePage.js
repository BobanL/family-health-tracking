import Container from "@material-ui/core/Container";
import * as React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default class TablePage extends React.Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    const { tableName, fieldName, id } = this.props.location.state;
    const get = await fetch(
      `http://localhost:3001/get/${tableName}/${fieldName}/${id}`
    );
    const response = await get.json();
    this.setState({ formData: response, loading: false });
  }

  render() {
    const classes = this.props?.location?.state?.classes || {};
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {this.state.loading || !this.state.formData ? (
                  <div>loading...</div>
                ) : (
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          {Object.keys(this.state.formData[0]).map((key) => (
                            <TableCell>{key}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.formData.map((row) => (
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
          </Grid>
          <Box sx={{ pt: 4 }}></Box>
        </Container>
      </main>
    );
  }
}
