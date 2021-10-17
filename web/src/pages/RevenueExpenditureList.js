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
import {
  Search as SearchIcon,
  ArrowDown as ArrowDownIcon,
  ArrowUp as ArrowUpIcon,
} from 'react-feather';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as revenueExpenditureService from 'src/services/RevenueExpenditureService';

const RevenueExpenditureList = () => {
  const navigate = useNavigate();

  const [revenueExpenditures, setRevenueExpenditures] = useState([]);
  const [selectedRevenueExpenditureIds, setSelectedRevenueExpenditureIds] = useState([]);
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(0);

  const listRevenueExpenditures = () => {
    revenueExpenditureService.list().then(
      (result) => {
        console.log(`Registros: ${JSON.stringify(result.data.revenueExpenditures)}`);
        console.log(`Mesg: ${JSON.stringify(result.data.message)}`);

        setRevenueExpenditures(result.data.data);
      },
      (error) => {
        console.error(`Erro ao carregar animais: ${error}`);
      }
    );
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedRevenueExpenditureIds.indexOf(id);
    let newSelectedRevenueExpenditureIds = [];

    if (selectedIndex === -1) {
      newSelectedRevenueExpenditureIds = newSelectedRevenueExpenditureIds.concat(selectedRevenueExpenditureIds, id);
    } else if (selectedIndex === 0) {
      newSelectedRevenueExpenditureIds = newSelectedRevenueExpenditureIds.concat(selectedRevenueExpenditureIds.slice(1));
    } else if (selectedIndex === selectedRevenueExpenditureIds.length - 1) {
      newSelectedRevenueExpenditureIds = newSelectedRevenueExpenditureIds.concat(selectedRevenueExpenditureIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRevenueExpenditureIds = newSelectedRevenueExpenditureIds.concat(
        selectedRevenueExpenditureIds.slice(0, selectedIndex),
        selectedRevenueExpenditureIds.slice(selectedIndex + 1)
      );
    }

    setSelectedRevenueExpenditureIds(newSelectedRevenueExpenditureIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleAdd = () => {
    navigate('/app/revenue_expenditure', { state: { id: 0 } });
  };

  const handleEdit = () => {
    if (selectedRevenueExpenditureIds.length === 1) {
      console.log(`Selected ${selectedRevenueExpenditureIds[0]}`);
      navigate(
        '/app/revenue_expenditure',
        { state: { id: selectedRevenueExpenditureIds[0] } }
      );
    } else {
      alert('Por favor selecione somente 1 registro!');
    }
  };

  const handleDelete = () => {
    if (selectedRevenueExpenditureIds.length === 1) {
      console.log(`Selected ${selectedRevenueExpenditureIds[0]}`);
      revenueExpenditureService.destroy(selectedRevenueExpenditureIds[0]).then(
        () => {
          alert('RevenueExpenditure excluido com sucesso!');
          setSelectedRevenueExpenditureIds([]);
          listRevenueExpenditures();
        },
        (error) => {
          console.error(`Erro ao excluir revenueExpenditure: ${error}`);
        }
      );
    } else {
      alert('Por favor selecione somente 1 registro!');
    }
  };

  useEffect(() => {
    listRevenueExpenditures();
  }, []);

  return (
    <>
      <Helmet>
        <title>Finanças | Leite Quente</title>
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
                Lançar Finanças
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
                      placeholder="Pesquisar Receita ou despesa"
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
                          Tipo
                        </TableCell>
                        <TableCell>
                          Valor
                        </TableCell>
                        <TableCell>
                          Descrição
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {revenueExpenditures.slice(0, limit).map((revenueExpenditure) => (
                        <TableRow
                          hover
                          key={revenueExpenditure.id}
                          selected={selectedRevenueExpenditureIds.indexOf(revenueExpenditure.id) !== -1}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedRevenueExpenditureIds.indexOf(revenueExpenditure.id) !== -1}
                              onChange={(event) => handleSelectOne(event, revenueExpenditure.id)}
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
                                {`${moment(revenueExpenditure.date).format('DD/MM/YYYY')}`}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography
                              color={revenueExpenditure.type === 'R' ? 'green' : 'red'}
                              style={{ verticalAlign: 'center' }}
                            >
                              {revenueExpenditure.type === 'R' ? 'Receita ' : 'Despesa '}
                              {revenueExpenditure.type === 'R' ? <ArrowUpIcon /> : <ArrowDownIcon />}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {`R$ ${revenueExpenditure.price}`}
                          </TableCell>
                          <TableCell>
                            {revenueExpenditure.description}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={revenueExpenditures.length}
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

export default RevenueExpenditureList;
