import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import { observer } from "mobx-react";
import {InputText} from 'primereact/inputtext'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
import { useRouter } from "next/router";
import ProjectCard from "./components/ProjectCard";
import projectsStore from "../../stores/projectsStore";
import { ProgressSpinner } from 'primereact/progressspinner';

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
    
    const projectsCards = projectsStore.projects.map(p => (<ProjectCard key={p.name} {...p} />));

    return (
        <div className='m-4'>
            <div className='card col lg:flex justify-content-between mb-3 '>
                <h1>Dashboard</h1>
                <span className="p-input-icon-left align-self-center">
                    <i className="pi pi-search" />
                    <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
                </span>
            </div>
            <div className="grid">
                {!projectsStore.projectsLoaded && <ProgressSpinner />}
                {projectsStore.projectsLoaded && projectsCards}
                {/*<div className="col-12 lg:col-6 xl:col-3">*/}
                {/*    <div className="card mb-0 shadow-1">*/}
                {/*        <div className="flex justify-content-between">*/}
                {/*            <div>*/}
                {/*                <span className="block text-500 font-medium text-xl">Project Name</span>*/}

                {/*                <div className="flex justify-content-between mb-2 mt-4">*/}
                {/*                    <div style={{ marginRight: "50px" }}>*/}
                {/*                        <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
                {/*                            <i className="pi pi-apple text-black-500 text-xl" />*/}
                {/*                        </div>*/}
                {/*                        <div className="text-900 font-medium mb-3 text-xl text-center">152</div>*/}
                {/*                    </div>*/}

                {/*                    <div>*/}
                {/*                        <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
                {/*                            <i className="pi pi-android text-green-500 text-xl" />*/}
                {/*                        </div>*/}
                {/*                        <div className="text-900 font-medium mb-3 text-xl text-center">152</div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="flex justify-content-between">*/}
                {/*                <Button icon="pi pi-trash" className="bg-red-100 border-round mr-3 text-red-500 text-xl" style={{ width: '2.5rem', height: '2.5rem', border: 0 }} />*/}
                {/*                <Button icon="pi pi-arrow-right" className="bg-blue-100 border-round mr-3 text-blue-500 text-xl" style={{ width: '2.5rem', height: '2.5rem', border: 0 }} onClick={handleContinue} />*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <span className="text-yellow-500 font-medium">Created on </span>*/}
                {/*        <span className="text-500">00/00/0000</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="col-12 lg:col-6 xl:col-3">*/}
                {/*    <div className="card mb-0 shadow-1">*/}
                {/*        <div className="flex justify-content-between">*/}
                {/*            <div>*/}
                {/*                <span className="block text-500 font-medium text-xl">Project Name</span>*/}

                {/*                <div className="flex justify-content-between mb-2 mt-4">*/}
                {/*                    <div style={{ marginRight: "50px" }}>*/}
                {/*                        <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
                {/*                            <i className="pi pi-apple text-black-500 text-xl" />*/}
                {/*                        </div>*/}
                {/*                        <div className="text-900 font-medium mb-3 text-xl text-center">152</div>*/}
                {/*                    </div>*/}

                {/*                    <div>*/}
                {/*                        <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
                {/*                            <i className="pi pi-android text-green-500 text-xl" />*/}
                {/*                        </div>*/}
                {/*                        <div className="text-900 font-medium mb-3 text-xl text-center">152</div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className="flex justify-content-between">*/}
                {/*                <Button icon="pi pi-trash" className="bg-red-100 border-round mr-3 text-red-500 text-xl" style={{ width: '2.5rem', height: '2.5rem', border: 0 }} />*/}
                {/*                <Button icon="pi pi-arrow-right" className="bg-blue-100 border-round mr-3 text-blue-500 text-xl" style={{ width: '2.5rem', height: '2.5rem', border: 0 }} onClick={handleContinue} />*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <span className="text-yellow-500 font-medium">Created on </span>*/}
                {/*        <span className="text-500">00/00/0000</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="col-12 lg:col-6 xl:col-3">*/}
                {/*    <div className="card mb-0 shadow-1">*/}
                {/*        <div className="flex justify-content-between">*/}
                {/*            <div>*/}
                {/*                <span className="block text-500 font-medium text-xl">Project Name</span>*/}

                {/*                <div className="flex justify-content-between mb-2 mt-4">*/}
                {/*                    <div style={{ marginRight: "50px" }}>*/}
                {/*                        <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
                {/*                            <i className="pi pi-apple text-black-500 text-xl" />*/}
                {/*                        </div>*/}
                {/*                        <div className="text-900 font-medium mb-3 text-xl text-center">152</div>*/}
                {/*                    </div>*/}

                {/*                    <div>*/}
                {/*                        <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
                {/*                            <i className="pi pi-android text-green-500 text-xl" />*/}
                {/*                        </div>*/}
                {/*                        <div className="text-900 font-medium mb-3 text-xl text-center">152</div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className="flex justify-content-between">*/}
                {/*                <Button icon="pi pi-trash" className="bg-red-100 border-round mr-3 text-red-500 text-xl" style={{ width: '2.5rem', height: '2.5rem', border: 0 }} />*/}
                {/*                <Button icon="pi pi-arrow-right" className="bg-blue-100 border-round mr-3 text-blue-500 text-xl" style={{ width: '2.5rem', height: '2.5rem', border: 0 }} onClick={handleContinue} />*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <span className="text-yellow-500 font-medium">Created on </span>*/}
                {/*        <span className="text-500">00/00/0000</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="col-12 lg:col-6 xl:col-3">*/}
                {/*    <div className="card mb-0 shadow-1">*/}
                {/*        <div className="flex justify-content-between">*/}
                {/*            <div>*/}
                {/*                <span className="block text-500 font-medium text-xl">Project Name</span>*/}

                {/*                <div className="flex justify-content-between mb-2 mt-4">*/}
                {/*                    <div style={{ marginRight: "50px" }}>*/}
                {/*                        <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
                {/*                            <i className="pi pi-apple text-black-500 text-xl" />*/}
                {/*                        </div>*/}
                {/*                        <div className="text-900 font-medium mb-3 text-xl text-center">152</div>*/}
                {/*                    </div>*/}

                {/*                    <div>*/}
                {/*                        <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
                {/*                            <i className="pi pi-android text-green-500 text-xl" />*/}
                {/*                        </div>*/}
                {/*                        <div className="text-900 font-medium mb-3 text-xl text-center">152</div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className="flex justify-content-between">*/}
                {/*                <Button icon="pi pi-trash" className="bg-red-100 border-round mr-3 text-red-500 text-xl" style={{ width: '2.5rem', height: '2.5rem', border: 0 }} />*/}
                {/*                <Button icon="pi pi-arrow-right" className="bg-blue-100 border-round mr-3 text-blue-500 text-xl" style={{ width: '2.5rem', height: '2.5rem', border: 0 }} onClick={handleContinue} />*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <span className="text-yellow-500 font-medium">Created on </span>*/}
                {/*        <span className="text-500">00/00/0000</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="col-12 lg:col-6 xl:col-3">*/}
                {/*    <div className="card mb-0 shadow-1">*/}
                {/*        <div className="flex justify-content-between">*/}
                {/*            <div>*/}
                {/*                <span className="block text-500 font-medium text-xl">Project Name</span>*/}

                {/*                <div className="flex justify-content-between mb-2 mt-4">*/}
                {/*                    <div style={{ marginRight: "50px" }}>*/}
                {/*                        <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
                {/*                            <i className="pi pi-apple text-black-500 text-xl" />*/}
                {/*                        </div>*/}
                {/*                        <div className="text-900 font-medium mb-3 text-xl text-center">152</div>*/}
                {/*                    </div>*/}

                {/*                    <div>*/}
                {/*                        <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
                {/*                            <i className="pi pi-android text-green-500 text-xl" />*/}
                {/*                        </div>*/}
                {/*                        <div className="text-900 font-medium mb-3 text-xl text-center">152</div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className="flex justify-content-between">*/}
                {/*                <Button icon="pi pi-trash" className="bg-red-100 border-round mr-3 text-red-500 text-xl" style={{ width: '2.5rem', height: '2.5rem', border: 0 }} />*/}
                {/*                <Button icon="pi pi-arrow-right" className="bg-blue-100 border-round mr-3 text-blue-500 text-xl" style={{ width: '2.5rem', height: '2.5rem', border: 0 }} onClick={handleContinue} />*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <span className="text-yellow-500 font-medium">Created on </span>*/}
                {/*        <span className="text-500">00/00/0000</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="col-12 lg:col-6 xl:col-3">*/}
                {/*    <div className="card mb-0 shadow-1">*/}
                {/*        <div className="flex justify-content-between">*/}
                {/*            <div>*/}
                {/*                <span className="block text-500 font-medium text-xl">Project Name</span>*/}

                {/*                <div className="flex justify-content-between mb-2 mt-4">*/}
                {/*                    <div style={{ marginRight: "50px" }}>*/}
                {/*                        <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
                {/*                            <i className="pi pi-apple text-black-500 text-xl" />*/}
                {/*                        </div>*/}
                {/*                        <div className="text-900 font-medium mb-3 text-xl text-center">152</div>*/}
                {/*                    </div>*/}

                {/*                    <div>*/}
                {/*                        <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
                {/*                            <i className="pi pi-android text-green-500 text-xl" />*/}
                {/*                        </div>*/}
                {/*                        <div className="text-900 font-medium mb-3 text-xl text-center">152</div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className="flex justify-content-between">*/}
                {/*                <Button icon="pi pi-trash" className="bg-red-100 border-round mr-3 text-red-500 text-xl" style={{ width: '2.5rem', height: '2.5rem', border: 0 }} />*/}
                {/*                <Button icon="pi pi-arrow-right" className="bg-blue-100 border-round mr-3 text-blue-500 text-xl" style={{ width: '2.5rem', height: '2.5rem', border: 0 }} onClick={handleContinue} />*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <span className="text-yellow-500 font-medium">Created on </span>*/}
                {/*        <span className="text-500">00/00/0000</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="col-12 lg:col-6 xl:col-3">*/}
                {/*    <div className="card mb-0 shadow-1">*/}
                {/*        <div className="flex justify-content-between">*/}
                {/*            <div>*/}
                {/*                <span className="block text-500 font-medium text-xl">Project Name</span>*/}

                {/*                <div className="flex justify-content-between mb-2 mt-4">*/}
                {/*                    <div style={{ marginRight: "50px" }}>*/}
                {/*                        <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
                {/*                            <i className="pi pi-apple text-black-500 text-xl" />*/}
                {/*                        </div>*/}
                {/*                        <div className="text-900 font-medium mb-3 text-xl text-center">152</div>*/}
                {/*                    </div>*/}

                {/*                    <div>*/}
                {/*                        <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
                {/*                            <i className="pi pi-android text-green-500 text-xl" />*/}
                {/*                        </div>*/}
                {/*                        <div className="text-900 font-medium mb-3 text-xl text-center">152</div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className="flex justify-content-between">*/}
                {/*                <Button icon="pi pi-trash" className="bg-red-100 border-round mr-3 text-red-500 text-xl" style={{ width: '2.5rem', height: '2.5rem', border: 0 }} />*/}
                {/*                <Button icon="pi pi-arrow-right" className="bg-blue-100 border-round mr-3 text-blue-500 text-xl" style={{ width: '2.5rem', height: '2.5rem', border: 0 }} onClick={handleContinue} />*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <span className="text-yellow-500 font-medium">Created on </span>*/}
                {/*        <span className="text-500">00/00/0000</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default observer(Dashboard);
