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
import { Dropdown } from 'primereact/dropdown'
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
import newProjectsStore from '../../../stores/projectsStore';
import ProjectsStore from '../../../stores/projectsStore';

const User = () => {
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

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [loading1, setLoading1] = useState(true);
    const [usersInfo, setUsersInfo] = useState(null)
    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
        async function ListUsers() {
            await ProjectsStore.getUsers().then((res) => {
                setUsersInfo(res);
                setLoading1(false)
            })
        }
        ListUsers();



    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setUser(emptyuser)
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {

            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _product.id = createId();
                _product.code = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };



    // const onInputChange = (e, name) => {
    //     const val = (e.target && e.target.value) || '';
    //     let _product = { ...product };
    //     _product[`${name}`] = val;

    //     setProduct(_product);
    // };



    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Create User" icon="pi pi-user-plus" severity="sucess" className="mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.code}
            </>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.firstName+" "+rowData.lastName}
            </>
        );
    };
    const UsernameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Username</span>

                {rowData.username}
            </>
        );
    }
    const RolesBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Role</span>
                {rowData.type}
            </>
        );
    }

    const EmailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.email}
            </>
        );
    };

    const DepartmentBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                {rowData.department}
            </>
        );
    };

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <p>description</p>
            </>
        );
    };

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    };

    const ratingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Reviews</span>
                <Rating value={rowData.rating} readOnly cancel={false} />
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <AvatarGroup>
                    <Avatar image='/layout/images/KFHLOGO.png' shape='circle'></Avatar>
                    <Avatar image='/layout/images/KFHLOGO.png' shape='circle'></Avatar>
                    <Avatar image='/layout/images/KFHLOGO.png' shape='circle'></Avatar>
                    <Avatar image='/layout/images/KFHLOGO.png' shape='circle'></Avatar>
                    <Avatar label="+2" shape="circle" />

                </AvatarGroup>
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" text raised severity="success" rounded className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" text raised severity="warning" rounded onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Users</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <div className='flex justify-content-between'>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
        </div>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedProducts} />
        </>
    );
    const router = useRouter();

    // to set data to any feild 
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        console.log(val)
        let _user = { ...user };
        _user[`${name}`] = val;

        setUser(_user);
    };
    // add user
    const emptyuser = {
        firstname: '',
        lastname: '',
        email: '',
        department: [],
        roles: [],
    }
    const [user, setUser] = useState(emptyuser)
    const Roles = [{ name: 'Developer' }, { name: 'Admin' }, { name: 'Tester' }]
    const departments = [{ name: 'IT' }, { name: 'HR' }, { name: 'PR' }]
    const addUserCode = () => {
        return (
            <div className='grid m-3'>
                <h4 className='col-12'>Deltails</h4>

                <div className='grid col-12 mb-3'>

                    <div className="field col-6 ">
                        <label htmlFor="name">First Name</label>
                        <InputText id="firstname" placeholder='First name' value={user.firstname} onChange={(e) => onInputChange(e, 'firstname')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.firstname })} />

                        {submitted && !user.firstname && <small className="p-invalid text-red-500">First name is required.</small>}
                    </div>

                    <div className="field col-6 ">
                        <label htmlFor="lastname">Last Name</label>
                        <InputText id="lastname" placeholder='Last name' value={user.lastname} onChange={(e) => onInputChange(e, 'lastname')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.lastname })} />

                        {submitted && !user.lastname && <small className="p-invalid text-red-500">Last name is required.</small>}
                    </div>

                </div>


                <div className='grid col-12 mb-3'>

                    <div className="field col-6 ">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" placeholder='Email' type='email' value={user.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.email })} />
                        {submitted && !user.email && <small className="p-invalid text-red-500">Email is required.</small>}
                    </div>

                    <div className="field col-6 ">
                        <label htmlFor="department">Department</label>
                        <Dropdown value={user.department} onChange={(e) => onInputChange(e, 'department')} options={departments} optionLabel="name"
                            placeholder="Select Department" className={classNames({ 'p-invalid': submitted && user.department.length == 0 })} />
                        {submitted && user.department.length == 0 && <small className="p-invalid text-red-500">Department is required.</small>}
                    </div>

                </div>

                {/* roles */}
                <h4 className='col-12'>Roles</h4>
                <div className="field col-6 ">
                    <label>User's roles</label>
                    <MultiSelect value={user.roles} options={Roles} optionLabel="name" display="chip" onChange={(e) => onInputChange(e, 'roles')}
                        placeholder="Select Roles" className={classNames({ 'p-invalid': submitted && user.roles.length == 0 })} />
                    {!submitted && <small className=' text-color-secondary'>User can have one or more roles</small>}
                    {submitted && user.roles.length == 0 && <small className="p-invalid text-red-500">Select at least one role.</small>}

                </div>

            </div>
        );
    };

    let items = [
        {
            label: 'Projects', icon: 'pi pi-fw  pi-file', command: () => {
                router.push('/admin-panel/projects')
            }
        },
        {
            label: 'Releases', icon: 'pi pi-fw pi-tags', command: () => {
                router.push('/admin-panel/releases')
            }
        },
        { label: 'users', icon: 'pi pi-fw pi-user', className: 'bg-green-100' },
    ]
    return (
        <div>
            <h1 className='card text-center shadow-1'>Admin Panel</h1>

            <div className="grid  mt-5 ">

                <div className='m-5 w-full  lg:w-17rem'>
                    <p className='text-center text-xl col-12'>Administration panel</p>

                    <div className='col-12 flex justify-content-center align-content-center text-center w-full'>
                        <Menu className='w-full justify-content-center ' style={{ background: 'transparent', border: 0 }} model={items}></Menu>
                    </div>


                </div>
                <Divider layout='vertical' className='hidden lg:block' />

                <div className="col">
                    <div className='flex justify-content-between'>
                        <h2>Users</h2>
                        <div className=' flex '>{leftToolbarTemplate()}</div>
                    </div>
                    {/* <Toolbar className="mb-4  border-0"  right={leftToolbarTemplate}></Toolbar> */}
                    <p className='lg:text-lg'>Create, edit and manage Projects and who has access to each project.</p>
                    <div className="card">

                        <Toast ref={toast} />

                        <DataTable
                            value={ProjectsStore.users}
                            dataKey="id"
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25]}
                            className="datatable-responsive lg:w-full md:w-full w-19rem"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                            globalFilter={globalFilter}
                            loading={loading1}

                            emptyMessage="No users found."
                            header={header}
                            responsiveLayout="scroll"
                        >
                            {/* <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column> */}
                            <Column header="Name" sortable body={nameBodyTemplate}></Column>
                            <Column header="Email Address" sortable body={EmailBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                            <Column header="Roles" body={RolesBodyTemplate} headerStyle={{ minWidth: '10rem' }} sortable></Column>

                            <Column header="Username" body={UsernameBodyTemplate} sortable></Column>

                            <Column header="Department" body={DepartmentBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>
                            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        </DataTable>


                        {/* Add new user */}
                        <Dialog visible={productDialog} style={{ width: '750px' }} header="Add New User" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                            {addUserCode()}
                        </Dialog>

                        <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {product && (
                                    <span>
                                        Are you sure you want to delete <b>{product.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
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

export default User;
