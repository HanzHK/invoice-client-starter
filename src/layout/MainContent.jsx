import React from "react";
import { Container, Box } from "@chakra-ui/react";

const MainContent = ({ children }) => {
  return (
    <Container maxW="7xl" flex="1" py={8}>
      <Box
        bg="white"
        borderRadius="xl"
        boxShadow="sm"
        p={{ base: 4, md: 8 }}
        minH="500px"
      >
        {children}
      </Box>
    </Container>
  );
};

export default MainContent;