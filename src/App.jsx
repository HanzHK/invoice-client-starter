/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./Routes";

export function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/persons" className="nav-link">Osoby</Link>
            </li>
            <li className="nav-item">
              <Link to="/invoices/create" className="nav-link">Nová faktura</Link>
            </li>
            <li className="nav-item">
              <Link to="/invoices" className="nav-link">Seznam faktur</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {routes.map((route, i) =>
            route.index
              ? <Route key={i} index element={route.element} />
              : <Route key={i} path={route.path} element={route.element} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;