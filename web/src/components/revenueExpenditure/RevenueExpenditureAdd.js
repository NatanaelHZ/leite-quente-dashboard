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
import * as revenueExpenditureService from '../../services/RevenueExpenditureService';
import revenueExpenditures from '../../__mocks__/revenueExpenditures';

const RevenueExpenditureAdd = () => {
  const navigate = useNavigate();

  const initialValues = {
    date: '',
    description: '',
    price: '',
    type: ''
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.date) {
      errors.date = 'Preencha este campo';
    }

    if (!values.type) {
      errors.type = 'Preencha este campo';
    }

    return errors;
  };

  const submitForm = () => {
    console.log(formValues);
    revenueExpenditureService.create(formValues).then(
      () => {
        navigate('/app/revenues_expenditures', { replace: true });
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
              subheader="Cadastrar nova Receita ou Despesa"
              title="Receitas e Despesas"
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
                    label="Tipo"
                    name="type"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={formValues.type}
                    variant="outlined"
                  >
                    {revenueExpenditures.map((option) => (
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

export default RevenueExpenditureAdd;
