import React, { Component } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { Card } from 'primereact/card'
import projectsStore from "../../../stores/projectsStore";
import {toJS} from "mobx";
import {observer} from "mobx-react";
import authStore from "../../../stores/authStore";

const ProjectCard = props => {
    const router = useRouter();
    const handleContinue = async () => {
        projectsStore.currentProject = { ...props };
        await projectsStore.getRelease(props.id)
        router.push(`/releases/${props.id}`);
    };
    const date = new Date(props.created_at)

    const iOS = toJS(props.iOS);
    const Android = toJS(props.Android);

    const header = (
        <div className="flex flex-column pt-1 px-1 lg:px-8 overflow-hidden"
            style={{ height: '50px', clipPath: 'ellipse(170% 87% at 93% 13%)' }}>
        </div>);
    const footer = (
        <div className="flex flex-wrap justify-content-between gap-2">
            {authStore.userLoaded && authStore.user.type === 'ROLE_ADMIN' && <Button label="Delete" icon="pi pi-times" className="p-button-outlined p-button-danger"/>}

            <Button label="Releases" icon="pi pi-arrow-right" iconPos="right" className="p-button-outlined p-button-info" onClick={handleContinue} />
        </div>
    );

    return (
        <div className=" col lg:col-3 justify-content-center " onClick={handleContinue}>
            <Card title={props.name} subTitle={date.toDateString()} footer={footer} header={header} className="md:w-25rem">
                <div className="flex justify-content-center mb-2 mt-4">

                    <div style={{ marginRight: "50px" }}>
                        <div className="flex align-items-center justify-content-center bg-gray-300 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-apple text-black-500 text-xl" />
                        </div>
                        <div className="text-900 font-medium mb-3 text-xl text-center">{iOS.length}</div>
                    </div>

                    <div>
                        <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-android text-green-500 text-xl" />
                        </div>
                        <div className="text-900 font-medium mb-3 text-xl text-center">{Android.length}</div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default observer(ProjectCard);