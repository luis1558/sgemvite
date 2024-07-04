import React from "react";
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

export const Inicio = () => {
  return (
    <div className="d-flex">
      <div>
        <Sidebar/>
      </div>
      <div style={{flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden"}}>
        <Navbar/>
        <div style={{flex: "1", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <h1>Sabbag Radiologos</h1>
        </div>
      </div>
    </div>
  );
};
