import { observer } from "mobx-react";
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import ProjectCard from "./components/ProjectCard";
import projectsStore from "../../stores/projectsStore";
import { ProgressSpinner } from 'primereact/progressspinner';
import authStore from "../../stores/authStore";



const Dashboard = (context) => {
    const [globalSearch, setGlobalSearch] = useState('')

    useEffect(() => {
        const refresh = async () => {
            if (localStorage.getItem("fromLogin") === 'true') {
                await authStore.refresh();
            }
        };
        refresh();
        localStorage.setItem('prevPage', 'Projects');
    }, []);





    return (
        <div className='m-4'>
            <div className='card col lg:flex justify-content-between mb-3 '>
                <h1>Dashboard</h1>
                <span className="p-input-icon-left align-self-center">
                    <i className="pi pi-search" />
                    <InputText type="search" onChange={(e) => setGlobalSearch(e.target.value)} placeholder="Search..." />
                </span>
            </div>
            <div className="grid col">
                {!projectsStore.projectsLoaded && <ProgressSpinner />}
                {projectsStore.projectsLoaded && projectsStore.projects.filter((project) => project.name.toLowerCase().includes(globalSearch.toLowerCase())).map(p => (<ProjectCard key={p.name} {...p} />))}
            </div>
        </div>
    );
};

export default observer(Dashboard);
