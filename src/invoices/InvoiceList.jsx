import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { apiGet } from "../utils/api";
import { formatCurrency } from "../utils/currencyFormat";
import InvoiceFilter from "../components/filter/InvoiceFilter";
import InvoiceActions from "../components/actions/InvoiceActions";

const InvoiceList = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    apiGet("/api/invoices", filters)
      .then((data) => setInvoices(data))
      .catch((err) => console.error("Chyba při načítání faktur:", err));
  }, [filters]);

  const handleDelete = async (invoice) => {
    if (!window.confirm("Opravdu smazat fakturu?")) return;
    try {
      const res = await fetch(`/api/invoices/${invoice._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Mazání faktury selhalo");
      setInvoices(invoices.filter((inv) => inv._id !== invoice._id));
    } catch (err) {
      console.error("Chyba při mazání faktury:", err);
      alert("Nepodařilo se smazat fakturu.");
    }
  };

return (
  <Box p={6}>
    {/* horní řádek s filtrem */}
    <Box mb={4}>
      <InvoiceFilter onFilterChange={setFilters} />
    </Box>

    {/* tlačítko na samostatném řádku */}
    <Box mb={4}>
      <Button
        colorScheme="teal"
        onClick={() => navigate("/invoices/create")}
      >
        Vytvořit novou fakturu
      </Button>
    </Box>

    {/* tabulka */}
    <Table variant="striped" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Číslo faktury</Th>
          <Th>Produkt</Th>
          <Th>Částka</Th>
          <Th>Kupující</Th>
          <Th>Prodávající</Th>
          <Th>Akce</Th>
        </Tr>
      </Thead>
      <Tbody>
        {invoices.map((inv) => (
          <Tr key={inv._id}>
            <Td>
              <Link
                to={`/invoices/show/${inv._id}`}
                style={{ color: "teal", fontWeight: "bold" }}
              >
                {inv.invoiceNumber}
              </Link>
            </Td>
            <Td>{inv.product}</Td>
            <Td>{formatCurrency(inv.price)}</Td>
            <Td>{inv.buyer?.name}</Td>
            <Td>{inv.seller?.name}</Td>
            <Td>
              <InvoiceActions
                invoice={inv}
                onDetail={(i) => navigate(`/invoices/show/${i._id}`)}
                onEdit={(i) => navigate(`/invoices/edit/${i._id}`)}
                onDelete={handleDelete}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);

};

export default InvoiceList;
