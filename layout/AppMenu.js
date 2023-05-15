import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import authStore from "../stores/authStore";
import {observer} from "mobx-react";

const AppMenu = () => {
    const adminModel = [
        {
            label: 'Home',
            items: [
                { label: 'Projects', icon: 'pi pi-fw pi-home', to: '/projects' },
                { label: 'Admin Panel', icon: 'pi pi-fw pi-home', to: '/admin-panel/projects'}
            ]
        }
    ];

    const model = [
        {
            label: 'Home',
            items: [
                { label: 'Projects', icon: 'pi pi-fw pi-home', to: '/projects' }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {authStore.userLoaded && console.log(authStore.user.type)}
                {authStore.userLoaded && authStore.user.type !== 'ROLE_ADMIN' && model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                {authStore.userLoaded && authStore.user.type === 'ROLE_ADMIN' && adminModel.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default observer(AppMenu);
