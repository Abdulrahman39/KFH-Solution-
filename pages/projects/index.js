import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

const Dashboard = () => {
    const [products, setProducts] = useState(null);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const [lineOptions, setLineOptions] = useState(null);
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 shadow-1">
                    <div className="flex justify-content-between">
                        <div>
                            <span className="block text-500 font-medium text-xl">Project Name</span>

                            <div className="flex justify-content-between mb-2 mt-4">
                                <div style={{marginRight: "50px"}}>
                                    <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-apple text-black-500 text-xl" />
                                    </div>
                                    <div className="text-900 font-medium mb-3 text-xl text-center">152</div>
                                </div>

                                <div>
                                    <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-android text-green-500 text-xl" />
                                    </div>
                                    <div className="text-900 font-medium mb-3 text-xl text-center">152</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="text-yellow-500 font-medium">Created on </span>
                    <span className="text-500">00/00/0000</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 shadow-1">
                    <div className="flex justify-content-between">
                        <div>
                            <span className="block text-500 font-medium text-xl">Project Name</span>

                            <div className="flex justify-content-between mb-2 mt-4">
                                <div style={{marginRight: "50px"}}>
                                    <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-apple text-black-500 text-xl" />
                                    </div>
                                    <div className="text-900 font-medium mb-3 text-xl text-center">152</div>
                                </div>

                                <div>
                                    <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-android text-green-500 text-xl" />
                                    </div>
                                    <div className="text-900 font-medium mb-3 text-xl text-center">152</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="text-yellow-500 font-medium">Created on </span>
                    <span className="text-500">00/00/0000</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 shadow-1">
                    <div className="flex justify-content-between">
                        <div>
                            <span className="block text-500 font-medium text-xl">Project Name</span>

                            <div className="flex justify-content-between mb-2 mt-4">
                                <div style={{marginRight: "50px"}}>
                                    <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-apple text-black-500 text-xl" />
                                    </div>
                                    <div className="text-900 font-medium mb-3 text-xl text-center">152</div>
                                </div>

                                <div>
                                    <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-android text-green-500 text-xl" />
                                    </div>
                                    <div className="text-900 font-medium mb-3 text-xl text-center">152</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="text-yellow-500 font-medium">Created on </span>
                    <span className="text-500">00/00/0000</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 shadow-1">
                    <div className="flex justify-content-between">
                        <div>
                            <span className="block text-500 font-medium text-xl">Project Name</span>

                            <div className="flex justify-content-between mb-2 mt-4">
                                <div style={{marginRight: "50px"}}>
                                    <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-apple text-black-500 text-xl" />
                                    </div>
                                    <div className="text-900 font-medium mb-3 text-xl text-center">152</div>
                                </div>

                                <div>
                                    <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-android text-green-500 text-xl" />
                                    </div>
                                    <div className="text-900 font-medium mb-3 text-xl text-center">152</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="text-yellow-500 font-medium">Created on </span>
                    <span className="text-500">00/00/0000</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 shadow-1">
                    <div className="flex justify-content-between">
                        <div>
                            <span className="block text-500 font-medium text-xl">Project Name</span>

                            <div className="flex justify-content-between mb-2 mt-4">
                                <div style={{marginRight: "50px"}}>
                                    <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-apple text-black-500 text-xl" />
                                    </div>
                                    <div className="text-900 font-medium mb-3 text-xl text-center">152</div>
                                </div>

                                <div>
                                    <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-android text-green-500 text-xl" />
                                    </div>
                                    <div className="text-900 font-medium mb-3 text-xl text-center">152</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="text-yellow-500 font-medium">Created on </span>
                    <span className="text-500">00/00/0000</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 shadow-1">
                    <div className="flex justify-content-between">
                        <div>
                            <span className="block text-500 font-medium text-xl">Project Name</span>

                            <div className="flex justify-content-between mb-2 mt-4">
                                <div style={{marginRight: "50px"}}>
                                    <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-apple text-black-500 text-xl" />
                                    </div>
                                    <div className="text-900 font-medium mb-3 text-xl text-center">152</div>
                                </div>

                                <div>
                                    <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-android text-green-500 text-xl" />
                                    </div>
                                    <div className="text-900 font-medium mb-3 text-xl text-center">152</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="text-yellow-500 font-medium">Created on </span>
                    <span className="text-500">00/00/0000</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 shadow-1">
                    <div className="flex justify-content-between">
                        <div>
                            <span className="block text-500 font-medium text-xl">Project Name</span>

                            <div className="flex justify-content-between mb-2 mt-4">
                                <div style={{marginRight: "50px"}}>
                                    <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-apple text-black-500 text-xl" />
                                    </div>
                                    <div className="text-900 font-medium mb-3 text-xl text-center">152</div>
                                </div>

                                <div>
                                    <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                        <i className="pi pi-android text-green-500 text-xl" />
                                    </div>
                                    <div className="text-900 font-medium mb-3 text-xl text-center">152</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="text-yellow-500 font-medium">Created on </span>
                    <span className="text-500">00/00/0000</span>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
