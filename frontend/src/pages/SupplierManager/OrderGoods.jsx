import React, { useState, useEffect } from "react";
import { apiUrl } from "../../utils/Constants";
import authAxios from "../../utils/authAxios";
import { toast } from "react-toastify";
import { Box, Container, Typography, Paper, TextField, Rating, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const OrderGoods = () => {
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        sendTo: '',
        item: '', // Change this to an empty object initially
        quentity: 1,
    });
    const [mailData, setMailData] = useState({
        sendTo: '',
        subject: 'Order Goods',
        description: '',
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            // Validate form data
            if (!formData.sendTo || !formData.item || !formData.quentity) {
                toast.error("Please fill in all fields");
                return;
            }

            // Submit order request
            const result = await authAxios.post(`${apiUrl}/supplier/order`, formData);
            if (result) {
                // Update mailData before sending email notification
                setMailData({
                    sendTo: formData.sendTo,
                    subject: 'Order Goods',
                    description: `Item: ${formData.item.itemName}.\nQuentity: ${formData.quentity}`,
                });

                // Send email notification
                const result2 = await authAxios.post(`${apiUrl}/user/send-email`, mailData);
                if (result2) {
                    const newQty = parseInt(formData.item.quantity) + parseInt(formData.quentity);
                    // Update quantity
                    const result3 = await authAxios.put(`${apiUrl}/item/update-product/${formData.item._id}`, { quantity: newQty });
                    if (result3) {
                        toast.success("Request sent successfully");
                    }
                }
            }
            // Refresh orders list
            getOrders();
            setOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    const getItems = async () => {
        try {
            const res = await authAxios.get(`${apiUrl}/item/all-products`);
            setItems(res.data);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 404) {
                toast.error('Products not found');
            } else {
                toast.error(error.response?.data?.message || 'An error occurred');
            }
        }
    };

    const getOrders = async () => {
        try {
            const res = await authAxios.get(`${apiUrl}/supplier/order`);
            setOrders(res.data);
            console.log(res)
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
        getItems();
        getOrders();
    }, []);

    useEffect(() => {
        // Update mailData only if formData.item is not empty
        if (formData.item) {
            setMailData({
                ...mailData,
                sendTo: formData.sendTo,
                description: `Item: ${formData.item.itemName}\nQuentity: ${formData.quentity}`,
            });
        }
    }, [formData]);

    return (
        <>
            <div className="flex justify-center">
                <Typography style={{ margin: '20px 0', fontSize: '32px', fontWeight: 'bold', fontFamily: 'Times New Roman' }}>
                    Order Goods
                </Typography>
            </div>

            <Container maxWidth={'800px'}>
                <Button onClick={handleClickOpen}>Send Mail Request</Button>
                <Paper sx={{ width: '100%', marginTop: 2 }}>
                    <TableContainer sx={{ maxHeight: '100%' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Order ID</TableCell>
                                    <TableCell align="center">Supplier Email</TableCell>
                                    <TableCell align="center">Item Name</TableCell>
                                    <TableCell align="center">Quentity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((row, index) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{row.sendTo}</TableCell>
                                        <TableCell align="center">{row.item.itemName}</TableCell>
                                        <TableCell align="center">{row.quentity}</TableCell>

                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>

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
                    Order Goods
                </DialogTitle>
                <DialogContent>

                    <Typography component="legend">Email</Typography>
                    <TextField
                        id="outlined-multiline-static"
                        fullWidth
                        value={formData.sendTo} onChange={(e) => handleCreate('sendTo', e.target.value)}
                    />

                    <Typography component="legend">Item</Typography>

                    <Select
                        fullWidth
                        labelId="category-label"
                        value={formData.item}
                        onChange={(e) => handleCreate('item', e.target.value)}
                    >
                        {items.map(item => (
                            <MenuItem key={item._id} value={item}>{item.itemName}</MenuItem>
                        ))}
                    </Select>

                    <Typography component="legend">Quentity</Typography>
                    <TextField
                        id="outlined-multiline-static"
                        fullWidth
                        type="number"
                        value={formData.quentity} onChange={(e) => handleCreate('quentity', e.target.value)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => { handleSubmit() }}>Publish</Button>
                    <Button onClick={handleClose} autoFocus>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default OrderGoods;
