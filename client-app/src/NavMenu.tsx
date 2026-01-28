import React, { Component } from 'react';
import './NavMenu.css';
import { Button, Container, List, Dropdown, DropdownItem, DropdownMenu, Image, Menu } from "semantic-ui-react";
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
              {userStore.user &&
                <div style={{ direction: 'rtl' }}>
                  <Dropdown pointing='top left' text={userStore.user?.displayName}  >
                    <DropdownMenu style={{ direction: 'rtl', textAlign: 'right', 'text-align': 'right' }}>
                      <DropdownItem as={Link} to={'tickets'}
                        text='تیکت های من' icon='ticket'
                        style={{
                          display: 'flex',
                          flexDirection: 'row-reverse',
                          justifyContent: 'flex-start',
                          gap: '8px',
                          direction: 'rtl !important', 'text-align': 'right !important'
                        }}  ></DropdownItem>
                      <DropdownItem as={Link} to={'faq'}
                        text='سوالات متداول' icon='question'
                        style={{
                          display: 'flex',
                          flexDirection: 'row-reverse',
                          justifyContent: 'flex-start',
                          gap: '8px',
                          direction: 'rtl !important', 'text-align': 'right !important'
                        }}  ></DropdownItem>
                      <DropdownItem as={Link} to={''}
                        text='پروفایل من' icon='user'
                        style={{
                          display: 'flex',
                          flexDirection: 'row-reverse',
                          justifyContent: 'flex-start',
                          gap: '8px',
                          direction: 'rtl !important', 'text-align': 'right !important'
                        }}  ></DropdownItem>
                      <DropdownItem onClick={userStore.logout} text='خروج' icon='power'
                        style={{
                          display: 'flex',
                          flexDirection: 'row-reverse',
                          justifyContent: 'flex-start',
                          gap: '8px'
                        }} ></DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Image src={userStore.user?.image || '/assets/user.png'} avatar spaced='left'  ></Image>
                </div>}
              {!(userStore.user) &&
                <>
                  
                  {/* <a
                    className="TopIcon home"
                    href="https://www.tsetmc.com"
                    id="home"

                    aria-label="خانه"
                  ></a> */}
                </>
              }
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
})
