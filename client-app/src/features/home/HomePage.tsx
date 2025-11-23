import { Button, Container } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer(function HomePage() {
    const { userStore } = useStore();
    return (
        <Container style={{ marginTop: '7em' }} >
            <h1>Home Page</h1>
            {userStore.isLoggedIn ? <Button positive as={Link} to='/tickets' >Your Tikcets</Button> : <Button positive as={Link} to='/login' >Login</Button>}

        </Container>
    )
})