import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar.jsx";
import Navbar from "../Navbar.jsx";
import "datatables.net-dt/css/dataTables.dataTables.css";
import $ from 'jquery';
import "datatables.net";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import * as XLSX from 'xlsx'; // Import xlsx for Excel export

export const Equipos = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowData, setRowData] = useState(null);

  useEffect(() => {
    const table = $('#example').DataTable();

    $('#example tbody').on('click', 'tr', function() {
      const data = table.row(this).data();
      setSelectedRow(table.row(this).index());
      setRowData(data);
    });

    // Cleanup event listeners on component unmount
    return () => {
      $('#example tbody').off('click');
    };
  }, []);

  const handleEdit = () => {
    console.log('Edit row:', rowData);
    // Implement your edit functionality here
  };

  const handleDelete = () => {
    console.log('Delete row:', rowData);
    // Implement your delete functionality here
  };

  const handleAddNewDevice = () => {
    // Implement functionality to add a new device
    console.log('Add new device');
  };

  const handleExportToExcel = () => {
    const table = document.getElementById('example');
    const wb = XLSX.utils.table_to_book(table);
    XLSX.writeFile(wb, 'Equipos.xlsx');
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
                <div className="d-flex justify-content-end mb-3">
                  <button className="btn btn-primary me-2" onClick={handleAddNewDevice}>
                    Agregar Nuevo
                  </button>
                  <button className="btn btn-success" onClick={handleExportToExcel}>
                    Exportar en Excel
                  </button>
                </div>
                <table id="example" className="display" style={{ width: "100%" }}>
                  <caption>Equipos</caption>
                  <thead>
                    <tr>
                      <th>Id Equipo</th>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Serie</th>
                      <th>Ae Title</th>
                      <th>Ip Adress</th>
                      <th>Ubicacion</th>
                      <th>Id Sede</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 9 }, (_, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>ECOGRAFO</td>
                        <td>Edinburgh</td>
                        <td>G&I</td>
                        <td>P330W</td>
                        <td>320,800</td>
                        <td>MEDITRNS</td>
                        <td>192.189.65.33</td>
                        <td>ECOGRAFIA</td>
                        <td>TORRE</td>
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
                      <th>Id Equipo</th>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Serie</th>
                      <th>Ae Title</th>
                      <th>Ip Adress</th>
                      <th>Ubicacion</th>
                      <th>Id Sede</th>
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

export default Equipos;
