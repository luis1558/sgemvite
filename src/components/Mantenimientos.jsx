import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import "datatables.net-dt/css/dataTables.dataTables.css";
import $ from 'jquery';
import "datatables.net";
import 'bootstrap/dist/css/bootstrap.min.css';
// import * as XLSX from 'xlsx'; // Importamos xlsx para exportar a Excel

export const Mantenimientos = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowData, setRowData] = useState(null);

  useEffect(() => {
    const table = $('#example').DataTable();

    $('#example tbody').on('click', 'tr', function() {
      const data = table.row(this).data();
      setSelectedRow(table.row(this).index());
      setRowData(data);
    });

    return () => {
      $('#example tbody').off('click');
    };
  }, []);

  const handleEdit = () => {
    console.log('Edit row:', rowData);
    // funcionalidad de edición 
  };

  const handleDelete = () => {
    console.log('Delete row:', rowData);
    // funcionalidad de eliminación 
  };

  const handleAddNewMaintenance = () => {
    // funcionalidad para agregar un nuevo mantenimiento
    console.log('Add new maintenance');
  };

  const handleExportToExcel = () => {
    const table = document.getElementById('example');
    const wb = XLSX.utils.table_to_book(table);
    XLSX.writeFile(wb, 'Mantenimientos.xlsx');
  };

  const handleImportPDF = (rowIndex) => {
    // Implementa la funcionalidad para importar el PDF correspondiente a la fila
    console.log('Importar PDF para la fila:', rowIndex);
  };

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
          <div style={{padding:"20px 5%",height:"calc(100% - 64px)",overflowY:"scroll", margin: "0 auto"}}>
            <div style={{display:"grid", gridTemplateColumns:"repeat(1, minmax(100%, 100%))"}}>
              <div className="mt-5 w-100">
                <h4 className="font-weight-bold mb-3">Mantenimientos</h4>
                <div className="d-flex justify-content-end mb-3">
                  <button className="btn btn-primary me-2" onClick={handleAddNewMaintenance}>
                    Nuevo Mantenimiento
                  </button>
                  <button className="btn btn-success" onClick={handleExportToExcel}>
                    Exportar en Excel
                  </button>
                </div>
                <table id="example" className="display" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Id Mantenimiento</th>
                      <th>Id Equipo</th>
                      <th>Id Proveedor</th>
                      <th>Id Contrato</th>
                      <th>Tipo</th>
                      <th>Estado</th>
                      <th>Costo</th>
                      <th>Fecha Programada</th>
                      <th>Fecha Ejecucion</th>
                      <th>Fecha Reprogramacion</th>
                      <th>Fecha Cancelacion</th>
                      <th>Reporte</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 9 }, (_, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>ECOGRAFO</td>
                        <td>ECOGRAFIA</td>
                        <td>G&E</td>
                        <td>P350-30</td>
                        <td>SJSLSJHSO55</td>
                        <td>61</td>
                        <td>25-05-2024</td>
                        <td>ECOGRAFIA 5</td>
                        <td>SEDE CARIBE</td>
                        <td>SEDE CARIBE</td>
                        <td>
                          <button className="btn btn-info" onClick={() => handleImportPDF(i)}> PDF</button>
                        </td>
                        <td>
                          {selectedRow === i && (
                            <div style={{ display: 'inline-flex', gap: '2px' }}>
                              <button className="btn btn-primary" onClick={handleEdit}>Editar</button>
                              <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Id Mantenimiento</th>
                      <th>Id Equipo</th>
                      <th>Id Proveedor</th>
                      <th>Id Contrato</th>
                      <th>Tipo</th>
                      <th>Estado</th>
                      <th>Costo</th>
                      <th>Fecha Programada</th>
                      <th>Fecha Ejecucion</th>
                      <th>Fecha Reprogramacion</th>
                      <th>Fecha Cancelacion</th>
                      <th>Reporte</th>
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

export default Mantenimientos;
