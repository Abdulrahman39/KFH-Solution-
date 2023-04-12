import instance from "./instance";

class AuthStore {
    token = null;

    login = async (userInfo) => {
        try {
            const res = await instance.post("auth/login", userInfo);
            console.log(res.token);
            alert("Login Successful!");
            return res.token;
        } catch (error) {
            console.error(error);
            alert(`Login failed!`);
            return "";
        }
    };
}

const newAuthStore = new AuthStore();

export default newAuthStore;