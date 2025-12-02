import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiGet } from "../utils/api";
import FlashMessage from "../components/FlashMessage";
import InvoiceTable from "./InvoiceTable.jsx";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiGet("/api/invoices")
      .then((data) => setInvoices(data))
      .catch((err) => {
        console.error("Chyba při načítání faktur:", err);
        setError("Nepodařilo se načíst seznam faktur.");
      });
  }, []);

  return (
    <div>
      <h1>Seznam faktur</h1>
      <hr />

      <Link to={"/invoices/create"} className="btn btn-success mb-3">
        Vytvořit novou fakturu
      </Link>

      {error && <FlashMessage theme="danger" text={error} />}

      {invoices.length === 0 ? (
        <p>Žádné faktury nejsou k dispozici.</p>
      ) : (
        <InvoiceTable invoices={invoices} setInvoices={setInvoices} />
      )}
    </div>
  );
};

export default InvoiceList;
