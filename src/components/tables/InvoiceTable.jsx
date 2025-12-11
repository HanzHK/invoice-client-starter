import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const InvoiceTable = ({ invoices, renderActions }) => (
  <Table variant="striped" size="sm">
    <Thead>
      <Tr>
        <Th>Číslo</Th>
        <Th>Prodávající</Th>
        <Th>Kupující</Th>
        <Th>Datum vystavení</Th>
        <Th>Datum splatnosti</Th>
        <Th>Produkt</Th>
        <Th>Cena</Th>
        <Th>DPH</Th>
        <Th>Poznámka</Th>
        {renderActions && <Th>Akce</Th>}
      </Tr>
    </Thead>
    <Tbody>
      {invoices.map((inv) => (
        <Tr key={inv._id}>
          <Td>{inv.invoiceNumber}</Td>
          <Td>{inv.seller?.name}</Td>
          <Td>{inv.buyer?.name}</Td>
          <Td>{inv.issued}</Td>
          <Td>{inv.dueDate}</Td>
          <Td>{inv.product}</Td>
          <Td>{inv.price}</Td>
          <Td>{inv.vat}%</Td>
          <Td>{inv.note}</Td>
          {renderActions && <Td>{renderActions(inv)}</Td>}
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default InvoiceTable;
