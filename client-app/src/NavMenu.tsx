import React, { Component } from 'react';
import './NavMenu.css';
import { Button, Container, Dropdown, DropdownItem, DropdownMenu, Image, Menu } from "semantic-ui-react";
import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer(function NavMenu() {

  const { ticketStore, userStore } = useStore();

  return (
    <React.Fragment>
      <header>
        <div className="TopBar navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
          <div >
            <div id="company">
              <div id="company_logo"></div>
              <div id="company_text">
                شركت مديريت فناوري بورس تهران
                <br /> Tehran Securities Exchange Technology
                Management Co
              </div>
            </div>
            <div id="menu_btns">
              <Image src={userStore.user?.image || '/assets/user.png'} avatar spaced='right'  ></Image>
              <Dropdown pointing='top left' text={userStore.user?.displayName} >
                <DropdownMenu>
                  <DropdownItem as={Link} to={''}
                    text='My Profile' icon='user' ></DropdownItem>
                  <DropdownItem onClick={userStore.logout} text='logout' icon='power' ></DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
})
