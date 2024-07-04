import { useEffect, useState } from 'react';
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

export const Contratos = () => {
  const url = 'https://sgemvite-back-turso-sql.vercel.app/contratos';
  const [contratos, updateContrato] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [title, setTitle] = useState('');
  const [operation, setOperation] = useState(1);
  const [id_contrato, setId_contrato] = useState('');
  const [id_proveedor, setId_proveedor] = useState('');
  const [tipo, setTipo] = useState('');
  const [fecha_inicio, setFecha_inicio] = useState('');
  const [fecha_final, setFecha_final] = useState('');
  const [valor, setValor] = useState('');

  // estado para controlar la visibilidad
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getContratos();
  }, []);

  const getContratos = async () => {
    try {
      const response = await axios.get(url);
      updateContrato(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching contratos');
      setLoading(false);
    }
  };

  const openModal = (op, id_contrato = '', id_proveedor = '', tipo = '', fecha_inicio = '', fecha_final = '', valor = '') => {
    setId_contrato(String(id_contrato));
    setId_proveedor(String(id_proveedor));
    setTipo(tipo);
    setFecha_inicio(fecha_inicio);
    setFecha_final(fecha_final);
    setValor(valor);
    setOperation(op);
    setTitle(op === 1 ? 'Agregar Contrato' : 'Editar Contrato');
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    getContratos();
  }

  const validar = () => {
    let parametros;
    let metodo;

    if (String(id_contrato).trim() === '') {
      show_alerta('Escribe el id del contrato', 'warning');
    } else if (String(id_proveedor).trim() === '') {
      show_alerta('Escribe el id del proveedor', 'warning');
    } else if (String(tipo).trim() === '') {
      show_alerta('Escribe el tipo de contrato', 'warning');
    } else if (String(fecha_inicio).trim() === '') {
      show_alerta('Escribe la fecha de inicio', 'warning');
    } else if (String(fecha_final).trim() === '') {
      show_alerta('Escribe la fecha de finalización', 'warning');
    } else if (String(valor).trim () === '') {
      show_alerta('Escribe el valor del contrato', 'warning');
    } else {
      parametros = {
        id_contrato: String(id_contrato).trim(),
        id_proveedor: String(id_proveedor).trim(),
        tipo: String(tipo).trim(),
        fecha_inicio: String(fecha_inicio).trim(),
        fecha_final: String(fecha_final).trim(),
        valor: String(valor).trim(),
      };
      metodo = operation === 1 ? 'POST' : 'PUT';
      enviarSolicitud(metodo, parametros, id_contrato)
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
          getContratos();
        }
      })
      .catch(function (error) {
        show_alerta('Error en la solicitud', 'error');
        console.log(error);
      });
  }

  const deleteContrato = (id_contrato, id_proveedor) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: '¿Estás seguro de eliminar el contrato de ' + id_proveedor + '?',
      icon: 'question', text: 'No se podra marcha atras',
      showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'Cancelar'      
    }).then((result) => {
      if (result.isConfirmed) {
        enviarSolicitud('DELETE', {}, id_contrato).then(() => {
          getContratos();
        });
      } else {
        show_alerta('El contrato no fue eliminado','info');
      }
    })
  }

  const filteredContratos = contratos.filter(
  contrato =>
    (typeof contrato.id_proveedor === 'string' && contrato.id_proveedor.toLowerCase().includes(searchText.toLowerCase())) ||
    contrato.tipo.toLowerCase().includes(searchText.toLowerCase()) ||
    contrato.fecha_inicio.toLowerCase().includes(searchText.toLowerCase()) ||
    contrato.fecha_final.toLowerCase().includes(searchText.toLowerCase()) ||
    contrato.valor.toLowerCase().includes(searchText.toLowerCase())
);

  const columns = [
    { name: 'Id contrato', selector: row => row.id_contrato, sortable: true},
    { name: 'Id proveedor', selector: row => row.id_proveedor, sortable: true},
    { name: 'Tipo', selector: row => row.tipo, sortable: true},
    { name: 'Fecha inicio', selector: row => row.fecha_inicio, sortable: true},
    { name: 'Fecha final', selector: row => row.fecha_final, sortable: true},
    { name: 'Valor', selector: row => row.valor, sortable: true},
    {
      name: 'Acciones',
      cell: row => (
        <>
          <Button
            onClick={() => openModal(3, row.id_contrato, row.id_proveedor, row.tipo, row.fecha_inicio, row.fecha_final, row.valor)}
            className='btn btn-warning'
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button variant='danger' onClick={() => deleteContrato(row.id_contrato.row.id_proveedor)}>
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
                <h1>Contratos</h1>
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
                      data={filteredContratos}
                      pagination
                    />
                    <Modal show={showModal} onHide={closeModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group controlId="id_contrato">
                            <Form.Label>Id contrato</Form.Label>
                            <Form.Control
                              type="text"
                              value={id_contrato}
                              onChange={(e) => setId_contrato(e.target.value)}
                              disabled={operation === 3}
                            />
                          </Form.Group>
                          <Form.Group controlId="id_proveedor">
                            <Form.Label>Id proveedor</Form.Label>
                            <Form.Control
                              type="text"
                              value={id_proveedor}
                              onChange={(e) => setId_proveedor(e.target.value)}
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
                          <Form.Group controlId="fecha_inicio">
                            <Form.Label>Fecha Inicio</Form.Label>
                            <Form.Control
                              type="text"
                              value={fecha_inicio}
                              onChange={(e) => setFecha_inicio(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group controlId="fecha_final">
                            <Form.Label>Fecha Final</Form.Label>
                            <Form.Control
                              type="text"
                              value={fecha_final}
                              onChange={(e) => setFecha_final(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group controlId="valor">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                              type="text"
                              value={valor}
                              onChange={(e) => setValor(e.target.value)}
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

export default Contratos;