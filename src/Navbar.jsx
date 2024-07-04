import React, { useState } from 'react';
import { CDBNavbar } from 'cdbreact';
import { Header, NotificationPanel } from './Navbar.style';

// Componente funcional Navbar
const Navbar = () => {
  // Estado para controlar la visibilidad del panel de notificaciones
  const [showNotifications, setShowNotifications] = useState(false);

  // Función para alternar la visibilidad del panel de notificaciones
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <Header style={{ background: "#333", color: "#fff" }}>
      <div className="navbar-wrapper">
        {/* CDBNavbar para el diseño de la barra de navegación */}
        <CDBNavbar dark expand="md" scrolling className="justify-content-start">
          <div className="ml-auto">
            {/* Icono de notificaciones que al hacer clic muestra/oculta el panel */}
            <div className="notification-icon" onClick={toggleNotifications}>
              <i className="fas fa-bell"></i>
            </div>
            {/* Imagen del panel */}
            <div className="panel-image">
              <img alt="panelImage" src="img/pane/pane4.png" style={{ width: "3rem", height: "3rem" }} />
            </div>
          </div>
        </CDBNavbar>
        {/* Panel de notificaciones que se muestra condicionalmente */}
        {showNotifications && (
          <NotificationPanel>
            <p>Notificación 1</p>
            <p>Notificación 2</p>
            <p>Notificación 3</p>
          </NotificationPanel>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
