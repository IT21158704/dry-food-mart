import { useState, useEffect } from "react";
import { apiUrl } from "../../utils/Constants";
import authAxios from "../../utils/authAxios";
import { toast } from "react-toastify";
import { Box, Container, Typography, Paper, TextField, Rating } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Ratings = () => {
    const [ratings, setRatings] = useState([]);

    const getRatings = async () => {
        try {
            const res = await authAxios.get(`${apiUrl}/review/driver`);
            setRatings(res.data.Data);
            console.log(res) // Directly set favorites to the array of favorites
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 404) {
                toast.error('Ratings is Empty');
            } else {
                toast.error(error.response?.data?.message || 'An error occurred');
            }
        }
    };

    useEffect(() => {
        getRatings();
    }, []);

    return (
        <>
            <div className="flex justify-center">
                <Typography style={{ margin: '20px 0', fontSize: '32px', fontWeight: 'bold', fontFamily: 'Times New Roman' }}>
                    Driver Ratings
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
                                    <TableCell align="center">Rate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ratings.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{row.userId.firstName}</TableCell>
                                        <TableCell align="center">
                                            <Rating name="disabled" value={row.rate} disabled /></TableCell>

                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </>
    );
};

export default Ratings;