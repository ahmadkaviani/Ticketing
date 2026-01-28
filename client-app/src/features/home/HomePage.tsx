import { useEffect } from "react";
import { Button, Container } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default observer(function HomePage() {

    const { userStore } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (userStore.isLoggedIn) {
            navigate("/tickets");
        } else {
            navigate("/login");
        }
    }, [userStore.isLoggedIn, navigate]);

    return null;


})