import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, {forwardRef, useContext, useEffect, useImperativeHandle, useRef} from 'react';
import { LayoutContext } from './context/layoutcontext';
import {useRouter} from "next/router";
import authStore from "../stores/authStore";
import {observer} from "mobx-react";

const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    const router = useRouter();

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar ">
            <Link href="/projects" className="layout-topbar-logo">
                {/* <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} widt={'true'} alt="logo" /> */}
                <img src="/layout/images/KFHLOGO.png" width="40px" style={{ borderRadius: "8px" }} height={'40px'} widt={'true'} alt="logo" />
                <span>KFH</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button">
                    <i id='themeIcon' className="pi pi-moon" onClick={() => {
                        authStore.theme = authStore.theme === 'light' ? 'dark' : 'light';
                        document.getElementById('themeIcon').className = authStore.theme === 'light' ? 'pi pi-moon' : 'pi pi-sun';
                        document.getElementById('theme-css').href = `/themes/lara-${authStore.theme}-teal/theme.css`;
                    }}></i>
                </button>
                <Link href='/' className="">
                    <button type="button" className="p-link layout-topbar-button"  >
                        <i className="pi pi-sign-out"></i>
                    </button>
                </Link>
            </div>
        </div>
    );
});

export default observer(AppTopbar);
