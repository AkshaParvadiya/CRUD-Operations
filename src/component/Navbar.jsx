import React from "react";
import {AppBar,  Toolbar, Typography, styled} from '@mui/material';
import { NavLink } from "react-router-dom";


const Header = styled(AppBar)`
background: #760235;
`

const Tabs = styled(NavLink)`
font-size: 20px;
color: inherit;
text-decoration: none;
margin-right:20px;
`
const Navbar = () =>{

    return(
        <Header position="static">
            <Toolbar>
                <Tabs to="/">USERVIEW</Tabs>
                <Tabs to="/">All Users</Tabs>
                <Tabs to="/AddUser">Add User</Tabs>
            </Toolbar>
        </Header>
    )
}

export default Navbar;