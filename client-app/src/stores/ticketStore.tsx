import { action, makeAutoObservable, makeObservable, observable } from "mobx";

export default class TicketStore {

    title = "test";

    constructor() {
        makeAutoObservable(this);
    }

    setTitle = () => { 
        this.title = this.title + '!';
    }
 
}