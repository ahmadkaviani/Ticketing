import React from "react"
import { Button, Container, Menu } from "semantic-ui-react";

interface Props
{
    handleFormOpen : (id?:string) => void;
}

export default function NavBar({handleFormOpen}:Props)
{

    return (
        <Menu inverted fixed="top" >
            <Container>
                <Menu.Item header>
                    <img src='logo192.png' style={{marginRight:'10px'}} ></img>
                </Menu.Item>
                <Menu.Item name ='AAA'></Menu.Item>
                <Menu.Item name ='AAA'>
                    <Button positive content='Create' onClick={() => {handleFormOpen()}}></Button>
                </Menu.Item>
            </Container>
        </Menu>
    );
}