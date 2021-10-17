import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import * as accountService from '../../services/AccountService';

const AccountEdit = ({ id, ...rest }) => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.date) {
      errors.date = 'Preencha este campo';
    }

    if (!values.liters) {
      errors.liters = 'Preencha este campo';
    }

    return errors;
  };

  const submitForm = () => {
    console.log(formValues);
    accountService.update(id, formValues).then(
      () => {
        navigate('/app/account', { replace: true });
      },
      (error) => {
        setFormErrors(error);
        setIsSubmitting(false);
      }
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    console.log('teste');
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);

    submitForm();
  };

  useEffect(() => {
    console.log(`IDENTIFICADOR account: ${id}`);
    if (id) {
      accountService.get(id).then(
        (result) => {
          setFormValues(result.data.data);
        },
        (error) => {
          setFormErrors(error);
        }
      );
    }
  }, [id]);

  return (
    <Formik
      {...rest}
      initialValues={initialValues}
      validate={() => { console.log('Hey hou'); }}
      onSubmit={submitForm}
    >
      {() => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              subheader="Editar Minha Conta"
              title="Minha Conta"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Nome Completo"
                    name="name"
                    onChange={handleChange}
                    required
                    value={formValues.name}
                    variant="outlined"
                    error={Boolean(formErrors.name)}
                    helperText={formErrors.name}
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    required
                    value={formValues.email}
                    variant="outlined"
                    error={Boolean(formErrors.email)}
                    helperText={formErrors.email}
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Senha"
                    name="password"
                    onChange={handleChange}
                    value={formValues.password}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Confirmação Senha"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={formValues.confirmPassword}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button
                color="primary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Salvar
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

AccountEdit.propTypes = {
  id: PropTypes.array.isRequired
};

export default AccountEdit;
