import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import projectsStore from "../../stores/projectsStore";
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { useRouter } from "next/router";
import instance, {url} from "../../stores/instance";
import authStore from "../../stores/authStore";
import {toJS} from "mobx";
import {observer} from "mobx-react";

const TableDemo = () => {
    const toast = useRef(null);

    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [releaseInfo, setReleaseInfo] = useState(null)

    const router = useRouter();
    const clearFilter1 = () => {
        initFilters1();
    };
    useEffect(() => {
        if (localStorage.getItem('prevPage') === 'Projects')
            localStorage.setItem('prevPage', 'Releases');
        else {
            projectsStore.projectsLoaded = false;
            router.push('/projects');
        }

        const releaseID = router.query.id;
        async function releases() {
            await authStore.refresh();
            setReleaseInfo(toJS(await projectsStore.getRelease(releaseID)));

        }
        releases();
        setLoading1(false);
        initFilters1();
    }, []);

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const header1 = renderHeader1();



    const formatDate = (value) => {
        value = new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        return value;

    };


    const initFilters1 = () => {
        setFilters1({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue1('');
    };


    const developerBodyTemplate = (rowData) => {
        const Developer = rowData.name;
        return (
            <React.Fragment>
                {Developer}
            </React.Fragment>
        );
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.uploaded_at);
    };

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const descriptionBodyTemplate = (rowData) => {
        return <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{rowData.description}</span>
    };

    const sitBodyTemplate = (rowData) => {
        return <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{rowData.server_ip} </span>
    };

    const statusBodyTemplate = (rowData) => {
        let statuses = ["uploaded", "under testing", "done"];
        let randomIndx = Math.floor(Math.random() * statuses.length);
        return <span className={`customer-badge status-${rowData.status == "UPLOADED" ? "new" : rowData.status == "under testing" ? "proposal" : rowData.status == "done" ? "qualified" : ""}`}>{rowData.status}</span>;
    };


    const verifiedBodyTemplate = (rowData) => {
        let _url = '';
        if (rowData.releaseFilesList.length === 2) {
            for (let i = 0; i < rowData.releaseFilesList.length; i++) {
                if (rowData.releaseFilesList[i].filename.endsWith(".plist")) {
                    _url = `itms-services://?action=download-manifest&url=http://${url}:8080${rowData.releaseFilesList[i].path}`;
                }
            }
        } else
            _url = `http://${url}:8080${rowData.releaseFilesList[0].path}`;

        return <a href={_url}>
            <i className='text-gray-700 text-3xl pi pi-cloud-download'></i>
        </a>;
    };


    const handleUploadRelease = () => {
        router.push('/New-Release');
    };

    return (
        <div className="grid">
            <Toast ref={toast} />
            <div className="col-12">
                <div className="card">
                    <h5>Releases</h5>
                    <React.Fragment>
                        {authStore.userLoaded && authStore.user.type !== 'ROLE_TESTER' && <div style={{display: "flex", justifyContent: "flex-end"}} className="mb-5">
                            <Button icon="pi pi-cloud-upload text-2xl" severity="sucess" onClick={handleUploadRelease}/>
                        </div>}
                    </React.Fragment>
                    <DataTable
                        value={releaseInfo}
                        paginator
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={10}
                        dataKey="id"
                        loading={loading1}
                        responsiveLayout="scroll"
                    >
                        <Column
                            header="Name"
                            filterField="representative"
                            showFilterMatchModes={false}
                            filterMenuStyle={{ width: '14rem' }}
                            style={{ minWidth: '14rem' }}
                            body={developerBodyTemplate}
                        />
                        <Column header="Date" filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} filterElement={dateFilterTemplate} />
                        <Column header="Description" style={{ minWidth: '10rem' }} body={descriptionBodyTemplate} />
                        <Column header="SIT Server" style={{ minWidth: '10rem' }} body={sitBodyTemplate} />
                        <Column field="Status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} />
                        <Column field="Download" header="Download" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={verifiedBodyTemplate} />
                    </DataTable>
                </div>
            </div>


        </div>
    );
};

export default observer(TableDemo);
