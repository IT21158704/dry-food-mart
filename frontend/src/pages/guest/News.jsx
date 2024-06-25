import React, { useEffect, useState } from 'react'
import { useAuth } from '../common/AuthContext';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom'

export default function News() {
    const { id } = useParams();
    const [news, setNews] = useState({});

    const getNews = async () => {
        try {
            const response = await authAxios.get(`${apiUrl}/news/${id}`);
            setNews(response.data);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 404) {
                toast.error('unot found.');
            } else {
                toast.error(error.response?.data?.message || 'An error occurred');
            }
        }
    };

    useEffect(() => {
        getNews();
    }, []);

    return (

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div class="flex flex-col md:flex-row -mx-4">
                <div class="md:flex-1 px-4">
                    <div x-data="{ image: 1 }" x-cloak>
                        <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                            <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                                <img src={news.img} alt="Product Image" className='h-full' />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md:flex-1 px-4">
                    <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{news.title}</h2>
                    <p class="text-gray-500">{news.description}</p>
                </div>
            </div>
        </div>
    )
}
