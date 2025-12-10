import React from "react";
import { Box, Container, Flex, Text, HStack, Divider } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      bg="gray.800"
      color="gray.400"
      py={6}
      mt="auto"
      borderTop="1px"
      borderColor="gray.700"
    >
      <Container maxW="7xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text fontSize="sm">© 2025 Jan Kubíček. All rights reserved.</Text>
          <HStack spacing={4} fontSize="sm">
            <Text cursor="pointer" _hover={{ color: "white" }}>
              Podmínky
            </Text>
            <Divider orientation="vertical" h="4" />
            <Text cursor="pointer" _hover={{ color: "white" }}>
              Kontakt
            </Text>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;