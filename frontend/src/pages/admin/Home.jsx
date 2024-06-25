import React, { useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { format } from 'date-fns';
import {BasicPie, BasicPie2, BasicPie3} from '../../components/admin/PieChart';

const Home = () => {
    const [regUsers] = useState(100); // Example value
    const [staff] = useState(20); // Example value
    const currentDate = format(new Date(), 'MMMM dd, yyyy');

    return (
        <>
            <Container maxWidth={'600px'}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 2,
                        flexWrap: 'wrap',
                    }}
                >
                    {/* Registered Users Card */}
                    <Paper
                        sx={{
                            textAlign: 'center',
                            width: 'calc(33% - 16px)',
                            padding: 2,
                            backgroundColor: '#26bdf9', // Change color as needed
                            marginBottom: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="h5" component="div" color="primary">
                                Registered Users
                            </Typography>
                            <Typography variant="h3" component="div" style={{  fontSize: 18, fontWeight: 'bold' }}>
                                {regUsers}
                            </Typography>
                        </Box>
                    </Paper>
                    {/* Staff Card */}
                    <Paper
                        sx={{
                            textAlign: 'center',
                            width: 'calc(33% - 16px)',
                            padding: 2,
                            backgroundColor: '#26bdf9', // Change color as needed
                            marginBottom: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="h5" component="div" color="primary">
                                Staff
                            </Typography>
                            <Typography variant="h3" component="div" style={{  fontSize: 18, fontWeight: 'bold' }}>
                                {staff}
                            </Typography>
                        </Box>
                    </Paper>
                    {/* Current Date Card */}
                    <Paper
                        sx={{
                            textAlign: 'center',
                            width: 'calc(33% - 16px)',
                            padding: 2,
                            backgroundColor: '#26bdf9', // Change color as needed
                            marginBottom: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="h5" component="div" color="primary">
                                Date
                            </Typography>
                            <Typography variant="h3" component="div" style={{  fontSize: 18, fontWeight: 'bold' }}>
                                {currentDate}
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Container>

            {/* Pie Chart Section */}
            <Container sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px' }}>
                {/* Second Pie Chart */}
                <Box sx={{ position: 'relative', textAlign: 'center' }}>
                    <BasicPie2 />
                    <Typography variant="body1" component="div" style={{ marginTop: '10px', fontWeight: 'bold' }}>
                        Item Categories
                    </Typography>
                </Box>
                {/* Third Pie Chart */}
                <Box sx={{ textAlign: 'center' }}>
                    <BasicPie3 />
                    <Typography variant="body1" component="div" style={{ marginTop: '10px', fontWeight: 'bold' }}>
                        Star Ratings
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

export default Home;