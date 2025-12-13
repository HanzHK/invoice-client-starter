import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiDelete, apiGet } from "../utils/api";
import PersonTable from "../components/tables/PersonTable";
import {
  Box,
  Heading,
  Button,
  useToast,
  Flex,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const PersonList = () => {
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const deletePerson = async (id) => {
    try {
      await apiDelete(`/api/persons/${id}`);
      setPersons(persons.filter((item) => item._id !== id));
      
      toast({
        title: "Osoba smazána",
        description: "Osoba byla úspěšně odstraněna.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error.message);
      toast({
        title: "Chyba",
        description: error.message || "Nepodařilo se smazat osobu.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    apiGet("/api/persons")
      .then((data) => {
        setPersons(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        toast({
          title: "Chyba při načítání",
          description: "Nepodařilo se načíst seznam osob.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  if (isLoading) {
    return (
      <Center h="400px">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Seznam osob</Heading>
        <Button
          as={Link}
          to="/persons/create"
          leftIcon={<FaPlus />}
          colorScheme="green"
          size="lg"
        >
          Nová osoba
        </Button>
      </Flex>

      <PersonTable items={persons} onDelete={deletePerson} />
    </Box>
  );
};

export default PersonList;