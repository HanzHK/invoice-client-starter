import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";   

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    apiGet(`/api/invoices/${id}`)
      .then(data => setInvoice(data))
      .catch(err => console.error("Error fetching invoice:", err));
  }, [id]);

  if (!invoice) return <p>Načítám fakturu...</p>;

  return (
    <div>
      <h2>Detail faktury {invoice.invoiceNumber}</h2>
      <p><strong>Prodávající:</strong> {invoice.seller?.name}</p>
      <p><strong>Kupující:</strong> {invoice.buyer?.name}</p>
      <p><strong>Datum vystavení:</strong> {invoice.issued}</p>
      <p><strong>Datum splatnosti:</strong> {invoice.dueDate}</p>
      <p><strong>Produkt:</strong> {invoice.product}</p>
      <p><strong>Cena:</strong> {invoice.price}</p>
      <p><strong>DPH:</strong> {invoice.vat}%</p>
      <p><strong>Poznámka:</strong> {invoice.note}</p>
    </div>
  );
};

export default InvoiceDetail;
