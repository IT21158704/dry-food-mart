import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'; // Import MUI components
import { Delete } from '@mui/icons-material'; // Import MUI Delete icon
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { RadioGroup, FormLabel, Radio, FormControlLabel, FormGroup } from '@mui/material';

export default function ManageAddress() {

  const [users, setUsers] = useState([]);
  const [openSignupDialog, setOpenSignupDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    address: '',
  });

  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    address: '',
  });

  const handleUpdateUser = (row) => {
    setOpenUpdateDialog(true);
    setUpdateFormData({
      _id: row._id,
      address: row.address
    });
  };

  // Function to handle opening dialog for signup
  const handleSignupDialogOpen = () => {
    setOpenSignupDialog(true);
  };

  const handleCreateUser = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Use this function to handle changes in checkboxes
  const handleCheckboxChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Function to handle closing dialogs
  const handleDialogClose = () => {
    setOpenSignupDialog(false);
    setOpenUpdateDialog(false);
    setFormData({
      address: ''
    });
  };

  const handleSubmit = async () => {
    try {
      const result = await authAxios.post(`${apiUrl}/address`, formData);
      if (result) {
        toast.success(result.data.message);
      }
      getAddress();
      setOpenSignupDialog(false);
    } catch (error) {
      //console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await authAxios.put(`${apiUrl}/address/${updateFormData._id}`, updateFormData);
      if (result) {
        getAddress();
        toast.success('User Updated Successfully');
        handleDialogClose();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/address/${id}`);

      if (result) {
        getAddress();
        toast.warning('User Deleted Successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      refreshPage();
    }
  };

  const getAddress = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/address`);
      setUsers(res.data.addressData);
      console.log(res.data);
      setIsLoading(false);
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
    getAddress();
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-center my-4">Manage Address</h2>
      <Button variant="contained" color="primary" style={{ marginBottom: '20px' }} onClick={handleSignupDialogOpen}>Add Address</Button>

      {
        !isLoading ? <>
          <TableContainer component={Paper} style={{ maxWidth: '800px', margin: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>{index + 1 }</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Button size='small' variant="outlined" color="primary" className="mr-2" onClick={() => handleUpdateUser(user)}>Update</Button>
                      <Button size='small' variant="outlined" color="error" startIcon={<Delete />} onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </> : <Loader />}
      {/* Signup Dialog */}
      <Dialog open={openSignupDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <form>
            <TextField multiline rows={5} required label="Address" margin="normal" name="address" value={formData.address} onChange={(e) => handleCreateUser('address', e.target.value)} fullWidth />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
          <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Update Dialog */}
      <Dialog open={openUpdateDialog} onClose={handleDialogClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            required
            id="outlined-read-only-input"
            label="First Name"
            fullWidth 
            multiline 
            rows={5} 
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, address: e.target.value })}
            value={updateFormData.address}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} color="primary">Submit</Button>
          <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
