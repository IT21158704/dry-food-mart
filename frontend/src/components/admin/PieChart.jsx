import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export function BasicPie() {
    return (
        <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: 20, label: 'Users' },
                        { id: 1, value: 100, label: 'Staff' }
                    ],
                },
            ]}
            width={400}
            height={200}
        />
    );
}

export function BasicPie2() {
    return (
        <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: 20, label: 'Snacks' },
                        { id: 1, value: 100, label: 'Bakery' },
                        { id: 2, value: 50, label: 'Sweets' }
                    ],
                },
            ]}
            width={400}
            height={200}
        />
    );
}

export function BasicPie3() {
    return (
        <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: 20, label: '1 Star' },
                        { id: 1, value: 10, label: '2 Stars' },
                        { id: 2, value: 30, label: '3 Stars' },
                        { id: 3, value: 35, label: '4 Stars' },
                        { id: 4, value: 15, label: '5 Stars' }
                    ],
                },
            ]}
            width={400}
            height={200}
        />
    );
}
