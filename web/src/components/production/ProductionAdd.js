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
import * as productionService from '../../services/ProductionService';

const ProductionAdd = () => {
  const navigate = useNavigate();

  const initialValues = {
    date: '',
    description: '',
    price: '',
    liters: ''
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
    productionService.create(formValues).then(
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

  return (
    <Formik
      initialValues={initialValues}
      validate={() => { console.log('Hey hou'); }}
      onSubmit={submitForm}
    >
      {() => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              subheader="Cadastrar nova produção"
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
                  md={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Data"
                    name="date"
                    onChange={handleChange}
                    required
                    value={formValues.date}
                    variant="outlined"
                    error={Boolean(formErrors.date)}
                    helperText={formErrors.date}
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Litros"
                    name="liters"
                    onChange={handleChange}
                    required
                    value={formValues.liters}
                    variant="outlined"
                    error={Boolean(formErrors.liters)}
                    helperText={formErrors.liters}
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="R$ Valor"
                    name="price"
                    onChange={handleChange}
                    required
                    value={formValues.price}
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
                    label="Descrição"
                    name="description"
                    onChange={handleChange}
                    value={formValues.description}
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

export default ProductionAdd;
