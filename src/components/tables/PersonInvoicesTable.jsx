import React, { useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
import { apiGet } from "../../utils/api";
import { formatCurrency } from "../../utils/currencyFormat";
import { Link } from "react-router-dom";

const PersonInvoicesTable = ({ identificationNumber, type }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!identificationNumber) return;
    setLoading(true);

    const endpoint = type === "sales" ? "issued" : "received";

    apiGet(`/api/Invoices/${endpoint}?ico=${identificationNumber}`)
      .then((data) => setInvoices(data))
      .catch((err) => console.error("Chyba při načítání faktur:", err))
      .finally(() => setLoading(false));
  }, [identificationNumber, type]);

  if (loading) return <Spinner />;

  return (
    <Box mt={4}>
      <Table variant="striped" colorScheme="teal" size="sm">
        <Thead>
          <Tr>
            <Th>Číslo</Th>
            <Th>Produkt</Th>
            <Th>Částka</Th>
            <Th>Datum vystavení</Th>
            <Th>Datum splatnosti</Th>
            <Th>Prodávající</Th>
            <Th>Kupující</Th>
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
              <Td>{inv.issued}</Td>
              <Td>{inv.dueDate}</Td>
              <Td>{inv.seller?.name}</Td>
              <Td>{inv.buyer?.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PersonInvoicesTable;
