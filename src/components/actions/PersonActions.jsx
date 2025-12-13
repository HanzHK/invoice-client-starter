import React from "react";
import { Link } from "react-router-dom";
import { ButtonGroup, Button, IconButton } from "@chakra-ui/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const PersonActions = ({ personId, onDelete }) => {
  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      <Button
        as={Link}
        to={`/persons/show/${personId}`}
        leftIcon={<FaEye />}
        colorScheme="blue"
      >
        Zobrazit
      </Button>
      <Button
        as={Link}
        to={`/persons/edit/${personId}`}
        leftIcon={<FaEdit />}
        colorScheme="orange"
      >
        Upravit
      </Button>
      <Button
        leftIcon={<FaTrash />}
        colorScheme="red"
        onClick={() => {
          if (window.confirm("Opravdu chcete smazat tuto osobu?")) {
            onDelete(personId);
          }
        }}
      >
        Odstranit
      </Button>
    </ButtonGroup>
  );
};

export default PersonActions;