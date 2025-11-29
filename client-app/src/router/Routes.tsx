import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import HomePage from "../features/home/HomePage";
import TicketsDashboard from "../TicketsDashboard";
import LoginForm from "../features/LoginForm";
import CommentsDashboard from "../CommentsDashboard";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: 'HomePage', element: <HomePage /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'tickets', element: <TicketsDashboard /> },
            { path: 'comments/:ticketId?', element: <CommentsDashboard /> }           
        ]
    }
]

export const router = createBrowserRouter(routes);