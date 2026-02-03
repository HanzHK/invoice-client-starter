import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

const InvoiceActions = ({ invoice, onDetail, onEdit, onDelete }) => (
  <ButtonGroup size="sm" spacing={2}>
    <Button colorScheme="blue" onClick={() => onDetail(invoice)}>Detail</Button>
    <Button colorScheme="yellow" onClick={() => onEdit(invoice)}>Editovat</Button>
    <Button colorScheme="red" onClick={() => onDelete(invoice.id)}>Smazat</Button>
  </ButtonGroup>
);

export default InvoiceActions;
