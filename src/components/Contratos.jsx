import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import "datatables.net-dt/css/dataTables.dataTables.css"; // Importa los estilos CSS de DataTables desde la CDN
import $ from 'jquery'; // Importa jQuery
import "datatables.net"; // Importa la biblioteca DataTables  
import 'bootstrap/dist/css/bootstrap.min.css';
//import * as XLSX from 'xlsx'; // Importa xlsx para exportar a Excel

export const Contratos = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowData, setRowData] = useState(null);

  useEffect(() => {
    // Inicializa DataTable después de que el componente se monte
    $('#example').DataTable();
  }, []); // Utiliza un arreglo vacío como dependencia para ejecutar el efecto solo una vez

  const handleRowClick = (index, data) => {
    setSelectedRow(index);
    setRowData(data);
  };

  const handleEdit = () => {
    console.log('Edit row:', rowData);
    // Implementa la funcionalidad de editar aquí
  };

  const handleDelete = () => {
    console.log('Delete row:', rowData);
    // Implementa la funcionalidad de eliminar aquí
  };

  const handleAddNewProvider = () => {
    // Implementa la funcionalidad para agregar un nuevo contrato
    console.log('Add new provider');
  };

  const handleExportToExcel = () => {
    const table = document.getElementById('example');
    const wb = XLSX.utils.table_to_book(table);
    XLSX.writeFile(wb, 'Contratos.xlsx');
  };

  return (
    <div className="d-flex">
      <div>
        <Sidebar />
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <Navbar/>
        <div style={{height:"100%"}}>
          <div style={{padding:"20px 5%",height:"calc(100% - 64px)",overflowY:"scroll", margin:"0 auto"}}>
            <div style={{display:"grid", gridTemplateColumns:"repeat(1, minmax(100%, 100%))"}}>
              <div className="mt-5 w-100">
                <h4 className="font-weight-bold mb-3">Contratos</h4>
                <div className="d-flex justify-content-end mb-3">
                  <button className="btn btn-primary me-2" onClick={handleAddNewProvider}>
                    Nuevo Contrato
                  </button>
                  <button className="btn btn-success" onClick={handleExportToExcel}>
                    Exportar en Excel
                  </button>
                </div>
                <table id="example" className="display" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Id Contrato</th>
                      <th>Id Proveedor</th>
                      <th>Tipo</th>
                      <th>Fecha Inicio</th>
                      <th>Fecha Final</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 9 }, (_, i) => (
                      <tr key={i} onClick={() => handleRowClick(i, ["Mark", "Otto", "@mdo", "2", "Jacob", "Thornton"])}>
                        <td>{i + 1}</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>
                          {selectedRow === i && (
                            <div style={{ display: 'inline-flex', gap: '2px' }}>
                              <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>#</th>
                      <th>Id Contrato</th>
                      <th>Id Proveedor</th>
                      <th>Tipo</th>
                      <th>Fecha Inicio</th>
                      <th>Fecha Final</th>
                      <th>Acciones</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contratos;
