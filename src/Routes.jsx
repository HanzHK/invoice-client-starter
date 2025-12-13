import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "./layout/Layout";

import PersonList from "./persons/PersonList";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";
import InvoiceForm from "./invoices/InvoiceForm";
import InvoiceList from "./invoices/InvoiceList";
import InvoiceDetail from "./invoices/InvoiceDetail";
import InvoiceEdit from "./invoices/InvoiceEdit";
import Statistics from "./statistics/Statistics";
                                                                                                                                                      
export const routes = [
  { index: true, element: <Navigate to="/statistics" /> },

  { path: "/persons", element: <Layout><PersonList /></Layout> },
  { path: "/persons/show/:id", element: <Layout><PersonDetail /></Layout> },
  { path: "/persons/create", element: <Layout><PersonForm /></Layout> },
  { path: "/persons/edit/:id", element: <Layout><PersonForm /></Layout> },

  { path: "/invoices", element: <Layout><InvoiceList /></Layout> },
  { path: "/invoices/create", element: <Layout><InvoiceForm /></Layout> },
  { path: "/invoices/show/:id", element: <Layout><InvoiceDetail /></Layout> },
  { path: "/invoices/edit/:id", element: <Layout><InvoiceEdit /></Layout> },

  { path: "/statistics", element: <Layout><Statistics /></Layout> },
];
