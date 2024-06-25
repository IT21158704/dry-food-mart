import React, { useState } from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../utils/Constants";
import authAxios from "../../utils/authAxios";
import { toast } from "react-toastify";

export default function InventoryAddItems() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        itemName: '',
        category: '',
        quantity: '',
        price: '',
        img: ''
    });

    const isValidUrl = (url) => {
        // Regular expression to validate URL
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlPattern.test(url);
    };

    const handleSubmit = async () => {
        try {
            // Validating quantity and price as integers
            if (formData.quantity === '' || isNaN(parseInt(formData.quantity))) {
                toast.error("Quantity must be a valid integer.");
                return;
            }

            if (formData.price === '' || isNaN(parseInt(formData.price))) {
                toast.error("Price must be a valid integer.");
                return;
            }

            // Validating image link as a URL
            if (formData.img !== '' && !isValidUrl(formData.img)) {
                toast.error("Image link must be a valid URL.");
                return;
            }

            const result = await authAxios.post(`${apiUrl}/item/create-product`, formData);
            if (result) {
                toast.success(result.data.message);
                navigate('/inventory');
            }
            getUsers();
        } catch (error) {
            //console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const handleCreate = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    return (
        <>
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl text-center mb-6">Inventory Add</h1>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Item Name"
                            variant="outlined"
                            value={formData.itemName}
                            onChange={(e) => handleCreate('itemName', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                value={formData.category}
                                onChange={(e) => handleCreate('category', e.target.value)}
                                label="Category"
                            >
                                <MenuItem value="Snacks">Snacks</MenuItem>
                                <MenuItem value="Bakery">Bakery</MenuItem>
                                <MenuItem value="Sweets">Sweets</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Quantity"
                            variant="outlined"
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => handleCreate('quantity', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            type="number"
                            variant="outlined"
                            value={formData.price}
                            onChange={(e) => handleCreate('price', e.target.value)}
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
                </Grid>
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={() => handleSubmit()} style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '8px' }} variant="contained" fullWidth>
                        Add
                    </Button>
                    <div style={{ width: '8px' }}></div> {/* This adds space between buttons */}
                    <Button style={{ backgroundColor: '#f44336', color: 'white' }} variant="contained" fullWidth component={Link} to="/inventory">
                        Cancel
                    </Button>
                </div>
            </div>
        </>
    );
}
