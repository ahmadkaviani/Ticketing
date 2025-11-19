import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { Ticket } from "../Ticket";
import agent from '../api/agent';

export default class TicketStore {


    tickets: Ticket[] = [];
    selectedTicket: Ticket | undefined = undefined;
    loading = false;
    editMode = false;

    constructor() {
        makeAutoObservable(this);
    }

      loadTickets = async () => {
        this.loading = true;
        try {
            const list = await agent.Tickets.list();
            runInAction(() => {
                this.tickets = list;
            });
        } catch (error) {
            console.error(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    selectTicket = (id: string) => {
        this.selectedTicket = this.tickets.find(x => x.id == id);
    }

    cancelTicket = () => {
        this.selectedTicket = undefined;
    }

  formOpen = (id? : string) => {
    id ? this.selectTicket(id) : this.cancelTicket();
    this.editMode = true;
  }

  formClose = () => {
    this.cancelTicket();
    this.editMode = true;
  }

}