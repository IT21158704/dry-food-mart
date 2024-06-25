import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import authAxios from "../../utils/authAxios";
import { apiUrl } from "../../utils/Constants";
import { format } from 'date-fns';
import jsPDF from 'jspdf';

const FeedbackHome = () => {
    const [feedback, setFeedback] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        getReviews();
    }, []);

    const getReviews = async () => {
        try {
            const res = await authAxios.get(`${apiUrl}/review/`);
            setFeedback(res.data.Data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch feedback and ratings');
        }
    };

    const removeFeedback = async (id) => {
        try {
            await authAxios.delete(`${apiUrl}/review/${id}`);
            toast.success('Feedback deleted successfully');
            setFeedback(feedback.filter(entry => entry._id !== id));
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete feedback');
        }
    };

    const handleGeneratePdf = () => {
        const doc = new jsPDF();
        doc.text("Feedback and Ratings Dashboard", 14, 25);
        const tableData = filteredFeedback.map((entry, index) => [
            index + 1,
            entry.rate,
            entry.review,
            format(new Date(entry.createdAt), 'MMMM dd, yyyy')
        ]);
        doc.autoTable({
            startY: 35,
            head: [['ID', 'Rate', 'Review', 'Date']],
            body: tableData
        });
        doc.save('feedback.pdf');
    };

    const filteredFeedback = feedback.filter(entry =>
        entry.review.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <Container maxWidth={'800px'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Typography style={{ fontSize: '32px', fontWeight: 'bold', fontFamily: 'Times New Roman' }}>
                    Feedback and Ratings Dashboard
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        label="Search by Review"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        variant="outlined"
                        size="small"
                        style={{ marginRight: '20px' }}
                    />
                    <Button onClick={handleGeneratePdf} variant="contained" color="primary">Generate Pdf</Button>
                </div>
            </div>
            <Paper sx={{ width: '100%', marginTop: 2 }}>
                <TableContainer sx={{ maxHeight: '100%' }}>
                    <Table stickyHeader aria-label="sticky table" id="feedbackTable">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Rate</TableCell>
                                <TableCell align="center">Review</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredFeedback.map((entry, index) => (
                                <TableRow key={entry._id}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{entry.rate}</TableCell>
                                    <TableCell align="center">{entry.review}</TableCell>
                                    <TableCell align="center">{format(new Date(entry.createdAt), 'MMMM dd, yyyy')}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => removeFeedback(entry._id)} variant="contained" color="error">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default FeedbackHome;
