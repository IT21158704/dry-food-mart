import React, { useEffect, useState } from 'react'
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Carasoul } from '../../components/Carasoul';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Loader from '../../components/Loader/Loader';

export default function Guest() {

    const [allItems, setAllItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getItems = async () => {
        try {
            const res = await authAxios.get(`${apiUrl}/item/all-products`);

            res.data.forEach(item => {
                if (allItems.length < 4 && allItems.length < res.data.length) {
                    allItems.push(item);
                }
            });

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
        getItems();
    }, []);

    return (
        <Container>
            <div className='mt-4'>
                <Carasoul />
            </div>
            <Divider />

            <Divider />
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#434747' }}>
                Top Selling Products
            </Typography>

            {/* Container for MediaCard components */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {
                    !isLoading ? <>
                        {/* Render MediaCard components */}
                        {allItems.map((row, index) => (
                            <div key={index} style={{ margin: '10px' }}>
                                <Card sx={{ width: 200, height: 200 }} onClick={() => navigate(`/itempage/${row._id}`)} style={{ cursor: 'pointer' }}>
                                    <CardMedia
                                        sx={{ height: 100 }}
                                        image={row.img}
                                        title={row.itemName}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {row.itemName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Rs. {row.price}.00
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </> : <Loader />}
            </div>

            {/* View More Button */}
            <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>
                <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#9ca3af', color: 'white', border: 'none', borderRadius: '5px' }}>
                    View More
                </button>
            </div>
            <hr></hr>

            <Typography variant="h5" gutterBottom style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#434747' }}>
                About Us
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#434747' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quo itaque pariatur reprehenderit! Optio magnam odio, praesentium eveniet repellat beatae odit deleniti soluta quia aperiam! Debitis suscipit alias quas omnis.
            </Typography>
        </Container>
    );
}
