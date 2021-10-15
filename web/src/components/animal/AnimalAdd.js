/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
// eslint-disable-next-line import/extensions
import * as animalService from '../services/AnimalService';

const breeds = [
  {
    value: '1',
    label: 'Holandesa'
  },
  {
    value: '2',
    label: 'Jersey'
  },
  {
    value: '3',
    label: 'Girolando'
  }
];

const genres = [
  {
    value: 'F',
    label: 'Feminino'
  },
  {
    value: 'M',
    label: 'Masculino'
  },
];

const AnimalAdd = (props) => {
  const navigate = useNavigate();

  const initialValues = {
    registerNumber: null,
    name: '',
    registerMotherNumber: null,
    registerFatherNumber: null,
    genre: null,
    breed_id: null
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.registerNumber) {
      errors.registerNumber = 'Preencha este campo';
    }

    if (!values.name) {
      errors.name = 'Preencha este campo';
    }

    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const submitForm = () => {
    console.log(formValues);
    animalService.create(formValues).then(
      () => {
        navigate('/app/animal', { replace: true });
      },
      (error) => {
        setFormErrors(error);
        setIsSubmitting(false);
      }
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {() => (
        <form {...props} onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              subheader="Cadastro novo animal"
              title="Animal"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={3}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="N° Registro"
                    name="registerNumber"
                    onChange={handleChange}
                    required
                    value={formValues.registerNumber}
                    variant="outlined"
                    helperText={formErrors.registerNumber}
                  />
                </Grid>
                <Grid
                  item
                  md={9}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Nome"
                    name="name"
                    onChange={handleChange}
                    required
                    value={formValues.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Número Mãe"
                    name="registerMotherNumber"
                    onChange={handleChange}
                    required
                    value={formValues.registerMotherNumber}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Número Pai"
                    name="registerFatherNumber"
                    onChange={handleChange}
                    value={formValues.registerFatherNumber}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Sexo"
                    name="genre"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={formValues.genre}
                    variant="outlined"
                  >
                    {genres.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Raça"
                    name="breed_id"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={formValues.breed_id}
                    variant="outlined"
                  >
                    {breeds.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </TextField>
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
                variant="contained"
                disabled={isSubmitting}
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

export default AnimalAdd;
