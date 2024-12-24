import React from "react"
import { Container, Menu } from "semantic-ui-react";

export default function NavBar()
{

    return (
        <Menu inverted fixed="top" >
            <Container>
                <Menu.Item header>
                    <img src='logo192.png' style={{marginRight:'10px'}} ></img>
                </Menu.Item>
                <Menu.Item name ='AAA'></Menu.Item>
            </Container>
        </Menu>
    );
}