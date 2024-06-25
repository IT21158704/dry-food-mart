import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import { stringAvatar } from './Dashboard'
import Loader from '../../components/Loader/Loader';
import { useAuth } from '../common/AuthContext';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Use Tailwind CSS classes
const CenteredContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '65vh',
}));

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

// React functional component
const UserProfile = () => {

  const navigate = useNavigate();
  const { logout, userRole } = useAuth();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    role: '',
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

  const handleDialogClose = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdate = async () => {
    try {
      const result = await authAxios.put(`${apiUrl}/user/update-account/${updateFormData._id}`, updateFormData);
      if (result) {
        getUserDetails()
        toast.success('User Updated Successfully');
        handleDialogClose();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/user/get-user`);
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('user profile not found.');
      } else {
        // toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/user/delete-account/${id}`);

      if (result) {
        toast.warning('User Deleted Successfully');
        logout()
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      refreshPage();
    }
  };

  useEffect(() => {
    getUserDetails()
  }, []);

  return (
    <CenteredContainer container>
      {
        !isLoading ? <>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <ProfilePaper elevation={3}>
              {/* Avatar */}
              <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                sx={{ width: 100, height: 100, margin: '0 auto' }}
              />

              <Typography variant="h5" sx={{ marginTop: 1 }}>
                {user.firstName} {user.lastName}
              </Typography>

              <Typography variant="caption" display="block" sx={{ marginBottom: 1 }}>
                {user.role}
              </Typography>

              <Divider sx={{ marginBottom: 2 }} />

              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <span style={{ fontWeight: 'bold', color: '#444' }}>Email:</span> {user.email}
              </Typography>

              {/* Phone Number */}
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <span style={{ fontWeight: 'bold', color: '#444' }}>Phone:</span> {user.contactNo}
              </Typography>

              {/* Phone Number */}
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <span style={{ fontWeight: 'bold', color: '#444' }}>Create Date:</span> {user.createdAt}
              </Typography>
              {userRole === 'customer' && (
                <div>
                  <Button color='success' onClick={() =>{navigate('/customer/address')}}>Manage Address</Button>
                </div>
              )}
              <div>
                <Button  onClick={() => handleUpdateUser(user)} >Edit</Button>
                <Button color='error' onClick={() => handleDeleteUser(user._id)} >Delete</Button>
              </div>
            </ProfilePaper>
          </Grid>
        </> : <Loader />
      }
      <Dialog open={openUpdateDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Details</DialogTitle>
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
            onChange={(e) => setUpdateFormData({ ...updateFormData, contactNo: e.target.value })}
            value={updateFormData.contactNo}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, email: e.target.value })}
            value={updateFormData.email}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} color="primary">Submit</Button>
          <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </CenteredContainer>
  );
};

export default UserProfile;
