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


    const rand = mulberry32(124243715);
    const router = useRouter();


    function mulberry32(a) {
        return function () {
            var t = a += 0x6D2B79F5;
            t = Math.imul(t ^ t >>> 15, t | 1);
            t ^= t + Math.imul(t ^ t >>> 7, t | 61);
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
    }
    function RandomColor() {
        const backgroundCss = `linear-gradient(0deg, rgba(${Math.floor(rand() * 256)}, ${Math.floor(rand() * 256)}, ${Math.floor(rand() * 256)}, 0.2), rgba(${Math.floor(rand() * 256)}, ${Math.floor(rand() * 256)}, ${Math.floor(rand() * 256)}, 10.1)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(${Math.floor(rand() * 256)}, ${Math.floor(rand() * 256)}, ${Math.floor(rand() * 256)}) 0%, rgb(${Math.floor(rand() * 256)}, ${Math.floor(rand() * 256)}, ${Math.floor(rand() * 256)}) 100%)`;
        console.log(backgroundCss)
        return backgroundCss;
    }

    // let projectsCards = projectsStore.projects.map(p => (<ProjectCard key={p.name} {...{...p, color: RandomColor()}}  />));

    useEffect( () => {
        const refresh = async () => {
            console.log(localStorage.getItem("fromLogin"));

            if (localStorage.getItem("fromLogin") === 'true') {
                console.log('FML');
                await authStore.refresh();
            }

            // console.log(authStore.redirected);
        };

        refresh();
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
            <div className="grid">
                {!projectsStore.projectsLoaded && <ProgressSpinner />}
                {projectsStore.projectsLoaded && projectsStore.projects.map(p => (<ProjectCard key={p.name} {...{...p, color: RandomColor()}}  />))}
            </div>
        </div>
    );
};

export default observer(Dashboard);
