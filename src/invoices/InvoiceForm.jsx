import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";

import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";
import FlashMessage from "../components/FlashMessage";
import InputSelect from "../components/InputSelect";

const InvoiceForm = () => {
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: { _id: "" },
        buyer: { _id: "" },
        issued: "",
        dueDate: "",
        product: "",
        price: 0,
        vat: 0,
        note: ""
    });

const [sent, setSent] = useState(false);
const [success, setSuccess] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
        await apiPost("/api/invoices", invoice);
        setSuccess(true);
    } catch (err) {
        setSuccess(false);
    }
    setSent(true);
};

const [persons, setPersons] = useState([]);
useEffect(() => {
  apiGet("/api/persons")
    .then((data) => setPersons(data))
    .catch((err) => console.error("Chyba při načítání osob:", err));
}, []);



    return (
<div>
      <h1>Nová faktura</h1>
      <hr />
      {sent && (
        <FlashMessage
          theme={success ? "success" : "danger"}
          text={success ? "Faktura byla uložena." : "Chyba při ukládání faktury."}
        />
      )}
      <form onSubmit={handleSubmit}>
  <InputField
    type="number"
    name="invoiceNumber"
    label="Číslo faktury"
    value={invoice.invoiceNumber}
    handleChange={(e) =>
      setInvoice({ ...invoice, invoiceNumber: e.target.value })
    }
  />

<InputSelect
  name="seller"
  label="Prodávající"
  value={invoice.seller._id}
  handleChange={(e) =>
    setInvoice({ ...invoice, seller: { _id: e.target.value } })
  }
  items={persons}
/>

<InputSelect
  name="buyer"
  label="Kupující"
  value={invoice.buyer._id}
  handleChange={(e) =>
    setInvoice({ ...invoice, buyer: { _id: e.target.value } })
  }
  items={persons}
/>


  <InputField
    type="date"
    name="issued"
    label="Datum vystavení"
    value={invoice.issued}
    handleChange={(e) =>
      setInvoice({ ...invoice, issued: e.target.value })
    }
  />

  <InputField
    type="date"
    name="dueDate"
    label="Datum splatnosti"
    value={invoice.dueDate}
    handleChange={(e) =>
      setInvoice({ ...invoice, dueDate: e.target.value })
    }
  />

  <InputField
    type="text"
    name="product"
    label="Produkt"
    value={invoice.product}
    handleChange={(e) =>
      setInvoice({ ...invoice, product: e.target.value })
    }
  />

  <InputField
    type="number"
    name="price"
    label="Cena"
    value={invoice.price}
    handleChange={(e) =>
      setInvoice({ ...invoice, price: e.target.value })
    }
  />

  <InputField
    type="number"
    name="vat"
    label="DPH (%)"
    value={invoice.vat}
    handleChange={(e) =>
      setInvoice({ ...invoice, vat: e.target.value })
    }
  />

  <InputField
    type="text"
    name="note"
    label="Poznámka"
    value={invoice.note}
    handleChange={(e) =>
      setInvoice({ ...invoice, note: e.target.value })
    }
  />
        <input type="submit" className="btn btn-primary" value="Uložit" />
      </form>
    </div>
  );
};

export default InvoiceForm;