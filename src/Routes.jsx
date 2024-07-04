import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Inicio } from './components/Inicio';
import Equipos from './components/Equipos';
import { Hero404 } from './components/Hero404';
import { Profile } from './components/Profile';
import { Proveedores } from './components/Proveedores';
import { Mantenimientos } from './components/Mantenimientos';
import { Contratos } from './components/Contratos';
import { Repuestos } from './components/Repuestos';
import { Ubicaciones } from './components/Ubicaciones';
import { Login } from './components/Login';

const RoutesComponent = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/equipos" element={<Equipos />} />
          <Route path="/hero404" element={<Hero404 />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/mantenimientos" element={<Mantenimientos />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route path="/repuestos" element={<Repuestos />} />
          <Route path="/ubicaciones" element={<Ubicaciones />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default RoutesComponent;
