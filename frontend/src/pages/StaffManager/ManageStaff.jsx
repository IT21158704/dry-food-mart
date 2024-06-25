import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { RadioGroup, FormLabel, Radio, FormControlLabel, FormGroup } from '@mui/material';
import jsPDF from 'jspdf';

export default function ManageStaff() {

  const [users, setUsers] = useState([]);
  const [openSignupDialog, setOpenSignupDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNo: '',
    role: '',
  });

  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    role: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    contactNo: ''
  });

  const handleUpdateUser = (row) => {
    setOpenUpdateDialog(true);
    setUpdateFormData({
      _id: row._id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      contactNo: row.contactNo,
      role: row.role,
    });
  };

  const handleSignupDialogOpen = () => {
    setOpenSignupDialog(true);
  };

  const handleCreateUser = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    // Validation
    if (field === 'email') {
      setErrors((prevErrors) => ({ ...prevErrors, email: value ? '' : 'Email is required' }));
    }
    if (field === 'password') {
      setErrors((prevErrors) => ({ ...prevErrors, password: value ? '' : 'Password is required' }));
    }
    if (field === 'contactNo') {
      setErrors((prevErrors) => ({ ...prevErrors, contactNo: value ? '' : 'Contact number is required' }));
    }
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleDialogClose = () => {
    setOpenSignupDialog(false);
    setOpenUpdateDialog(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      contactNo: '',
      role: '',
    });
    setErrors({
      email: '',
      password: '',
      contactNo: ''
    });
  };

  const handleSubmit = async () => {
    try {
      const result = await authAxios.post(`${apiUrl}/user/create`, formData);
      if (result) {
        toast.success('Staff Member Account Created Successfully!');
      }
      getUsers();
      setOpenSignupDialog(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await authAxios.put(`${apiUrl}/user/update-account/${updateFormData._id}`, updateFormData);
      if (result) {
        getUsers();
        toast.success('Staff Member Updated Successfully!');
        handleDialogClose();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/user/delete-account/${id}`);

      if (result) {
        getUsers();
        toast.warning('Staff Member Deleted Successfully!');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      refreshPage();
    }
  };

  const getUsers = async (roleFilter) => {
    try {
      const res = await authAxios.get(`${apiUrl}/user/all`);
      if (roleFilter) {
        setUsers(res.data.filter(user => user.role === roleFilter));
      } else {
        setUsers(res.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Staff Members not found');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred while getting all staff members!');
      }
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();


    // Header
    const header = [['First Name', 'Last Name', 'Email', 'Contact No', 'Role']];
    // Data
    const data = users.filter(user => user.role !== 'customer').map(user => [user.firstName, user.lastName, user.email, user.contactNo, user.role]);
    // Set font size and align center in width
    doc.setFontSize(12);
    doc.text("Our Staff Members", doc.internal.pageSize.width / 2, 10, { align: 'center' });
    // Add header and data to the table

    doc.autoTable({
      head: header,
      body: data,
      startY: 20,
      margin: { top: 20 },
    });

    doc.save("staff_members.pdf");
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-center my-4">Manage Staff</h2>
      <div className="flex justify-between items-center mb-4">
        <div>
          <Button variant="contained" color="primary" onClick={handleSignupDialogOpen}>Add New Staff</Button>
        </div>
        <div>
          <TextField id="search" label="Search by Role" variant="outlined" size="small" onChange={(e) => getUsers(e.target.value)} />
          <Button variant="contained" color="primary" className="ml-2" onClick={handleGeneratePDF}>Generate PDF</Button>
        </div>
      </div>

      {!isLoading ? (
        <TableContainer component={Paper} className="max-w-4xl mx-auto">
          <Table>
            <TableHead>
              <TableRow className="bg-blue-200">
                <TableCell className="text-white">First Name</TableCell>
                <TableCell className="text-white">Last Name</TableCell>
                <TableCell className="text-white">Email</TableCell>
                <TableCell className="text-white">Contact No</TableCell>
                <TableCell className="text-white">Role</TableCell>
                <TableCell className="text-white">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.filter(user => user.role !== 'customer').map(user => (
                <TableRow key={user._id}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.contactNo}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" className="mr-2" onClick={() => handleUpdateUser(user)}>Update</Button>
                    <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Loader />
      )}

      <Dialog open={openSignupDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Staff</DialogTitle>
        <DialogContent>
          <form>
            <TextField required label="First Name" margin="normal" name="firstName" value={formData.firstName} onChange={(e) => handleCreateUser('firstName', e.target.value)} fullWidth />
            <TextField required label="Last Name" margin="normal" name="lastName" value={formData.lastName} onChange={(e) => handleCreateUser('lastName', e.target.value)} fullWidth />
            <TextField required label="Contact No" margin="normal" name="contactNo" value={formData.contactNo} onChange={(e) => handleCreateUser('contactNo', e.target.value)} fullWidth />
            <TextField required label="Email" margin="normal" name="email" value={formData.email} onChange={(e) => handleCreateUser('email', e.target.value)} fullWidth />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
            <TextField required type="password" label="Password" margin="normal" name="password" value={formData.password} onChange={(e) => handleCreateUser('password', e.target.value)} fullWidth />
            {errors.password && <div className="text-red-500">{errors.password}</div>}
            <FormGroup>
              <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {/* Radio buttons code */}
              </RadioGroup>
            </FormGroup>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
          <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUpdateDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Staff</DialogTitle>
        <DialogContent>
          <TextField
            required
            id="outlined-read-only-input"
            label="First Name"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, firstName: e.target.value })}
            value={updateFormData.firstName}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Last Name"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, lastName: e.target.value })}
            value={updateFormData.lastName}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Contact No"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => {
              const value = e.target.value;
              setUpdateFormData((prevData) => ({ ...prevData, contactNo: value }));
              // Contact number validation
              const contactNoPattern = /^\d{10}$/;
              if (!contactNoPattern.test(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, contactNo: 'Contact number must be 10 digits' }));
              } else {
                setErrors((prevErrors) => ({ ...prevErrors, contactNo: '' }));
              }
            }}
            value={updateFormData.contactNo}
          />
          {errors.contactNo && <div className="text-red-500">{errors.contactNo}</div>}
          <TextField
            required
            id="outlined-read-only-input"
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => {
              const value = e.target.value;
              setUpdateFormData((prevData) => ({ ...prevData, email: value }));
              // Email validation
              const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailPattern.test(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
              } else {
                setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
              }
            }}
            value={updateFormData.email}
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
          <TextField
            required
            id="outlined-read-only-input"
            label="Role"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, role: e.target.value })}
            value={updateFormData.role}
            disabled
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
