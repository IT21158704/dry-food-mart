import { useState, useEffect } from "react";
import { apiUrl } from "../../utils/Constants";
import authAxios from "../../utils/authAxios";
import { toast } from "react-toastify";
import { Box, Container, Typography, Paper, TextField } from '@mui/material';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Home = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({});


  const getUserDetails = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/user/get-user`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('user profile not found.');
      } else {
        // toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  const getOrders = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/order/driver`);
      setOrders(res.data);
      console.log(orders) // Directly set favorites to the array of favorites
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Orders is Empty');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    getUserDetails();
    getOrders();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };




  const handleStatusChange = async (id, newStatus) => {
    try {
      const result = await authAxios.put(`${apiUrl}/order/${id}`, { status: newStatus });
      if (result) {
        getOrders();
        toast.success('Updated Successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <Typography style={{ margin: '20px 0', fontSize: '32px', fontWeight: 'bold', fontFamily: 'Times New Roman' }}>
          Driver Dashboard
        </Typography>
      </div>

      <Container maxWidth={'800px'}>
        <Paper sx={{ width: '100%', marginTop: 2 }}>
          <TableContainer sx={{ maxHeight: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Order ID</TableCell>
                  <TableCell align="center">Customer Name</TableCell>
                  <TableCell align="center">Placed Date</TableCell>
                  <TableCell align="center">Delivery Address</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {orders.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.userId.firstName} {row.userId.lastName}</TableCell>
                  <TableCell align="center">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">
                    <ToggleButtonGroup
                      value={row.status}
                      exclusive
                      onChange={(event, newStatus) => handleStatusChange(row._id, newStatus)}
                      aria-label="status"
                      size="small"
                    >
                      <ToggleButton value="completed" color="success">Delivered</ToggleButton>
                    </ToggleButtonGroup>
                  </TableCell>
                </TableRow>

                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 25, 100]} // Include 3 as an option
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </>
  );
};

export default Home;