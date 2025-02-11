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
    getEquipos();
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
        const { tipo, mensaje } = respuesta.data;
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
            onClick={() => openModal(3, row.id_equipo, row.nombre, row.tipo, row.marca, row.modelo, row.serie, row.ae_title, row.ip_address, row.ubicacion, row.id_sede)}
            className='btn btn-warning'
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button variant="danger" onClick={() => deleteEquipo(row.id_equipo, row.nombre)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="d-flex">
      <div>
        <Sidebar />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <Navbar />
        <div style={{ height: "100%" }}>
          <div
            style={{
              padding: "20px 5%",
              height: "calc(100% - 64px)",
              overflowY: "scroll",
              margin: "0 auto",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(1, minmax(100%, 100%))" }}>
              <div className="mt-5 w-100">
                <h1>Equipos</h1>        
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="d-flex justify-content-end mb-3">
                      <input
                        type="text"
                        placeholder="Buscar..."
                        className="form-control"
                        style={{ maxWidth: '300px' }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                      <Button
                      onClick={() => openModal(1)} 
                      className='btn btn-dark' 
                      data-bs-toggle='modal' 
                      data-bs-target='#modalEquipos'>
                        <FontAwesomeIcon icon={faPlus} /> Añadir
                      </Button>

                      <Button variant="download" className="ms-2">
                        <FontAwesomeIcon icon={faDownload} /> Exportar
                      </Button>

                    </div>
                    <DataTable
                      columns={columns}
                      data={filteredEquipos}
                      pagination
                    />
                    <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="id_equipo">
              <Form.Label>Id equipo</Form.Label>
              <Form.Control
                type="text"
                value={id_equipo}
                onChange={(e) => setId_equipo(e.target.value)}
                disabled={operation === 3}
              />
            </Form.Group>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="tipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="marca">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="modelo">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="serie">
              <Form.Label>Serie</Form.Label>
              <Form.Control
                type="text"
                value={serie}
                onChange={(e) => setSerie(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="ae_title">
              <Form.Label>Ae Title</Form.Label>
              <Form.Control
                type="text"
                value={ae_title}
                onChange={(e) => setAe_title(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="ip_address">
              <Form.Label>Ip Address</Form.Label>
              <Form.Control
                type="text"
                value={ip_address}
                onChange={(e) => setIp_address(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="ubicacion">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="id_sede">
              <Form.Label>Id Sede</Form.Label>
              <Form.Control
                type="text"
                value={id_sede}
                onChange={(e) => setId_sede(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btnCerrar" onClick={closeModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={validar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipos;
