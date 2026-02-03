import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiGet, apiDelete } from "../utils/api";
import InvoiceTable from "../components/tables/InvoiceTable";
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
import InvoiceActions from "../components/actions/InvoiceActions";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  const deleteInvoice = async (id) => {
    try {
      await apiDelete(`/api/invoices/${id}`);
      setInvoices(invoices.filter((item) => item._id !== id));

      toast({
        title: "Faktura smazána",
        description: "Faktura byla úspěšně odstraněna.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error.message);
      toast({
        title: "Chyba",
        description: error.message || "Nepodařilo se smazat fakturu.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    apiGet("/api/invoices")
      .then((data) => {
        setInvoices(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        toast({
          title: "Chyba při načítání",
          description: "Nepodařilo se načíst seznam faktur.",
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
        <Heading size="lg">Seznam faktur</Heading>
        <Button
          as={Link}
          to="/invoices/create"
          leftIcon={<FaPlus />}
          colorScheme="green"
          size="lg"
        >
          Nová faktura
        </Button>
      </Flex>

      <InvoiceTable
        invoices={invoices}
        renderActions={(inv) => (
          <InvoiceActions
            invoiceId={inv._id}
            onDetail={(id) => navigate(`/invoices/show/${id}`)}
            onEdit={(id) => navigate(`/invoices/edit/${id}`)}
            onDelete={deleteInvoice}
          />
        )}
      />
    </Box>
  );
};

export default InvoiceList;
