import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { Delete, Money, Report, ShoppingBasket, Visibility } from "@material-ui/icons";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Home = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [orders, setOrders] = useState([]);
  const [payment, setPayment] = useState({
    email: '',
    name: '',
    cardNo: '',
  });

  const handleClickOpen = (row) => {
    setPayment({
      email: row.paymentId.email,
      name: row.paymentId.name,
      cardNo: row.paymentId.cardNo,
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const getOrders = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/order/all`);
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

  const removeOrder = async (itemId) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/order/${itemId}`);
      if (result) {
        toast.success("Removed");
        getOrders();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
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

  const [regUsers] = useState(28); // Example value
  const [staff] = useState(20); // Example value
  const currentDate = format(new Date(), 'MMMM dd, yyyy');

  return (
    <>
      <Container maxWidth={'800px'}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 2,
            flexWrap: 'wrap',
          }}
        >
          {/* Registered Users Card */}
          <Paper
            sx={{
              textAlign: 'center',
              width: 'calc(33% - 16px)',
              padding: 2,
              backgroundColor: '#26bdf9', // Change color as needed
              marginBottom: 2,
            }}
          >
            <Box>
              <Typography variant="h5" component="div" color="primary">
                Pending Orders
              </Typography>
              <Typography
                variant="h3"
                component="div"
                style={{ fontSize: 18, fontWeight: 'bold' }}
              >
                {regUsers}
              </Typography>
            </Box>
          </Paper>
          {/* Staff Card */}
          <Paper
            sx={{
              textAlign: 'center',
              width: 'calc(33% - 16px)',
              padding: 2,
              backgroundColor: '#26bdf9', // Change color as needed
              marginBottom: 2,
            }}
          >
            <Box>
              <Typography variant="h5" component="div" color="primary">
                Total Completed Orders
              </Typography>
              <Typography
                variant="h3"
                component="div"
                style={{ fontSize: 18, fontWeight: 'bold' }}
              >
                {staff}
              </Typography>
            </Box>
          </Paper>
          {/* Current Date Card */}
          <Paper
            sx={{
              textAlign: 'center',
              width: 'calc(33% - 16px)',
              padding: 2,
              backgroundColor: '#26bdf9', // Change color as needed
              marginBottom: 2,
            }}
          >
            <Box>
              <Typography variant="h5" component="div" color="primary">
                Date
              </Typography>
              <Typography
                variant="h3"
                component="div"
                style={{ fontSize: 18, fontWeight: 'bold' }}
              >
                {currentDate}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>

      <div className="flex justify-center">
        <Typography style={{ margin: '20px 0', fontSize: '32px', fontWeight: 'bold', fontFamily: 'Times New Roman' }}>
          Order Dashboard
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
                  <TableCell align="center">Total Price</TableCell>
                  <TableCell align="center">Payment Details</TableCell>
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
                    <TableCell align="center">{row.userId ? `${row.userId.firstName} ${row.userId.lastName}` : 'Unknown'}</TableCell>
                    <TableCell align="center">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center" onClick={() => { handleClickOpen(row) }} className="cursor-pointer"><Visibility /></TableCell>
                    <TableCell align="center">
                      <ToggleButtonGroup
                        value={row.status}
                        exclusive
                        onChange={(event, newStatus) => handleStatusChange(row._id, newStatus)}
                        aria-label="status"
                        size="small"
                      >
                        <ToggleButton value="pending" color="error">Pending</ToggleButton>
                        <ToggleButton value="active" color="success">Active</ToggleButton>
                      </ToggleButtonGroup>
                    </TableCell>
                    <TableCell align="center" onClick={() => { removeOrder(row._id) }} className="cursor-pointer"> <Delete color="error" /></TableCell>
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