import React, { useState } from 'react';
import './Main.css';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';
import { logout } from '../modules/authmanager';

export default function Header({ isLoggedIn, userProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Zoo Etc.</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/Zoos">Zoos</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/Gear">Gear</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/JobListings">Jobs</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Hello, {userProfile?.firstName}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>My Reviews</DropdownItem>
                <DropdownItem>My Job Listings</DropdownItem>
                {isLoggedIn && userProfile && userProfile.isAdmin === true ? (
                <DropdownItem>Type Management</DropdownItem>) : null}
                <DropdownItem divider />
                {isLoggedIn &&
              <>
                <DropdownItem><a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a></DropdownItem>
                </>
            }
              </DropdownMenu>
            </UncontrolledDropdown>
              </>
            }
          </Nav>
          <Nav navbar>             
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>

  );
}