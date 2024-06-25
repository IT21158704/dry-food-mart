import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating';
import { Button, CardActions, IconButton, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../common/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
import { toast } from 'react-toastify';

export default function Review() {
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(2);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const { userRole } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    rate: '',
    review: '',
  });

  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    rate: '',
    review: '',
  });

  const handleUpdateUser = (row) => {
    setOpen2(true);
    setUpdateFormData({
      _id: row._id,
      rate: row.rate,
      review: row.review,
    });
  };

  const handleCreateUser = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Function to handle closing dialogs
  const handleDialogClose = () => {
    setOpen(false);
    // setOpenUpdateDialog(false);
    setFormData({
      rate: '',
      review: '',
    });
  };

  const handleSubmit = async () => {
    try {
      const result = await authAxios.post(`${apiUrl}/review`, formData);
      if (result) {
        toast.success(result.data.message);
      }
      getReviews();
      setOpen(false);
    } catch (error) {
      //console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await authAxios.put(`${apiUrl}/review/${updateFormData._id}`, updateFormData);
      if (result) {
        getReviews();
        handleClose2()
        toast.success('User Updated Successfully');
        handleDialogClose();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/review/${id}`);

      if (result) {
        getReviews();
        toast.warning('Review Deleted Successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      refreshPage();
    }
  };

  const getReviews = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/review`);
      setReviews(res.data.Data);
      console.log(res.data.Data)
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

  useEffect(() => {
    getUserDetails();
    getReviews();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>

      <Typography variant="h4" gutterBottom className='text-center'>
        Review & Feedback
      </Typography>
      {userRole === 'customer' && (
        <div className='mb-3'>
          <Button variant="outlined" onClick={handleClickOpen}>Add Review</Button>
        </div>
      )}
      <Dialog
        open={open}
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
          {"Publish Review"}
        </DialogTitle>
        <DialogContent>

          <Typography component="legend">Email</Typography>
          <TextField fullWidth value={user.email} id="email" disabled />

          <Typography component="legend">Rate</Typography>
          <Rating
            name="simple-controlled"
            value={formData.rate} onChange={(e) => handleCreateUser('rate', e.target.value)}
          />

          <Typography component="legend">Feedback</Typography>

          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            fullWidth
            value={formData.review} onChange={(e) => handleCreateUser('review', e.target.value)}
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={() => { handleSubmit() }}>Publish</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {reviews.map((review, index) => (
        <Accordion expanded={expanded === index} onChange={handleChange(index)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {review.userId ? `${review.userId.firstName} ${review.userId.lastName}` : 'N/A'}
            </Typography>
            <Rating name="disabled" value={review.rate} disabled />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {review.review}
            </Typography>
            {review.userId && review.userId._id && user._id === review.userId._id && (
              <div disableSpacing className='text-right'>
                <IconButton aria-label="add to favorites" onClick={() => handleUpdateUser(review)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="share" onClick={() => { handleDeleteUser(review._id) }}>
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </AccordionDetails>
        </Accordion>

      ))}
      <Dialog
        open={open2}
        onClose={handleClose2}
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
          {"Update Review"}
        </DialogTitle>
        <DialogContent>

          <Typography component="legend">Email</Typography>
          <TextField fullWidth value={user.email} id="email" disabled />

          <Typography component="legend">Rate</Typography>
          <Rating
            name="simple-controlled"
            onChange={(e) => setUpdateFormData({ ...updateFormData, rate: e.target.value })}
            value={updateFormData.rate}
          />

          <Typography component="legend">Feedback</Typography>

          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            fullWidth
            onChange={(e) => setUpdateFormData({ ...updateFormData, review: e.target.value })}
            value={updateFormData.review}
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={handleUpdate}>Publish</Button>
          <Button onClick={handleClose2} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}