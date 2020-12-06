import { Button, TextField, LinearProgress } from "@material-ui/core";
import { useStyles } from "./Dashboard";
import Container from "@material-ui/core/Container";
import * as React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Field, Form, Formik } from "formik";
import Cookies from "universal-cookie";

export const Login = () => {
  const classes = useStyles();
  const [status, setStatus] = React.useState("");
  const [unum, setUnum] = React.useState("");
  const [ssn, setSSN] = React.useState("");
  const cookies = new Cookies();
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div>{status ? status : ""}</div>
              <Formik
                initialValues={{
                  FAM_Unum: "",
                  Parent1_SSN: "",
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(false);
                  let fam = false;
                  try {
                    const get = await fetch(
                      `http://localhost:3001/get/fam_unit/FAM_Unum/${unum}`
                    );
                    const response = await get.json();
                    if (
                      response.length > 0 &&
                      response[0].FAM_Unum === parseInt(unum)
                    ) {
                      fam = true;
                      cookies.set("familyUnit", unum, {
                        path: "/",
                      });
                    }
                  } catch (error) {}
                  // known bug, if a parent with multiple family units
                  if (!fam) {
                    let get;
                    try {
                      get = await fetch(
                        `http://localhost:3001/get/fam_unit/Parent1_SSN/${ssn}`
                      );
                      const response = await get.json();
                      if (response) {
                        console.log(response[0].FAM_Unum);
                        cookies.set("familyUnit", response[0].FAM_Unum, {
                          path: "/",
                        });
                        fam = true;
                      }
                    } catch (error) {}
                  }
                  if (!fam) {
                    let get;
                    try {
                      get = await fetch(
                        `http://localhost:3001/get/fam_unit/Parent2_SSN/${ssn}`
                      );
                      const response = await get.json();
                      if (response) {
                        console.log(response[0].FAM_Unum);
                        cookies.set("familyUnit", response[0].FAM_Unum, {
                          path: "/",
                        });
                        fam = true;
                      }
                    } catch (error) {}
                  }
                  if (fam) {
                    window.location.reload();
                    window.location.href = "/";
                  } else {
                    setStatus(
                      "Unable to find Family Unit with provided details"
                    );
                  }
                }}
              >
                {({ submitForm, isSubmitting }) => (
                  <Form>
                    <div>
                      <Field
                        component={TextField}
                        name="FAM_Unum"
                        type="text"
                        label="Family Unit Number"
                        value={unum}
                        onChange={(e) => setUnum(e.target.value)}
                      />
                      <br></br>
                      <br></br>
                      OR
                      <br></br>
                      <Field
                        component={TextField}
                        name="Parent1_SSN"
                        type="text"
                        label="A Parent's SSN"
                        value={ssn}
                        onChange={(e) => setSSN(e.target.value)}
                      />
                      <br></br>
                      <br></br>
                    </div>
                    {isSubmitting && <LinearProgress />}
                    <br />
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ pt: 4 }}></Box>
      </Container>
    </main>
  );
};
