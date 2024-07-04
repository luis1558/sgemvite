import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function show_alerta(mensaje, icono, foco = '') {
  onfocus(foco);
  const validIcons = ["success", "error", "warning", "info", "question"];
  const icon = validIcons.includes(icono) ? icono : "info";
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: mensaje,
    icon: icon,
  });
}

function onfocus(foco) {
  if (foco !== '') {
    document.getElementById(foco).focus();
  }
}
