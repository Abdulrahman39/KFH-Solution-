import instance from "./instance";
import projectsStore from "./projectsStore";
import {makeObservable, observable, toJS} from "mobx";
import FormData from "form-data";
import {observer} from "mobx-react";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

class AuthStore {
    token = null;
    user = null;
    userLoaded = false;

    constructor() {
        makeObservable(this, {
            user: observable,
            userLoaded: observable
        });
    };

    checkLogin = async (userInfo) => {
        const res = await instance.post("auth/login", userInfo);
        console.log(res);
        this.token = res.token;
    };

    login = async () => {
        try {
            await this.getUser(this.token);
            console.log(this.userLoaded);
            await projectsStore.getProject();
            await projectsStore.getUsers();
            console.log(toJS(projectsStore.users));
            console.log(this.user);

            localStorage.setItem("fromLogin", true);

            return res.token;
        } catch (error) {
            console.error(error);
            // alert(`Login failed!`);
            return "";
        }
    };

    refresh = async () => {
        try {
            console.log('FML');

            this.token = localStorage.getItem("token");

            await this.getUser(this.token);
            await projectsStore.getProject();
            await projectsStore.getUsers();
            console.log(toJS(projectsStore.users));
            console.log(this.user);
        } catch (error) {
            console.error(error);
            // alert(`Login failed!`);
            return "";
        }
    };

    logout = () => {
        this.token = null;
        this.user = null;
        this.userLoaded = false;
        localStorage.clear();
        instance.defaults.headers.common.Authorization = ``;
        projectsStore.projects = [];
        projectsStore.projectsLoaded = false;
        projectsStore.users = [];
        projectsStore.currentProject = null;
        projectsStore.formData = new FormData();
    };

    getUser = async (token) => {
        localStorage.setItem("token", token);
        console.log(`Bearer ${token}`);
        instance.defaults.headers.common.Authorization = `Bearer ${token}`;
        console.log(instance.defaults.headers.common.Authorization);

        try {
            const res = await instance.get("user/whoAmI");
            console.log(res);
            this.user = res;
            this.userLoaded = true;
        } catch (error) {
            console.error(error);
        }
    };
}

const newAuthStore = new AuthStore();

export default newAuthStore;