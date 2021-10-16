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
import * as productionService from '../../services/ProductionService';
import breeds from '../../__mocks__/breeds';
import genres from '../../__mocks__/genres';

const ProductionEdit = ({ id, ...rest }) => {
  const navigate = useNavigate();

  const initialValues = {
    registerNumber: '',
    name: '',
    registerMotherNumber: '',
    registerFatherNumber: '',
    genre: '',
    breed_id: ''
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

  const submitForm = () => {
    console.log(formValues);
    productionService.update(id, formValues).then(
      () => {
        navigate('/app/productions', { replace: true });
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
    console.log(`IDENTIFICADOR production: ${id}`);
    if (id) {
      productionService.get(id).then(
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
              subheader="Editando produção"
              title="Produção"
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
                    error={Boolean(formErrors.registerNumber)}
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
                    error={Boolean(formErrors.name)}
                    helperText={formErrors.name}
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

ProductionEdit.propTypes = {
  id: PropTypes.array.isRequired
};

export default ProductionEdit;
