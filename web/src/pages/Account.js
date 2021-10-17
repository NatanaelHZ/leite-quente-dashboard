import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
// eslint-disable-next-line import/no-unresolved
import AccountProfile from 'src/components/account/AccountProfile';
// eslint-disable-next-line import/no-unresolved
import AccountEdit from 'src/components/account/AccountEdit';
import * as authService from '../services/AuthService';

const Account = () => {
  const [idUser, setIdUser] = useState(0);
  const [user, setUser] = useState(0);

  useEffect(() => {
    setIdUser(authService.getCurrentUserId);
    console.log(`Animal: ${idUser}`);
  }, [idUser]);

  useEffect(() => {
    const currentUser = {
      avatar: '/static/images/avatars/avatar_6.png',
      name: authService.getCurrentUserName(),
      email: authService.getCurrentUserEmail()
    };

    setUser(currentUser);
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Conta | Leite Quente</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile user={user} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountEdit id={idUser} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
