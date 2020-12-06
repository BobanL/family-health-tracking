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
    if (this.props?.location?.state) {
      const { tableName, fieldName, id } = this.props?.location?.state;
      const get = await fetch(
        `http://localhost:3001/get/${tableName}/${fieldName}/${id}`
      );
      const response = await get.json();
      this.setState({ formData: response, loading: false });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props?.location?.state) {
        const { tableName, fieldName, id } = this.props?.location?.state;
        const get = await fetch(
          `http://localhost:3001/get/${tableName}/${fieldName}/${id}`
        );
        const response = await get.json();
        this.setState({ formData: response, loading: false });
      }
    }
  }

  render() {
    const classes = this.props?.location?.state?.classes;
    if (!classes) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          404
        </div>
      );
    }
    if (this.state.loading) {
      return (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div>loading...</div>
                </Paper>
              </Grid>
            </Grid>
            <Box sx={{ pt: 4 }}></Box>
          </Container>
        </main>
      );
    }
    if (this.state.formData && this.state.formData.length === 0) {
      return (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  404 - Unable to retrieve data{" "}
                  {this.props?.location?.state.fieldName} :
                  {this.props?.location?.state.id} on{" "}
                  {this.props?.location?.state.tableName}
                </Paper>
              </Grid>
            </Grid>
            <Box sx={{ pt: 4 }}></Box>
          </Container>
        </main>
      );
    }
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {this.state.loading && !this.state.formData ? (
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
