import React from 'react';
import { TextField, Button, Typography, Box, InputBase } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const StayInformed: React.FC = () => {
  const initialValues = {
    email: '',
  };

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  };

  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    // Handle form submission logic here
    console.log('Submitted email:', values.email);
    resetForm();
    setSubmitting(false);
  };

    return (
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{fontSize: 16, color: "white", mb: 1}}>
          Stay Informed!
        </Typography>
        <Typography sx={{fontSize: 10, color: "white", maxWidth: 350}}>
          Sign up to keep up to date with our latest developments!
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Field
                as={InputBase}
                placeholder="Email Address :"
                name="email"
                variant="standard" // Change variant to 'standard' to remove the border
                validate={validateEmail}
                sx={{
                  border: 'none', // Remove the border
                  backgroundColor: 'rgba(217, 217, 217, 0.44)', // Set background color
                  borderRadius: 3,
                  mt: 2.5,
                  minHeight: 43,
                  minWidth: 220,
                  pl: 2,
                  '& input': {
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.67)',
                      fontSize: 12,
                      fontFamily: 'Kufam, Arial, Sans-Serif',
                    },
                    '&:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 1000px rgba(217, 217, 217, 0.44) inset', // Set background color for autofill
                    },
                    color: 'rgba(255, 255, 255, 0.67)',
                    fontSize: 12,
                    fontFamily: 'Kufam, Arial, Sans-Serif',
                  },
                }}
              />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{
                    minWidth: 100,
                    minHeight: 30,
                    borderRadius: 1.5,
                    boxShadow: 'none',
                    mt: 2.5,
                    fontSize: 10,
                    fontWeight: 100,
                    mb: 10
                  }}
                >
                  Submit
                </Button>
            </Form>
          )}
        </Formik>
       
      </Box>
      
    );
  };
  
export default StayInformed;
