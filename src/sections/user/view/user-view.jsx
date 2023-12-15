import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import AppScratchStatus from '../app-scratch-status';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedUser, setSelectedUser] = useState(null);

  const data = [
    { date: '01/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '02/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '03/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '04/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '05/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '06/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '07/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '08/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '09/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '10/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '11/01/2003', hand: 23, body: 24, lower: 25 },
  ];

  const handleUserNameClick = (user) => {
    setSelectedUser(user);
  };  

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    // const selectedIndex = selected.indexOf(name);
    // let newSelected = [];
    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }
    // setSelected(newSelected);
    setSelected([name]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Patients</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Patient
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 300 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      status={row.status}
                      avatarUrl={row.avatarUrl}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => {
                        handleClick(event, row.name);
                        handleUserNameClick(row);
                      }}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <br/>
      {selectedUser && 
      (<Grid xs={12} md={6} lg={8}>
          <AppScratchStatus
            title={selectedUser.name}
            chart={{
              labels: data.map(d => d.date),
              series: [
                {
                  name: 'Hand',
                  type: 'bar',
                  stacked: true,
                  data: data.map(d => d.hand)  
                },
                {
                  name: 'Body',
                  type: 'bar',
                  stacked: true,
                  data: data.map(d => d.body)
                },
                {
                  name: 'Lower',
                  type: 'bar',
                  stacked: true,
                  data: data.map(d => d.lower)
                },
                {
                  name: 'Percent',
                  type: 'area',
                  fill: 'gradient',
                  data: [10, 80, 30, 40, 50, 60, 70, 50, 90, 100, 10] 
                }
                
              ],
              options: {
                chart: {
                  type: 'bar',
                  stacked: true
                },

                plotOptions: {
                  bar: {
                    horizontal: false,
                    stacked: true,
                    columnWidth: '70%'  
                  }
                }
              }
            }}
          />
        </Grid>)}
    </Container>
  );
}
