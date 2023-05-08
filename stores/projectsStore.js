import instance from "./instance";
import {makeAutoObservable, makeObservable, observable} from "mobx";
import { console } from "next/dist/compiled/@edge-runtime/primitives/console";
import FormData from 'form-data';

class ProjectsStore {
    projectsLoaded = false;
    projects = [];
    users = [];
    currentProject = null;
    formData = new FormData();

    constructor() {
        makeAutoObservable(this);
    }

    getProject = async () => {
        try {
            const res = await instance.get("project/");
            // console.log(res);
            this.projects = res;
            await this.addReleases();
            this.projectsLoaded = true;
            // console.log(this.projects);
        } catch (error) {
            console.error(error);
        }
    };

    getUsers = async () => {
        try {
            const res = await instance.get("user/");
            // console.log(res);
            this.users = res
            return res;
        } catch (error) {
            console.error(error);
        }
    }

    deleteUser = async (userId) => {
        try {
            const res = await instance.delete(`user/${userId}`);
            // console.log(res);
            // this.users = res
            return res;
        } catch (error) {
            console.error(error);
        }
    }

    editUser = async (userId, data) => {
        try {
            const res = await instance.put(`user/${userId}`, data, { 'Content-Type': 'application/json' });
            // console.log(res);
            // this.users = res
            return res;
        } catch (error) {
            console.error(error);
        }
    }


    createUser = async (data) => {
        try {
            const res = await instance.post("user/", data);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    addProject = async (project) => {
        try {
            const res = await instance.post("project/", project);
            console.log(res);
            await this.getProject();
        } catch (error) {
            console.error(error);
        }
    };

    addReleases = async () => {
        for (let i = 0; i < this.projects.length; i++) {
            // console.log(this.projects[i]);
            this.projects[i]["Releases"] = await this.getRelease(this.projects[i].id);
            // console.log(this.projects[i]["Releases"]);

            let iOS_Releases = [], android_Releases = [];
            for (let j = 0; j < this.projects[i].Releases.length; j++) {
                if (this.projects[i].Releases[j].platform === "IOS")
                    iOS_Releases.push(this.projects[i].Releases[j]);
                else
                    android_Releases.push(this.projects[i].Releases[j]);
            }

            this.projects[i]["iOS"] = iOS_Releases;
            this.projects[i]["Android"] = android_Releases;

            console.log(this.projects[i]);
            console.log(this.projects[i].iOS);
            console.log(this.projects[i].Android);
        }
    };

    getRelease = async (projectID) => {
        try {
            console.log(projectID);
            const res = await instance.get(`release/${projectID}`);
            console.log(res);
            return res;
        } catch (error) {
            console.error(error);
        }
    };

    createRelease = async () => {
        try {
            console.log(this.formData.get("release"));
            console.log(this.formData.get("file1"));
            const res = await instance.post("release/", this.formData, {
                'Content-Type': 'multipart/form-data'
            });
            console.log(res);
            return res;
        } catch (error) {
            console.error(error);
        }
    };
}

const newProjectsStore = new ProjectsStore();
export default newProjectsStore;