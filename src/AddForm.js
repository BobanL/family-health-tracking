import { Button, TextField, LinearProgress } from "@material-ui/core";
import { useStyles } from "./Dashboard";
import Container from "@material-ui/core/Container";
import * as React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Field, Form, Formik } from "formik";

export const AddForm = ({ history }) => {
  const classes = useStyles();
  const formFields = history?.location?.state?.form;
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                    alert(JSON.stringify(values, null, 2));
                  }, 500);
                }}
              >
                {({ submitForm, isSubmitting }) => (
                  <Form>
                    {formFields?.map((x, i) => (
                      <div key={x.fieldName + "i"}>
                        <Field
                          component={TextField}
                          name={x.fieldName}
                          type="text"
                          label={x.fieldName + ""}
                        />
                        <br></br>
                        <br></br>
                      </div>
                    ))}
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
