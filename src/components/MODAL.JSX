import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Sidebar from "../Sidebar.jsx";
import Navbar from "../Navbar.jsx";
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faDownload } from '@fortawesome/free-solid-svg-icons';
import { show_alerta } from "../functions.jsx";

export const Equipos = () => {
  const url = 'https://sgemvite-back-turso-sql.vercel.app/equipos';
  const [equipos, updateEquipo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [title, setTitle] = useState('');
  const [operation, setOperation] = useState(1);
  const [id_equipo, setId_equipo] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [serie, setSerie] = useState('');
  const [ae_title, setAe_title] = useState('');
  const [ip_address, setIp_address] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [id_sede, setId_sede] = useState('');

  // Estado para controlar la visibilidad del modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getEquipos();
  }, []);

  const getEquipos = async () => {
    try {
      const response = await axios.get(url);
      updateEquipo(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching equipos');
      setLoading(false);
    }
  };

  const openModal = (op, id_equipo = '', nombre = '', tipo = '', marca = '', modelo = '', serie = '', ae_title = '', ip_address = '', ubicacion = '', id_sede = '') => {
    setId_equipo(String(id_equipo));
    setNombre(nombre);
    setTipo(tipo);
    setMarca(marca);
    setModelo(modelo);
    setSerie(serie);
    setAe_title(ae_title);
    setIp_address(ip_address);
    setUbicacion(ubicacion);
    setId_sede(id_sede);
    setOperation(op);
    setTitle(op === 1 ? 'Registrar Equipo' : 'Editar Equipo');
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const validar = () => {
    let parametros;
    let metodo;

    if (String(id_equipo).trim() === '') {
      show_alerta('Escribe el id del Equipo', 'warning');
    } else if (String(nombre).trim() === '') {
      show_alerta('Escribe el nombre del Equipo', 'warning');
    } else if (String(tipo).trim() === '') {
      show_alerta('Escribe el Tipo del Equipo', 'warning');
    } else if (String(marca).trim() === '') {
      show_alerta('Escribe la Marca del Equipo', 'warning');
    } else if (String(modelo).trim() === '') {
      show_alerta('Escribe el modelo del Equipo', 'warning');
    } else if (String(serie).trim() === '') {
      show_alerta('Escribe la Serie del Equipo', 'warning');
    } else if (String(ae_title).trim() === '') {
      show_alerta('Escribe el ae title del Equipo', 'warning');
    } else if (String(ip_address).trim() === '') {
      show_alerta('Escribe la ip address del Equipo', 'warning');
    } else if (String(ubicacion).trim() === '') {
      show_alerta('Escribe la Ubicacion del Equipo', 'warning');
    } else if (String(id_sede).trim() === '') {
      show_alerta('Escribe el id de la Sede del Equipo', 'warning');
    } else {
      parametros = {
        id_equipo: String(id_equipo).trim(),
        nombre: String(nombre).trim(),
        tipo: String(tipo).trim(),
        marca: String(marca).trim(),
        modelo: String(modelo).trim(),
        serie: String(serie).trim(),
        ae_title: String(ae_title).trim(),
        ip_address: String(ip_address).trim(),
        ubicacion: String(ubicacion).trim(),
        id_sede: String(id_sede).trim(),
      };
      metodo = operation === 1 ? 'POST' : 'PUT';
      enviarSolicitud(metodo, parametros, id_equipo);
    }
  }

  const enviarSolicitud = async (metodo, parametros, id = '') => {
    let endpoint = url;
    if (metodo !== 'POST') {
      endpoint = `${url}/${id}`;
    }

    console.log(`Sending ${metodo} request to: ${endpoint}`);

    await axios({ method: metodo, url: endpoint, data: metodo !== 'DELETE' ? parametros : {} })
      .then(function (respuesta) {
        const { tipo, mensaje, equipo } = respuesta.data;
        show_alerta(mensaje, tipo);
        if (tipo === 'success') {
          closeModal();
          getEquipos();
        }
      })
      .catch(function (error) {
        show_alerta('Error en la solicitud', 'error');
        console.log(error);
      });
  }

  const deleteEquipo = (id_equipo, nombre) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: '¿Estás seguro de eliminar el equipo ' + nombre + ' ?',
      icon: 'question', text: 'No se podrá marcha atrás',
      showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        enviarSolicitud('DELETE', {}, id_equipo).then(() => {
          getEquipos();
        });
      } else {
        show_alerta('El equipo No fue eliminado', 'info');
      }
    })
  }

  const filteredEquipos = equipos.filter(
    equipo =>
      equipo.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
      equipo.tipo.toLowerCase().includes(searchText.toLowerCase()) ||
      equipo.marca.toLowerCase().includes(searchText.toLowerCase()) ||
      equipo.modelo.toLowerCase().includes(searchText.toLowerCase()) ||
      equipo.serie.toLowerCase().includes(searchText.toLowerCase()) ||
      equipo.ae_title.toLowerCase().includes(searchText.toLowerCase()) ||
      equipo.ip_address.toLowerCase().includes(searchText.toLowerCase()) ||
      equipo.ubicacion.toLowerCase().includes(searchText.toLowerCase()) ||
      equipo.id_sede.toString().includes(searchText)
  );

  const columns = [
    { name: 'Id equipo', selector: row => row.id_equipo, sortable: true },
    { name: 'Nombre', selector: row => row.nombre, sortable: true },
    { name: 'Tipo', selector: row => row.tipo, sortable: true },
    { name: 'Marca', selector: row => row.marca, sortable: true },
    { name: 'Modelo', selector: row => row.modelo, sortable: true },
    { name: 'Serie', selector: row => row.serie, sortable: true },
    { name: 'Ae Title', selector: row => row.ae_title, sortable: true },
    { name: 'Ip Adress', selector: row => row.ip_address, sortable: true },
    { name: 'Ubicacion', selector: row => row.ubicacion, sortable: true },
    { name: 'Id Sede', selector: row => row.id_sede, sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <>
          <Button
            onClick={() => openModal(2, row.id_equipo, row.nombre, row.tipo, row.marca, row.modelo, row.serie, row.ae_title, row.ip_address, row.ubicacion, row.id_sede)}
            className='btn btn-warning'
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          &nbsp;
          <Button onClick={() => deleteEquipo(row.id_equipo, row.nombre)} className='btn btn-danger'>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container-fluid">
      <Sidebar />
      <Navbar />
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2 className="text-start">Gestión de <b>Equipos</b></h2>
              </div>
              <div className="col-sm-6">
                <Button onClick={() => openModal(1)} className='btn btn-success'>
                  <FontAwesomeIcon icon={faPlus} /> <span>Agregar</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar equipo"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={filteredEquipos}
            pagination
            paginationComponentOptions={{ rowsPerPageText: 'Filas por página:', rangeSeparatorText: 'de' }}
            noDataComponent={<p>No se encontraron datos</p>}
          />
        </div>
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Serie</Form.Label>
              <Form.Control
                type="text"
                value={serie}
                onChange={(e) => setSerie(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ae Title</Form.Label>
              <Form.Control
                type="text"
                value={ae_title}
                onChange={(e) => setAe_title(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ip Address</Form.Label>
              <Form.Control
                type="text"
                value={ip_address}
                onChange={(e) => setIp_address(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ubicacion</Form.Label>
              <Form.Control
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Id Sede</Form.Label>
              <Form.Control
                type="text"
                value={id_sede}
                onChange={(e) => setId_sede(e.target.value)}
              />
            </Form.Group>
            <Button onClick={validar} className="btn btn-success mt-3">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
