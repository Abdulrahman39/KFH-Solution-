import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown'
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Divider } from 'primereact/divider';
import { MultiSelect } from 'primereact/multiselect';
import { Menu } from 'primereact/menu';
import { useRouter } from 'next/router';
import ProjectsStore from '../../../stores/projectsStore';

const User = () => {


    const [userDialog, setUserDialog] = useState(false);
    const [editUserDialog, setEditUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [loading1, setLoading1] = useState(true);
    const [usersInfo, setUsersInfo] = useState(null)

    const emptyuser = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        department: [],
        type: [],
    }
    const [user, setUser] = useState(emptyuser)
    const Roles = [{ name: 'Developer', code: 1 }, { name: 'Admin', code: 0 }, { name: 'Tester', code: 2 }]
    const departments = [{ name: 'IT' }, { name: 'HR' }, { name: 'PR' }]

    useEffect(() => {
        async function ListUsers() {
            await ProjectsStore.getUsers().then((res) => {
                setUsersInfo(res);
                setUser(emptyuser)
                setLoading1(false)
            })
        }
        ListUsers();



    }, []);



    const openNew = () => {
        setUser(emptyuser);
        setSubmitted(false);
        setUserDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
        setEditUserDialog(false)
        setUser(emptyuser)
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    };

    const checkUserInfo = () => {
        if (user.firstName === '' || user.email === '' || user.department.length === 0 || user.type.length === 0) {
            console.log("FALSE!!!");
            return false;
        }
        else {
            console.log("TRUUUUE!!!");
            return true;
        }
    }
    const CreateUser = async () => {
        setSubmitted(true);
        if (checkUserInfo()) {
            let data = user;
            data.department = data.department.name;
            data.type = data.type.code;
            console.log({ ...data });
            await ProjectsStore.createUser({ ...data }).then(() => {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: `'User Created'`, life: 3000 });
                setUser(emptyuser);
                hideDialog();
                setSubmitted(false);
                setUsersInfo(ProjectsStore.getUsers())
            })
        }

    };

    const editUser = async (User) => {
        setUser(User);
        setEditUserDialog(true);
    };

    const editSubmitted = async () => {
        let data = {
            firstName: user.firstName,
            lastName: user.lastName,
            department: user.department.name,
            type: user.type.code
        }
        await ProjectsStore.editUser(user.id, data);
    };

    const confirmDeleteUser =  (User) => {
        setUser(User)
        setDeleteUserDialog(true);
        console.log(User, user)
    };

    const deleteUser = async () => {
        let _users = usersInfo.filter((val) => val.id !== user.id);
        await ProjectsStore.deleteUser(User.id)
        setUsersInfo(_users);
        setDeleteUserDialog(false);
        setUser(emptyuser);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    };





    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    };

    const deleteSelectedUsers = () => {
        let _users = usersInfo.filter((val) => !selectedUsers.includes(val));
        setUsersInfo(_users);
        setDeleteUsersDialog(false);
        setSelectedUsers(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
    };






    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Create User" icon="pi pi-user-plus" severity="sucess" className="mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        );
    };




    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.firstName + " " + rowData.lastName}
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
                <span className="p-column-title">Department</span>
                {rowData.department}
            </>
        );
    };








    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" text raised severity="success" rounded className="mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" text raised severity="danger" rounded onClick={() => confirmDeleteUser(rowData)} />
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

    const userDialogFooter = (
        <div className='flex justify-content-between'>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={CreateUser} />
        </div>
    );
    const edituserDialogFooter = (
        <div className='flex justify-content-between'>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Edit" icon="pi pi-check" text onClick={editSubmitted} />
        </div>
    );
    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteUser} />
        </>
    );
    const deleteUsersDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUsersDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedUsers} />
        </>
    );
    const router = useRouter();

    // to set data to any feild 
    const onInputChange = (e, name) => {
        let val = (e.target && e.target.value) || '';
        console.log(val)
        let _user = { ...user };

        _user[`${name}`] = val;

        setUser(_user);
    };
    // add user

    const addUserCode = () => {
        return (
            <div className='grid m-3'>
                <h4 className='col-12'>Deltails</h4>

                <div className='grid col-12 mb-3'>

                    <div className="field col-6 ">
                        <label htmlFor="name">First Name</label>
                        <InputText id="firstName" placeholder='First name' value={user.firstName} onChange={(e) => onInputChange(e, 'firstName')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.firstName })} />

                        {submitted && !user.firstName && <small className="p-invalid text-red-500">First name is required.</small>}
                    </div>

                    <div className="field col-6 ">
                        <label htmlFor="lastName">Last Name</label>
                        <InputText id="lastName" placeholder='Last name' value={user.lastName} onChange={(e) => onInputChange(e, 'lastName')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.lastName })} />

                        {submitted && !user.lastName && <small className="p-invalid text-red-500">Last name is required.</small>}
                    </div>

                </div>


                <div className='grid col-12 mb-3'>

                    <div className="field col-6 ">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" placeholder='Email' type='email' value={user.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.email })} />
                        {submitted && !user.email && <small className="p-invalid text-red-500">Email is required.</small>}
                    </div>
                    <div className="field col-6 ">
                        <label htmlFor="email">Password</label>
                        <InputText id="password" placeholder='Password' type='password' value={user.password} onChange={(e) => onInputChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.password })} />
                        {submitted && !user.password && <small className="p-invalid text-red-500">Password is required.</small>}
                    </div>



                </div>
                <div className="field col ">
                    <label htmlFor="department">Department</label>
                    <Dropdown value={user.department} onChange={(e) => onInputChange(e, 'department')} options={departments} optionLabel="name"
                        placeholder="Select Department" className={classNames({ 'p-invalid': submitted && user.department.length == 0 })} />
                    {submitted && user.department.length == 0 && <small className="p-invalid text-red-500">Department is required.</small>}
                </div>

                {/* roles */}
                <h4 className='col-12'>Roles</h4>
                <div className="field col-12 ">
                    <label>User's roles</label>
                    <Dropdown value={user.type} maxSelectedLabels={1} options={Roles} optionLabel="name" display="chip" onChange={(e) => onInputChange(e, 'type')}
                        placeholder="Select Role" className={classNames({ 'p-invalid': submitted && user.type.length == 0 })} />
                    {/* {!submitted && <small className=' text-color-secondary'>User can have one or more roles</small>} */}
                    {submitted && user.type.length == 0 && <small className="p-invalid text-red-500">Select at least one role.</small>}

                </div>

            </div>
        );
    };
    const editUserCode = () => {
        return (
            <div className='grid m-3'>
                <h4 className='col-12'>Deltails</h4>

                <div className='grid col-12 mb-3'>

                    <div className="field col-6 ">
                        <label htmlFor="name">First Name</label>
                        <InputText id="firstName" placeholder='First name' value={user.firstName} onChange={(e) => onInputChange(e, 'firstName')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.firstName })} />

                        {submitted && !user.firstName && <small className="p-invalid text-red-500">First name is required.</small>}
                    </div>

                    <div className="field col-6 ">
                        <label htmlFor="lastName">Last Name</label>
                        <InputText id="lastName" placeholder='Last name' value={user.lastName} onChange={(e) => onInputChange(e, 'lastName')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.lastName })} />

                        {submitted && !user.lastName && <small className="p-invalid text-red-500">Last name is required.</small>}
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
                    <Dropdown value={user.type} options={Roles} optionLabel="name" display="chip" onChange={(e) => onInputChange(e, 'type')}
                        placeholder="Select Roles" className={classNames({ 'p-invalid': submitted && user.type.length == 0 })} />
                    {!submitted && <small className=' text-color-secondary'>User can have one or more roles</small>}
                    {submitted && user.type.length == 0 && <small className="p-invalid text-red-500">Select at least one role.</small>}

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
        { label: 'users', icon: 'pi pi-fw pi-user', className: 'bg-green-100' },
    ]
    return (
        <div>
            <h1 className='card text-center shadow-1'>Admin Panel</h1>

            <div className="grid  mt-5 ">

                <div className='m-5 w-full  xl:w-17rem'>
                    <p className='text-center text-xl col-12'>Administration panel</p>

                    <div className='col-12 flex justify-content-center align-content-center text-center w-full'>
                        <Menu className='w-full justify-content-center ' style={{ background: 'transparent', border: 0 }} model={items}></Menu>
                    </div>


                </div>
                <Divider layout='vertical' className='hidden xl:block' />

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
                            value={usersInfo}
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
                        <Dialog visible={userDialog} style={{ width: '750px' }} header="Add New User" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                            {addUserCode()}
                        </Dialog>
                        <Dialog visible={editUserDialog} style={{ width: '750px' }} header="Add New User" modal className="p-fluid" footer={edituserDialogFooter} onHide={hideDialog}>
                            {editUserCode()}
                        </Dialog>

                        <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {user && (
                                    <span>
                                        Are you sure you want to delete <b>{user.firstName + " " + user.lastName}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>

                        <Dialog visible={deleteUsersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUsersDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                {user && <span>Are you sure you want to delete the selected Users?</span>}
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
