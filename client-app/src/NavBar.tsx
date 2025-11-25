import React from "react"
import { Button, Container, Dropdown, DropdownItem, DropdownMenu, Image, Menu } from "semantic-ui-react";
import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface Props {
    handleFormOpen: (id?: string) => void;
}

export default observer(function NavBar() {

    const { ticketStore, userStore } = useStore()

    return (
        <Menu inverted fixed="top" >
            <Container>
                <Menu.Item header>
                    <img src='logo192.png' style={{ marginRight: '10px' }} ></img>
                </Menu.Item>
                <Menu.Item name='AAA'></Menu.Item>
                <Menu.Item name='AAA'>
                    <Button positive content='Create' onClick={() => { ticketStore.formOpen() }}></Button>
                </Menu.Item>
                <Menu.Item position="right">
                    <Image src={userStore.user?.image || '/assets/user.png'} avatar spaced='right'  ></Image>
                    <Dropdown pointing='top left' text={userStore.user?.displayName} >
                        <DropdownMenu>
                            <DropdownItem as={Link} to={''}
                                text='My Profile' icon='user' ></DropdownItem>
                            <DropdownItem onClick={userStore.logout} text='logout' icon='power' ></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    );
})