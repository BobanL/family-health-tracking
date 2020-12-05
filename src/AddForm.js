import { Button, TextField, LinearProgress } from "@material-ui/core";
import { useStyles } from "./Dashboard";
import Container from "@material-ui/core/Container";
import * as React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Field, Form, Formik, useFormik } from "formik";

export const AddForm = ({ history }) => {
  const classes = useStyles();
  const formFields = history?.location?.state?.form;
  let initValues = {};
  formFields.map((x) => {
    initValues[x.fieldName] = "";
  });
  const formik = useFormik({ initialValues: initValues });
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
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                  console.log(formik.values);
                }}
              >
                {({ submitForm, isSubmitting }) => (
                  <Form>
                    {formFields?.map((x, i) => (
                      <div key={x.fieldName + "i"}>
                        <Field
                          id={x.fieldName}
                          component={TextField}
                          name={x.fieldName}
                          type="text"
                          label={x.fieldName + ""}
                          onChange={formik.handleChange}
                          value={formik.values[x.fieldName]}
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
