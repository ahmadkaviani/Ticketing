import { createContext, useContext } from "react";
import TicketStore from "./ticketStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import CommentStore from "./commentStore";

interface Store {

    ticketStore: TicketStore,
    commentStore : CommentStore,
    commonStore: CommonStore,
    userStore : UserStore
}

export const store : Store = {
    ticketStore : new TicketStore(),
    commentStore : new CommentStore(),
    commonStore : new CommonStore(),
    userStore : new UserStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}