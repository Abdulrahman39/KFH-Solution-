import { useRouter } from 'next/router';
import React, {useContext, useEffect, useState} from 'react';
import AppConfig from '../layout/AppConfig';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import newAuthStore from "../stores/authStore";
import authStore from "../stores/authStore";
import {Avatar} from 'primereact/avatar'

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    useEffect(() => {
        authStore.logout();
    }, []);

    const handleClick = async () => {

        await newAuthStore.checkLogin({email, password});
        router.push('/projects');

        await newAuthStore.login();
    };

    return (
        <div className={containerClassName} suppressHydrationWarning>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/KFHLOGO.png`} alt="SARD logo" className="mb-5 w-6rem flex-shrink-0" style={{borderRadius: '20px'}} />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                        <Avatar icon="pi pi-user" className="mr-2" size="xlarge" shape="circle" />
                            <div className="text-900 text-3xl font-medium mb-3">Welcome!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText inputid="email1" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">

                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl" onClick={handleClick}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default LoginPage;
