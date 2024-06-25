import { useState, useEffect } from "react";
import { apiUrl } from "../../utils/Constants";
import authAxios from "../../utils/authAxios";
import { toast } from "react-toastify";
import { Container, Typography, Paper, FormControl, Select, MenuItem, Chip } from '@mui/material';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Delete } from "@mui/icons-material";
import jsPDF from "jspdf";

const Home = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const [updateFormData, setUpdateFormData] = useState({
      _id: '',
      driverId: ''
  });

  const handleClickOpen = (row) => {
    setUpdateFormData({
      _id: row._id,
      driverId: row.driverId,
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const getUsers = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/user/all`);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Products not found');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getOrders = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/order/all`);
      setOrders(res.data);
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
        toast.success("Order Cancelled and Removed successfully!");
        getOrders();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    // Header
    const header = [['Customer Name', 'Date', 'Address', 'Driver Name', 'Status']];
    // Data
    const data = orders.map((orders) => [
      orders.userId.firstName,
      new Date(orders.createdAt).toLocaleDateString(),
      orders.address,
      orders.driverId ? orders.driverId.firstName : 'N/A',
      orders.status,
    ]);
    // Set font size and align center in width
    doc.setFontSize(12);
    doc.text("Delivery Details", doc.internal.pageSize.width / 2, 10, { align: 'center' });
    // Add header and data to the table
    doc.autoTable({
      head: header,
      body: data,
      startY: 20,
      margin: { top: 20 },
    });

    doc.save("Delivers.pdf");
  }

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

  const handleStatusChange = async () => {
    try {
      const result = await authAxios.put(`${apiUrl}/order/${updateFormData._id}`, updateFormData);
      if (result) {
        getOrders();
        handleClose();
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
          Delivery Dashboard
        </Typography>
      </div>
      <Button variant="contained" color="primary" style={{ marginBottom: '20px' }} onClick={handleGeneratePDF}>Generate PDF</Button>

      <Container maxWidth={'800px'}>
        <Paper sx={{ width: '100%', marginTop: 2 }}>
          <TableContainer sx={{ maxHeight: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Order ID</TableCell>
                  <TableCell align="center">Customer Name</TableCell>
                  <TableCell align="center">Placed Date</TableCell>
                  <TableCell align="center">Address</TableCell>
                  <TableCell align="center">Driver Name</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.userId ? `${row.userId.firstName} ${row.userId.lastName}` : 'N/A'}</TableCell>
                    <TableCell align="center">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{row.address}</TableCell>
                    <TableCell align="center" onClick={() => { handleClickOpen(row) }} className="cursor-pointer">
                      <Button>{row.driverId ? row.driverId.firstName : 'Assign a driver'}</Button>
                    </TableCell>
                    <TableCell align="center"><Chip label={row.status} color="primary" variant="outlined" /></TableCell>
                    <TableCell align="center" onClick={() => { removeOrder(row._id) }} className="cursor-pointer">
                      <Delete color="error" />
                    </TableCell>
                    
                    {/* Change Driver button */}
                    {row.driverId && row.status !== 'completed' && (
                      <TableCell align="center">
                        <Button onClick={() => { handleClickOpen(row) }}>Change Driver</Button>
                      </TableCell>
                    )}

                    {/* Dialog for assigning/changing a driver */}
                    <Dialog
                      open={open && (updateFormData._id === row._id || row.driverId)}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      PaperProps={{
                        style: {
                          width: '33%',
                          minWidth: '200px',
                          maxWidth: '500px',
                        },
                      }}
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Assign a driver"}
                      </DialogTitle>
                      <DialogContent>
                        <FormControl fullWidth variant="outlined">
                          <Typography component="legend">Available Drivers</Typography>
                          <Select
                            labelId="category-label"
                            onChange={(e) => setUpdateFormData({ ...updateFormData, driverId: e.target.value })}
                          >
                            {users.filter(user => user.role === 'driver').map(user => (
                              <MenuItem key={user._id} value={user._id}>{user.firstName} {user.lastName}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleStatusChange} autoFocus>
                          Save
                        </Button>
                        <Button onClick={handleClose} autoFocus>
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 25, 100]}
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
