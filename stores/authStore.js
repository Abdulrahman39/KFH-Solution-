import instance from "./instance";
import projectsStore from "./projectsStore";
import {toJS} from "mobx";

class AuthStore {
    token = null;
    user = null;

    login = async (userInfo) => {
        try {
            const res = await instance.post("auth/login", userInfo);
            console.log(res.token);
            // alert("Login Successful!");
            await this.getUser(res.token);
            await projectsStore.getProject();
            await projectsStore.getUsers();
            console.log(toJS(projectsStore.users));
            console.log(this.user);
            return res.token;
        } catch (error) {
            console.error(error);
            // alert(`Login failed!`);
            return "";
        }
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
        } catch (error) {
            console.error(error);
        }
    };
}

const newAuthStore = new AuthStore();

export default newAuthStore;