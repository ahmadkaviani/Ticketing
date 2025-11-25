import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../model/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {

    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        console.log(this.user);
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            runInAction(() => {
                store.commonStore.setToken(user.token);    
                this.user = user;
                router.navigate("/");
            })
            
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
       // localStorage.removeItem('jwt');
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => {this.user = user});
        } catch (error) {
            console.log(error);
        }
    }

}