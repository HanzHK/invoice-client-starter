import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import InvoiceFilter from "../components/filter/InvoiceFilter";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { formatCurrency } from "../utils/currencyFormat";
import { Link } from "react-router-dom";

const InvoiceList = () => {
  const [filters, setFilters] = useState({});
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    apiGet("/api/invoices", filters)
      .then((data) => setInvoices(data))
      .catch((err) => console.error("Chyba při načítání faktur:", err));
  }, [filters]);

  return (
    <Box p={6}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <InvoiceFilter onFilterChange={setFilters} />
        <Button colorScheme="teal">Vytvořit novou fakturu</Button>
      </Box>

<Table variant="striped" colorScheme="teal">
  <Thead>
    <Tr>
      <Th>Číslo faktury</Th>
      <Th>Produkt</Th>
      <Th>Částka</Th>
      <Th>Kupující</Th>
      <Th>Prodávající</Th>
    </Tr>
  </Thead>
  <Tbody>
    {invoices.map((inv) => (
      <Tr key={inv._id}>
        <Td>
          <Link to={`/invoices/show/${inv._id}`} style={{ color: "teal", fontWeight: "bold" }}>
            {inv.invoiceNumber}
          </Link>

        </Td>
        <Td>{inv.product}</Td>
        <Td>{formatCurrency(inv.price)}</Td>
        <Td>{inv.buyer?.name}</Td>
        <Td>{inv.seller?.name}</Td>
      </Tr>
    ))}
  </Tbody>
</Table>

    </Box>
  );
};

export default InvoiceList;
