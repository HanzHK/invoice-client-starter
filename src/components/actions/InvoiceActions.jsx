import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

const InvoiceActions = ({ invoiceId, onDetail, onEdit, onDelete }) => (
  <ButtonGroup size="sm" spacing={2}>
    <Button colorScheme="blue" onClick={() => onDetail(invoiceId)}>
      Detail
    </Button>

    <Button colorScheme="yellow" onClick={() => onEdit(invoiceId)}>
      Editovat
    </Button>

    <Button
      colorScheme="red"
      onClick={() => {
        if (window.confirm("Opravdu chcete smazat tuto fakturu?")) {
          onDelete(invoiceId);
        }
      }}
    >
      Smazat
    </Button>
  </ButtonGroup>
);

export default InvoiceActions;
