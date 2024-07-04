import styled from 'styled-components';

// Estilo para el componente Header, que contiene la barra de navegación
export const Header = styled.header`
  .navbar-wrapper {
    display: flex; // Establece el contenedor como un flexbox
    justify-content: flex-end; // Alinea los elementos al final (derecha)
    position: relative; // Necesario para el posicionamiento absoluto del panel de notificaciones
  }

  .input-nav {
    margin: auto; // Centra el input horizontalmente
    width: 25rem; // Establece un ancho fijo para el input
  }

  .ml-auto {
    display: flex; // Establece el contenedor como un flexbox
    align-items: center; // Alinea los elementos verticalmente al centro
  }

  .notification-icon,
  .panel-image {
    margin-right: 2rem; // Añade un margen derecho para separar los elementos
    cursor: pointer; // Cambia el cursor a pointer cuando se pasa sobre el icono
  }

  @media (max-width: 920px) {
    .input-nav {
      display: none; // Oculta el input en pantallas pequeñas
    }
  }
`;

// Estilo para el panel de notificaciones
export const NotificationPanel = styled.div`
  position: absolute; // Posiciona el panel de forma absoluta
  top: 3rem; // Ajusta la posición vertical según la altura de la navbar
  right: 2rem; // Alinea el panel con el icono de notificación
  width: 300px; // Establece un ancho fijo para el panel
  background-color: white; // Fondo blanco para el panel
  border: 1px solid #ccc; // Borde gris claro
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Añade sombra para darle profundidad
  padding: 1rem; // Espaciado interno
  z-index: 1000; // Asegura que el panel esté por encima de otros elementos

  p {
    margin: 0; // Elimina márgenes de los párrafos
    padding: 0.5rem 0; // Añade espaciado interno a los párrafos
    border-bottom: 1px solid #eee; // Línea divisoria entre notificaciones
    color: black; // Color del texto de las notificaciones
  }

  p:last-child {
    border-bottom: none; // Elimina la línea divisoria del último párrafo
  }
`;
