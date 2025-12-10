import React from "react";
import { Box, Flex, Heading, Container } from "@chakra-ui/react";
import Navigation from "./Navigation";

const Header = () => {
  return (
<Box
  bg="gray.900"
  color="white"
  py={4}
  boxShadow="lg"
  borderBottom="1px"
  borderColor="gray.700"
>
      <Container maxW="7xl">
        <Flex justify="space-between" align="center">
          <Heading size="lg" fontWeight="bold" letterSpacing="tight">
            📄 Správce faktur
          </Heading>
          <Navigation />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;