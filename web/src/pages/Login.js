import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import * as authService from '../services/AuthService';

const Login = () => {
  const navigate = useNavigate();

  const initialValues = { email: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = 'Preencha este campo';
    } else if (!regex.test(values.email)) {
      errors.email = 'Formato inválido';
    }

    if (!values.password) {
      errors.password = 'Preencha este campo';
    } else if (values.password.length < 4) {
      errors.password = 'A senha deve ter mais de 4 caracteres';
    }

    return errors;
  };

  const submitForm = () => {
    console.log(formValues);
    authService.login(formValues.email, formValues.password).then(
      () => {
        navigate('/app/dashboard', { replace: true });
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
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    } else {
      setIsSubmitting(false);
    }
  }, [formErrors]);

  return (
    <>
      <Helmet>
        <title>Login | Leite Quente</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitForm}
          >
            {() => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Login
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body1"
                    fontSize="1.1rem"
                  >
                    Faça login para entrar na plataforma Leite Quente 🐄🐮🌱👨‍🌾👩‍🌾💻
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(formErrors.email)}
                  fullWidth
                  helperText={formErrors.email}
                  label="E-mail"
                  margin="normal"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  value={formValues.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formErrors.password)}
                  fullWidth
                  helperText={formErrors.password}
                  label="Senha"
                  margin="normal"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formValues.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Ainda não tem conta?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Criar conta
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
