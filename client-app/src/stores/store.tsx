import { createContext, useContext } from "react";
import TicketStore from "./ticketStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";

interface Store {

    ticketStore: TicketStore,
    commonStore: CommonStore,
    userStore : UserStore
}

export const store : Store = {
    ticketStore : new TicketStore(),
    commonStore : new CommonStore(),
    userStore : new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}