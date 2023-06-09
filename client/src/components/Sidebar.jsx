import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import SidebarData from './SidebarData'
import SubMenu from './SubMenu'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'

// const Nav = styled.div`
//     background: #15171c;
//     height: '80px';
//     display: flex;
//     justifyContent: flex-start;
//     alignItems: center;
// `;

// const NavIcon = styled(Link)`
//     margin-left: 2rem;
//     font-size: 2rem;
//     height: 80px;
//     display: flex;
//     justifyContent: flex-start;
//     alignItems: center;    
// `;

// const SidebarNav = styled.nav`
//     background: #15171c;
//     width: 250px;
//     height: 100vh;
//     display: flex;
//     justifyContent: flex-start;
//     alignItems: center; 
//     position: fixed;
//     top: 0;
//     left: 0;
//     marginTop: 10%;
// `
// const SideBarWrap = styled.div`
//     width: 100%
// `


const Sidebar = ({ trips, user }) => {

// console.log(user)
// user && console.log(user)

  return (
    <div className="sidebar">
      {/* <Nav>
            <NavIcon to='#'>
                <FaIcons.FaBars />
            </NavIcon>
        </Nav> */}
      <div>
        <div>
          <SubMenu item={SidebarData[0]} user={user} />
          <SubMenu item={SidebarData[1]} subMenuList={trips} />
          <SubMenu item={SidebarData[2]} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar