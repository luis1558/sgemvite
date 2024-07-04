import { useEffect, useState } from "react";
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

export const Proveedores = () => {
  const url = 'https://sgemvite-back-turso-sql.vercel.app/proveedores';
  const [proveedores, updateProveedor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [title, setTitle] = useState('');
  const [operation, setOperation] = useState(1);
  const [id_proveedor, setId_proveedor] = useState('');
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  // estado para controlar la visibilidad
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getProveedores();
  }, []);

  const getProveedores = async () => {
    try {
      const response = await axios.get(url);
      updateProveedor(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching proveedores');
      setLoading(false);
    }
  };

  const openModal = (op, id_proveedor = '', nombre = '', contacto = '', ciudad = '', direccion = '', telefono = '') => {
    setId_proveedor(String(id_proveedor));
    setNombre(nombre);
    setContacto(contacto);
    setCiudad(ciudad);
    setDireccion(direccion);
    setTelefono(telefono);
    setOperation(op);
    setTitle(op === 1 ? 'Crear proveedor' : 'Editar proveedor');
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    getProveedores();
  }

  const validar = () => {
    let parametros;
    let metodo;

    if (String(id_proveedor).trim() === '') {
      show_alerta('Escribe el id del Proveedor', 'warning');
    } else if (String(nombre).trim() === '') {
      show_alerta('Escribe el nombre del Proveedor', 'warning');
    } else if (String(contacto).trim() === '') {
      show_alerta('Escribe el contacto del Proveedor', 'warning');
    } else if (String(ciudad).trim() === '') {
      show_alerta('Escribe la ciudad del Proveedor', 'warning');
    } else if (String(direccion).trim() === '') {
      show_alerta('Escribe la dirección del Proveedor', 'warning');
    } else if (String(telefono).trim() === '') {
      show_alerta('Escribe el teléfono del Proveedor', 'warning');
    } else {
      parametros = {
        id_proveedor: String(id_proveedor).trim(),
        nombre: String(nombre).trim(),
        contacto: String(contacto).trim(),
        ciudad: String(ciudad).trim(),
        direccion: String(direccion).trim(),
        telefono: String(telefono).trim(),
      };
      metodo = operation === 1 ? 'POST' : 'PUT';
      enviarSolicitud(metodo, parametros, id_proveedor)
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
          getProveedores();
        }
      })
      .catch(function (error) {
        show_alerta('Error en la solicitud', 'error');
        console.log(error);
      });
  }

  const deleteProveedor = (id_proveedor, nombre) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: '¿ Estas seguro de eliminar el proveedor ' + nombre + ' ?',
      icon: 'question', text: 'No se podrá marcha atras',
      showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        enviarSolicitud('DELETE', {}, id_proveedor).then(() => {
          getProveedores();
        });
      } else {
        show_alerta('El proveedor no fue eliminado', 'info');
      }
    })
  }

  const filteredProveedores = proveedores.filter(
    proveedor =>
      proveedor.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
      proveedor.contacto.toLowerCase().includes(searchText.toLowerCase()) ||
      proveedor.ciudad.toLowerCase().includes(searchText.toLowerCase()) ||
      proveedor.direccion.toLowerCase().includes(searchText.toLowerCase()) ||
      proveedor.telefono.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { name: 'Id proveedor', selector: row => row.id_proveedor, sortable: true },
    { name: 'Nombre', selector: row => row.nombre, sortable: true },
    { name: 'Contacto', selector: row => row.contacto, sortable: true },
    { name: 'Ciudad', selector: row => row.ciudad, sortable: true },
    { name: 'Dirección', selector: row => row.direccion, sortable: true },
    { name: 'Teléfono', selector: row => row.telefono, sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <>
          <Button
            onClick={() => openModal(3, row.id_proveedor, row.nombre, row.contacto, row.ciudad, row.direccion, row.telefono)}
            className='btn btn-warning'
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button variant="danger" onClick={() => deleteProveedor(row.id_proveedor.row.nombre)}>
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
                <h1>Proveedores</h1>
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
                      data={filteredProveedores}
                      pagination
                    />
                    <Modal show={showModal} onHide={closeModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group controlId="id_proveedor">
                            <Form.Label>Id proveedor</Form.Label>
                            <Form.Control
                              type="text"
                              value={id_proveedor}
                              onChange={(e) => setId_proveedor(e.target.value)}
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
                          <Form.Group controlId="contacto">
                            <Form.Label>Contacto</Form.Label>
                            <Form.Control
                              type="text"
                              value={contacto}
                              onChange={(e) => setContacto(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group controlId="ciudad">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control
                              type="text"
                              value={ciudad}
                              onChange={(e) => setCiudad(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group controlId="direccion">
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control
                              type="text"
                              value={direccion}
                              onChange={(e) => setDireccion(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group controlId="telefono">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                              type="text"
                              value={telefono}
                              onChange={(e) => setTelefono(e.target.value)}
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
  )

}

export default Proveedores;