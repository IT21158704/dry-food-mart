import React, { useState } from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../utils/Constants";
import authAxios from "../../utils/authAxios";
import { toast } from "react-toastify";

export default function AddNews() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    img: ''
  });

  const handleSubmit = async () => {
    try {
      // Basic form validation
      if (!formData.title || !formData.description || !formData.img) {
        toast.error("Please fill in all fields.");
        return;
      }

      // Image URL validation
      if (!isValidUrl(formData.img)) {
        toast.error("Please enter a valid image URL.");
        return;
      }

      const result = await authAxios.post(`${apiUrl}/news`, formData);
      if (result) {
        toast.success(result.data.message);
        navigate('/news');
      }
      getUsers();
    } catch (error) {
      //console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Function to validate URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleCreate = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (<>
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl text-center mb-6">Inventory Add</h1>
      <Grid item xs={6}>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          variant="outlined"
          value={formData.title}
          onChange={(e) => handleCreate('title', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          margin="normal"
          label="Image Link"
          variant="outlined"
          value={formData.img}
          onChange={(e) => handleCreate('img', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          margin="normal"
          multiline
          rows={4}
          label="description"
          variant="outlined"
          value={formData.description}
          onChange={(e) => handleCreate('description', e.target.value)}
        />
      </Grid>

      <br></br>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => handleSubmit()} style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '8px' }} variant="contained" fullWidth>
          Add
        </Button>
        <div style={{ width: '8px' }}></div> {/* This adds space between buttons */}
        <Button style={{ backgroundColor: '#f44336', color: 'white' }} variant="contained" fullWidth component={Link} to="/news">
          Cancel
        </Button>
      </div>
    </div>
  </>
  );
}
