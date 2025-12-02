import React from "react";
import { Navigate } from "react-router-dom";

import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";
import InvoiceForm from "./invoices/InvoiceForm";
import InvoiceList from "./invoices/InvoiceList";
                                                                                                                                                      
export const routes = [
  { index: true, element: <Navigate to="/persons" /> },

  { path: "/persons", element: <PersonIndex /> },
  { path: "/persons/show/:id", element: <PersonDetail /> },
  { path: "/persons/create", element: <PersonForm /> },
  { path: "/persons/edit/:id", element: <PersonForm /> },

  { path: "/invoices", element: <InvoiceList /> },
  { path: "/invoices/create", element: <InvoiceForm /> },
];