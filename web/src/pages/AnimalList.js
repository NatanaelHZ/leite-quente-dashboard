import React, { useEffect, useState } from 'react';
/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
// eslint-disable-next-line import/no-unresolved
import getInitials from 'src/utils/getInitials';
// eslint-disable-next-line import/no-unresolved
import getBreeds from 'src/utils/getBreeds';

import * as animalService from 'src/services/AnimalService';

const AnimalList = () => {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [selectedAnimalIds, setSelectedAnimalIds] = useState([]);
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(0);
  const [avatar, setAvatar] = useState('');

  const listAnimals = () => {
    animalService.list().then(
      (result) => {
        console.log(`Registros: ${JSON.stringify(result.data.animals)}`);
        console.log(`Mesg: ${JSON.stringify(result.data.message)}`);

        setAnimals(result.data.data);
      },
      (error) => {
        console.error(`Erro ao carregar animais: ${error}`);
      }
    );
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedAnimalIds.indexOf(id);
    let newSelectedAnimalIds = [];

    if (selectedIndex === -1) {
      newSelectedAnimalIds = newSelectedAnimalIds.concat(selectedAnimalIds, id);
    } else if (selectedIndex === 0) {
      newSelectedAnimalIds = newSelectedAnimalIds.concat(selectedAnimalIds.slice(1));
    } else if (selectedIndex === selectedAnimalIds.length - 1) {
      newSelectedAnimalIds = newSelectedAnimalIds.concat(selectedAnimalIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedAnimalIds = newSelectedAnimalIds.concat(
        selectedAnimalIds.slice(0, selectedIndex),
        selectedAnimalIds.slice(selectedIndex + 1)
      );
    }

    setSelectedAnimalIds(newSelectedAnimalIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleAdd = () => {
    navigate('/app/animal', { state: { id: 0 } });
  };

  const handleEdit = () => {
    if (selectedAnimalIds.length === 1) {
      console.log(`Selected ${selectedAnimalIds[0]}`);
      navigate('/app/animal', { state: { id: selectedAnimalIds[0] } });
    } else {
      alert('Por favor selecione somente 1 registro!');
    }
  };

  const handleDelete = () => {
    if (selectedAnimalIds.length === 1) {
      console.log(`Selected ${selectedAnimalIds[0]}`);
      animalService.destroy(selectedAnimalIds[0]).then(
        () => {
          alert('Animal excluido com sucesso!');
          setSelectedAnimalIds([]);
          listAnimals();
        },
        (error) => {
          console.error(`Erro ao excluir animal: ${error}`);
        }
      );
    } else {
      alert('Por favor selecione somente 1 registro!');
    }
  };

  useEffect(() => {
    listAnimals();
  }, []);

  useEffect(() => {
    setAvatar('/static/images/avatars/avatar.png');
  }, []);

  return (
    <>
      <Helmet>
        <title>Animais | Leite Quente</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                color="danger"
                onClick={handleDelete}
              >
                Excluir
              </Button>
              <Button
                sx={{ mx: 1 }}
                variant="outlined"
                startIcon={<EditIcon />}
                color="edit"
                onClick={handleEdit}
              >
                Editar
              </Button>
              <Button
                color="primary"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
              >
                Novo Animal
              </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box sx={{ maxWidth: 500 }}>
                    <TextField
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon
                              fontSize="small"
                              color="action"
                            >
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        )
                      }}
                      placeholder="Pesquisar Animal"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box sx={{ pt: 3 }}>
            <Card>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ color: 'transparent' }}>
                          +
                        </TableCell>
                        <TableCell>
                          Nome
                        </TableCell>
                        <TableCell>
                          N° Registro
                        </TableCell>
                        <TableCell>
                          Raça
                        </TableCell>
                        <TableCell>
                          Sexo
                        </TableCell>
                        <TableCell>
                          Data Nasc.
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {animals.slice(0, limit).map((animal) => (
                        <TableRow
                          hover
                          key={animal.id}
                          selected={selectedAnimalIds.indexOf(animal.id) !== -1}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedAnimalIds.indexOf(animal.id) !== -1}
                              onChange={(event) => handleSelectOne(event, animal.id)}
                              value="true"
                            />
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: 'center',
                                display: 'flex'
                              }}
                            >
                              <Avatar
                                src={avatar}
                                sx={{ mr: 2 }}
                              >
                                {getInitials(animal.name)}
                              </Avatar>
                              <Typography
                                color="textPrimary"
                                variant="body1"
                              >
                                {animal.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {animal.registerNumber}
                          </TableCell>
                          <TableCell>
                            {`${getBreeds(animal.breed_id)}`}
                          </TableCell>
                          <TableCell>
                            {animal.genre === 'M' ? 'Macho' : 'Fêmea'}
                          </TableCell>
                          <TableCell>
                            {moment(animal.birthDate).format('DD/MM/YYYY')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={animals.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AnimalList;
