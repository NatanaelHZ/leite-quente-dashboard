import React, { useState } from 'react';
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
  const initialValues = {
    registerNumber: null,
    name: '',
    registerMotherNumber: null,
    registerFatherNumber: null,
    genre: null,
    breed: null
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
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
                name="breed"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={formValues.breed}
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
          >
            Salvar
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AnimalAdd;
