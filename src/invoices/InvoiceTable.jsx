import React from "react";

const InvoiceTable = ({ invoices, setInvoices }) => {
  const deleteInvoice = async (id) => {
    if (!window.confirm("Opravdu smazat fakturu?")) return;
    try {
      const res = await fetch(`/api/invoices/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Mazání faktury selhalo");
      setInvoices(invoices.filter(inv => inv._id !== id));
    } catch (err) {
      console.error("Chyba při mazání faktury:", err);
      alert("Nepodařilo se smazat fakturu.");
    }
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Číslo</th>
          <th>Prodávající</th>
          <th>Kupující</th>
          <th>Datum vystavení</th>
          <th>Datum splatnosti</th>
          <th>Produkt</th>
          <th>Cena</th>
          <th>DPH</th>
          <th>Poznámka</th>
          <th colSpan="3">Akce</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((inv) => (
          <tr key={inv._id}>
            <td>{inv.invoiceNumber}</td>
            <td>{inv.seller?.name}</td>
            <td>{inv.buyer?.name}</td>
            <td>{inv.issued}</td>
            <td>{inv.dueDate}</td>
            <td>{inv.product}</td>
            <td>{inv.price}</td>
            <td>{inv.vat}%</td>
            <td>{inv.note}</td>
            <td>
              <button
                className="btn btn-info btn-sm"
                onClick={() => console.log("Detail faktury:", inv._id)}
              >
                Detail
              </button>
            </td>
            <td>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => console.log("Editace faktury:", inv._id)}
              >
                Editovat
              </button>
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteInvoice(inv._id)}
              >
                Smazat
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
