import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../../demo/service/ProductService';
import { Divider } from 'primereact/divider';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { MultiSelect } from 'primereact/multiselect';
import { Menu } from 'primereact/menu';
import { useRouter } from 'next/router';
import projectsStore from "../../../stores/projectsStore";


const AdminProjects = () => {
    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const emptyproject = {
        name: '',
        description: '',
        members: []
    }
    const [products, setProducts] = useState(null);
    const [projectDialog, setProjectDialog] = useState(false);
    const [editprojectDialog, setEditProjectDialog] = useState(false);
    const [deleteProjectDialog, setDeleteProjectDialog] = useState(false);
    const [deleteProjectsDialog, setDeleteProjectsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [project, setProject] = useState(emptyproject)
    const [projects, setProjects] = useState(projectsStore.projects)

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []);



    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProjectDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProjectDialog(false);
        setEditProjectDialog(false);
        setProject(emptyproject)
    };

    const hideDeleteProductDialog = () => {
        setDeleteProjectDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProjectsDialog(false);
    };

    const saveProject = async () => {
        const newPorject = {
            name: project.name,
            description: project.description,
            participantsIds: project.members.map(m => m.id)
        };

        await projectsStore.addProject(newPorject);
        hideDialog();
    };

    const editProject = (project) => {
        setProject(project );
        setEditProjectDialog(true);
    };

    const editSubmitted = async () => {
        const data ={
            name: project.name,
            description: project.description,
            participantsIds: project.members.map(m => m.id)
        } 
        await projectsStore.editProject(project.id,data).then(()=>{
            setEditProjectDialog(false);

        })
    }

    const confirmDeleteProject = (project) => {
        setProject(project);
        setDeleteProjectDialog(true);
    };

    const deleteProject = async () => {
        let _projects = projectsStore.projects.filter((val) => val.id !== project.id);
        setProjects(_projects);
        setDeleteProjectDialog(false);
        setProject(emptyproject);
        await projectsStore.deleteProject(project.id)

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });
    };



    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProjectsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };




    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Create Project" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        );
    };




    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };



    const descBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.description}
            </>
        );
    };


    const membersBodyTemplate = (rowData) => {
        let users = [];
        let usersleft = 0

        if (Array.isArray(rowData.participants)) {
            users = rowData.participants.map(p => <Avatar image='/layout/images/KFHLOGO.png' shape='circle' tooltip={p.firstName}></Avatar>)
        
        }

        // users = <Avatar image='/layout/images/KFHLOGO.png' shape='circle' tooltip={rowData.participants.firstName}></Avatar>
        console.log(Array.isArray(rowData.participants), Array.isArray(rowData.participants) ? rowData.participants : rowData.participants, users.length)
        return (
            <>
                <AvatarGroup>
                    {/* <Avatar image='/layout/images/KFHLOGO.png' shape='circle'></Avatar>
                    <Avatar image='/layout/images/KFHLOGO.png' shape='circle'></Avatar>
                    <Avatar image='/layout/images/KFHLOGO.png' shape='circle'></Avatar>
                    <Avatar image='/layout/images/KFHLOGO.png' shape='circle'></Avatar>
                    <Avatar label="+2" shape="circle" /> */}
                    {users.length >= 4 ? users.slice(0, 4)  : users}
                    {users.length >= 4&& <Avatar label={`+${users.length - 4}`} shape="circle" />}

                </AvatarGroup>
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" text raised severity="success" rounded className="mr-2" onClick={() => editProject(rowData)} />
                <Button icon="pi pi-trash" text raised severity="danger" rounded onClick={() => confirmDeleteProject(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0 lg:text-lg ">Manage Projects</h5>
            <span className="block mt-3 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <div className='flex justify-content-between'>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProject} />
        </div>
    );
    const editproductDialogFooter = (
        <div className='flex justify-content-between'>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="edit" icon="pi pi-check" text onClick={editSubmitted} />
        </div>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteProject} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedProducts} />
        </>
    );
    const router = useRouter();

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _project = { ...project };
        _project[`${name}`] = val;

        setProject(_project);
    };

    const addProjectCode = () => {
        return (
            <div className='col'>
                <div className="field mt-2 lg:col-6">
                    <label htmlFor="name">Project Name</label>
                    <InputText id="name" value={project.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !project.name })} />
                    {submitted && !project.name && <small className="p-invalid text-red-500">Name is required.</small>}
                </div>
                <div className="field lg:col-6">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={project.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} className={classNames({ 'p-invalid': submitted && !project.description })} />
                    {submitted && !project.description && <small className="p-invalid text-red-500">Description is required.</small>}

                </div>

                <div className="field lg:col-6">
                    <MultiSelect value={project.members} onChange={(e) => onInputChange(e, 'members')} options={projectsStore.users} optionLabel="email" display="chip"
                        placeholder="Select Members" className={classNames({ 'p-invalid': submitted && !project.members.length != 0 })} />
                    {submitted && !project.members.length != 0 && <small className="p-invalid text-red-500">Select at least one member.</small>}

                </div>
            </div>

        )
    }

    const editProjectCode = () => {
        return (
            <div className='col'>
                <div className="field mt-2 lg:col-6">
                    <label htmlFor="name">Project Name</label>
                    <InputText id="name" value={project.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !project.name })} />
                    {submitted && !project.name && <small className="p-invalid text-red-500">Name is required.</small>}
                </div>
                <div className="field lg:col-6">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={project.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} className={classNames({ 'p-invalid': submitted && !project.description })} />
                    {submitted && !project.description && <small className="p-invalid text-red-500">Description is required.</small>}

                </div>

                <div className="field lg:col-6">
                    <MultiSelect value={project.members} onChange={(e) => onInputChange(e, 'members')} options={projectsStore.users} optionLabel="email" display="chip"
                        placeholder="Select Members" className={classNames({ 'p-invalid': submitted && !project.members.length != 0 })} />
                    {submitted && !project.members.length != 0 && <small className="p-invalid text-red-500">Select at least one member.</small>}

                </div>
            </div>

        )
    }

    let items = [
        {
            label: 'Projects', icon: 'pi pi-fw  pi-file', className: 'bg-green-100 text-center'
        },
        {
            label: 'users', icon: 'pi pi-fw pi-user', command: () => {
                router.push('/admin-panel/user')
            }
        },
    ]
    return (
        <div className=''>
            <h1 className='card text-center shadow-1 '>Admin Panel</h1>

            <div className="grid  mt-5  ">

                <div className='m-5 w-full  lg:w-17rem'>
                    <p className='text-center text-xl col-12'>Administration panel</p>

                    <div className='col-12 flex justify-content-center align-content-center text-center w-full'>
                        <Menu className='w-full justify-content-center ' style={{ background: 'transparent', border: 0 }} model={items}></Menu>
                    </div>


                </div>
                <Divider layout='vertical' className='hidden lg:block' />

                <div className="col">
                    <div className='flex justify-content-between'>
                        <h2>Projects</h2>
                        <div className=' flex '>{leftToolbarTemplate()}</div>
                    </div>
                    <p className='lg:text-lg'>Create, edit and manage Projects and who has access to each project.</p>
                    <div className="card">

                        <Toast ref={toast} />


                        <DataTable
                            ref={dt}
                            value={projectsStore.projects}
                            dataKey="id"
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25]}
                            className="datatable-responsive lg:w-full md:w-full w-19rem"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                            globalFilter={globalFilter}
                            emptyMessage="No products found."
                            header={header}
                            responsiveLayout="scroll"
                        >
                            <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                            <Column field="description" header="Description" body={descBodyTemplate} sortable></Column>
                            <Column field="members" header="Members" body={membersBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>
                            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        </DataTable>

                        <Dialog visible={projectDialog} style={{ width: '750px' }} header="Add new project" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                            {addProjectCode()}

                        </Dialog>
                        <Dialog visible={editprojectDialog} style={{ width: '750px' }} header="Add new project" modal className="p-fluid" footer={editproductDialogFooter} onHide={hideDialog}>
                            {editProjectCode()}

                        </Dialog>

                        <Dialog visible={deleteProjectDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {product && (
                                    <span>
                                        Are you sure you want to delete <b>{project.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog visible={deleteProjectsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {product && <span>Are you sure you want to delete the selected products?</span>}
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProjects;
