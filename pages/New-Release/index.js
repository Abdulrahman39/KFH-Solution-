import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Tooltip } from "primereact/tooltip";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Tag } from "primereact/tag";
import { ProgressBar } from "primereact/progressbar";
import { useRouter } from "next/router";
import projectsStore from "../../stores/projectsStore";
import projectCard from "../projects/components/ProjectCard";

const FormLayoutDemo = () => {
    const [dropdownItem, setDropdownItem] = useState(null);

    const [name, setName] = useState('');
    const [version, setVersion] = useState('');
    const [platform, setPlatform] = useState('');
    const [server_ip, setSit] = useState('');
    const [description, setDescription] = useState('');

    const dropdownItems = [
        { name: 'Android', code: 'pi-android text-primary', icon: 'pi pi-android' },
        { name: 'IOS', code: 'pi-apple text-base', icon: 'pi pi-apple' },
    ];

    // const formData = new FormData();

    const selectedPlatformTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">

                    <div>{option.name}</div>
                    <i className={'ml-2 pi ' + option.code}></i>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const PlatormOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">

                <div>{option.name}</div>
                <i className={'ml-2 pi ' + option.code} />
            </div>
        );
    };
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        let i = 1;
        Object.keys(files).forEach((key) => {
            console.log(files[key]);
            projectsStore.formData.append(`file${i}`, files[key]);
            console.log(`file${i}`);
            console.log(projectsStore.formData.get(`file${i}`));
            _totalSize += files[key].size || 0;
            i++;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        console.log("test123");
        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue}</span>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-file mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Files Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined w-3rem' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined w-3rem' };

    const router = useRouter();
    const handleUploadRelease = async () => {
        const releaseObj = {
            name,
            version,
            description,
            server_ip,
            "projectId": projectsStore.currentProject.id,
            "platform": platform.name.toUpperCase()
        };

        console.log(releaseObj);
        projectsStore.formData.append("release", JSON.stringify(releaseObj));
        await projectsStore.createRelease();

        setName('');
        setVersion('');
        setPlatform('');
        setSit('');
        setDescription('');
        projectsStore.formData.delete('release');
        projectsStore.formData.delete('file1');
        projectsStore.formData.delete('file2');

        await projectsStore.getProject();
        router.push('/releases');
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Upload Release</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="firstname2">Release Name</label>
                            <InputText id="firstname2" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="state">Release Version</label>
                            <InputText id="firstname2" type="text" value={version} onChange={(e) => setVersion(e.target.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="state">Release Platform</label>
                            <Dropdown id="state" value={platform} onChange={(e) => setPlatform(e.value)} options={dropdownItems} valueTemplate={selectedPlatformTemplate} itemTemplate={PlatormOptionTemplate} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="lastname2">SIT Server</label>
                            <InputText id="lastname2" type="text" value={server_ip} onChange={(e) => setSit(e.target.value)} />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="address">Description</label>
                            <InputTextarea id="address" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="state">Release Files</label>
                            <div>
                                <Toast ref={toast}></Toast>

                                <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                                <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload"  multiple accept="*"
                                    onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                    headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                    chooseOptions={chooseOptions} cancelOptions={cancelOptions} />
                            </div>
                        </div>
                        <div className="field col-12" style={{ display: "flex", justifyContent: "flex-end" }}>
                            <React.Fragment>
                                <div >
                                    <Button label="" icon="pi pi-cloud-upload"  className=" lg:mr-2" onClick={handleUploadRelease} />
                                </div>
                            </React.Fragment>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;
