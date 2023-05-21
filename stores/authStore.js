import instance from "./instance";
import projectsStore from "./projectsStore";
import {makeObservable, observable, toJS} from "mobx";
import FormData from "form-data";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

class AuthStore {
    token = null;
    user = null;
    userLoaded = false;
    theme = 'light';

    constructor() {
        makeObservable(this, {
            user: observable,
            userLoaded: observable,
            theme: observable
        });
    };

    checkLogin = async (userInfo) => {
        const res = await instance.post("auth/login", userInfo);
        this.token = res.token;
    };

    login = async () => {
        try {
            await this.getUser(this.token);
            await projectsStore.getProject();
            await projectsStore.getUsers();

            localStorage.setItem("fromLogin", true);

            return res.token;
        } catch (error) {
            console.error(error);
            return "";
        }
    };

    refresh = async () => {
        try {
            this.token = localStorage.getItem("token");

            await this.getUser(this.token);
            await projectsStore.getProject();
            await projectsStore.getUsers();
        } catch (error) {
            console.error(error);
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
        instance.defaults.headers.common.Authorization = `Bearer ${token}`;

        try {
            const res = await instance.get("user/whoAmI");
            this.user = res;
            this.userLoaded = true;
        } catch (error) {
            console.error(error);
        }
    };
}

const newAuthStore = new AuthStore();

export default newAuthStore;