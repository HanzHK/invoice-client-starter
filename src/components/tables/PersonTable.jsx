import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Box,
} from "@chakra-ui/react";
import PersonActions from "../actions/PersonActions";

const PersonTable = ({ items, onDelete }) => {
  return (
    <Box>
      <Text mb={4} fontWeight="medium" color="gray.600">
        Počet osob: {items.length}
      </Text>

      <TableContainer
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
        overflowX="auto"
      >
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th width="60px">#</Th>
              <Th>Jméno</Th>
              <Th width="300px">Akce</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.length === 0 ? (
              <Tr>
                <Td colSpan={3} textAlign="center" py={8} color="gray.500">
                  Žádné osoby k zobrazení
                </Td>
              </Tr>
            ) : (
              items.map((item, index) => (
                <Tr key={item._id} _hover={{ bg: "gray.50" }}>
                  <Td>{index + 1}</Td>
                  <Td fontWeight="medium">{item.name}</Td>
                  <Td>
                    <PersonActions personId={item._id} onDelete={onDelete} />
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PersonTable;