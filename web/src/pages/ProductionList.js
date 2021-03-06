import React, { useEffect, useState } from 'react';
/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
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
import * as productionService from 'src/services/ProductionService';

const ProductionList = () => {
  const navigate = useNavigate();

  const [productions, setProductions] = useState([]);
  const [selectedProductionIds, setSelectedProductionIds] = useState([]);
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(0);

  const listProductions = () => {
    productionService.list().then(
      (result) => {
        console.log(`Registros: ${JSON.stringify(result.data.productions)}`);
        console.log(`Mesg: ${JSON.stringify(result.data.message)}`);

        setProductions(result.data.data);
      },
      (error) => {
        console.error(`Erro ao carregar : ${error}`);
      }
    );
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProductionIds.indexOf(id);
    let newSelectedProductionIds = [];

    if (selectedIndex === -1) {
      newSelectedProductionIds = newSelectedProductionIds.concat(selectedProductionIds, id);
    } else if (selectedIndex === 0) {
      newSelectedProductionIds = newSelectedProductionIds.concat(selectedProductionIds.slice(1));
    } else if (selectedIndex === selectedProductionIds.length - 1) {
      newSelectedProductionIds = newSelectedProductionIds.concat(selectedProductionIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProductionIds = newSelectedProductionIds.concat(
        selectedProductionIds.slice(0, selectedIndex),
        selectedProductionIds.slice(selectedIndex + 1)
      );
    }

    setSelectedProductionIds(newSelectedProductionIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleAdd = () => {
    navigate('/app/production', { state: { id: 0 } });
  };

  const handleEdit = () => {
    if (selectedProductionIds.length === 1) {
      console.log(`Selected ${selectedProductionIds[0]}`);
      navigate('/app/production', { state: { id: selectedProductionIds[0] } });
    } else {
      alert('Por favor selecione somente 1 registro!');
    }
  };

  const handleDelete = () => {
    if (selectedProductionIds.length === 1) {
      console.log(`Selected ${selectedProductionIds[0]}`);
      productionService.destroy(selectedProductionIds[0]).then(
        () => {
          alert('Production excluido com sucesso!');
          setSelectedProductionIds([]);
          listProductions();
        },
        (error) => {
          console.error(`Erro ao excluir production: ${error}`);
        }
      );
    } else {
      alert('Por favor selecione somente 1 registro!');
    }
  };

  useEffect(() => {
    listProductions();
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
                Lan??ar Produ????o
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
                      placeholder="Pesquisar Produ????o"
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
                          Data
                        </TableCell>
                        <TableCell>
                          Litros
                        </TableCell>
                        <TableCell>
                          Valor
                        </TableCell>
                        <TableCell>
                          Descri????o
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productions.slice(0, limit).map((production) => (
                        <TableRow
                          hover
                          key={production.id}
                          selected={selectedProductionIds.indexOf(production.id) !== -1}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedProductionIds.indexOf(production.id) !== -1}
                              onChange={(event) => handleSelectOne(event, production.id)}
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
                              <Typography
                                color="textPrimary"
                                variant="body1"
                              >
                                {`${moment(production.date).format('DD/MM/YYYY')}`}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {production.liters}
                          </TableCell>
                          <TableCell>
                            {`R$ ${production.price}`}
                          </TableCell>
                          <TableCell>
                            {production.description}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={productions.length}
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

export default ProductionList;
