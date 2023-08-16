import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
  gender: Yup.string().required('Gender is required'),
  price: Yup.number().required('Price is required'),
  multiplyFactor: Yup.number().required('Multiply Factor is required'),
  // certificateName: Yup.string().required('Certificate Name is required'),
  // year: Yup.number().required('Year is required'),
  // temporaryAddress: Yup.string().required('Temporary Address is required'),
  // permanentAddress: Yup.string().required('Permanent Address is required'),
});

const genders = ['Male', 'Female', 'Other'];

const calculateTotal = (price, multiplyFactor) => {
  return price * multiplyFactor;
};

const UserForm = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    price: '',
    multiplyFactor: '',
    total: '',
    certificate: [{
      certificateName: '',
      year: '',
    }],
    personalInfo: {
      temporaryAddress: '',
      permanentAddress: '',
    }

  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) =>
      console.log('Submitted Values:', values)
    }>
      {({ values, setFieldValue,errors }) => {
        console.log(errors,"errors")
        return (
          <Form>
            <Box component="div">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field as={TextField} name="firstName" label="First Name" variant="outlined" fullWidth />
                  <ErrorMessage name="firstName" component="div" style={{ color: 'red' }}/>
                </Grid>
                <Grid item xs={6}>
                  <Field as={TextField} name="lastName" label="Last Name" variant="outlined" fullWidth />
                  <ErrorMessage name="lastName" component="div" style={{ color: 'red' }} />
                </Grid>
                <Grid item xs={6}>
                  <Field as={TextField} name="dateOfBirth" type="date" label="" variant="outlined" fullWidth />
                  <ErrorMessage name="dateOfBirth" component="div" style={{ color: 'red' }} />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Field as={Select} name="gender" label="Gender">
                      {genders.map((gender) => (
                        <MenuItem key={gender} value={gender}>
                          {gender}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                  <ErrorMessage name="gender" component="div" style={{ color: 'red' }}/>
                </Grid>
                <Grid item xs={4}>
                  <Field
                    as={TextField}
                    name="price"
                    type="number"
                    label="Price"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      const newPrice = parseFloat(e.target.value);
                      setFieldValue('price', newPrice);
                      setFieldValue('total', calculateTotal(newPrice, values.multiplyFactor));
                    }}
                  />
                  <ErrorMessage name="price" component="div" style={{ color: 'red' }}/>
                </Grid>
                <Grid item xs={4}>
                  <Field
                    as={TextField}
                    name="multiplyFactor"
                    type="number"
                    label="Multiply Factor"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      const newMultiplyFactor = parseFloat(e.target.value);
                      setFieldValue('multiplyFactor', newMultiplyFactor);
                      setFieldValue('total', calculateTotal(values.price, newMultiplyFactor));
                    }}
                  />
                  <ErrorMessage name="multiplyFactor" component="div" style={{ color: 'red' }}/>
                </Grid>
                <Grid item xs={4}>
                  <Field
                    as={TextField}
                    name="total"
                    type="number"
                    label=""
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <h3 style={{ marginTop: '10px', color: '#aaa' }}>Certificates:</h3>
              <Divider sx={{ margin: '0 0 20px 0' }} />
              <FieldArray name="certificate">
                {({ push, remove }) => (
                  <div >
                    {values.certificate.map((cert, index) => (
                      <Grid container spacing={2} key={index} style={{marginBottom: '10px'}}>
                        <Grid item xs={6}>
                          <Field
                            as={TextField}
                            name={`certificate.${index}.certificateName`}
                            label="Certificate Name"
                            variant="outlined"
                            fullWidth
                          />
                          <ErrorMessage name={`certificate.${index}.certificateName`} component="div" />
                        </Grid>
                        <Grid item xs={3}>
                          <Field
                            as={TextField}
                            name={`certificate.${index}.year`}
                            type="number"
                            label="Year"
                            variant="outlined"
                            fullWidth
                          />
                          <ErrorMessage name={`certificate.${index}.year`} component="div" />
                        </Grid>
                        {index !== 0 && (
                          <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                            style={{backgroundColor: 'red', color:'#fff'}}
                              type="button"
                              variant="outlined"
                              color="secondary"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    ))}
                    <Button
                    style={{backgroundColor: 'green', color:'#fff'}}
                      type="button"
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        push({
                          certificateName: '',
                          year: '',
                        })
                      }
                    >
                      Add Certificate
                    </Button>
                  </div>
                )}
              </FieldArray>
              <h3 style={{ marginTop: '10px', color: '#aaa' }}>Personal Info:</h3>
              <Divider sx={{ margin: '0 0 20px 0' }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="personalInfo.temporaryAddress"
                    label="Temporary Address"
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage name="personalInfo.temporaryAddress" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="personalInfo.permanentAddress"
                    label="Permanent Address"
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage name="personalInfo.permanentAddress" component="div" />
                </Grid>
              </Grid>
              <Divider sx={{ margin: '20px 0' }} />
              <Button type="submit" variant="contained" color="primary" style={{marginBottom: '10px'}}>
                Submit
              </Button>
            </Box>
          </Form>)
      }}
    </Formik>
  );
};

export default UserForm;