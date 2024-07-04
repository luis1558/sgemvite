import React from 'react';
import { 
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem 
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="app" style={{ display: "flex", height: "100%", overflow: "scroll initial" }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: "inherit" }}>
            Sabbag Radiologos
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="house-user">Inicio</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/equipos" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Equipos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/proveedores" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Proveedores</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/mantenimientos" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="calendar">Mantenimientos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/contratos" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file">Contratos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/repuestos" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="briefcase">Repuestos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/ubicaciones" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="map">Ubicaciones</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/hero404" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
            Sabbag Radiologos
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default Sidebar;
