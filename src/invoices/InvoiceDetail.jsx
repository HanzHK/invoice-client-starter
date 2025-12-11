import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Stack,
  Divider,
} from "@chakra-ui/react";

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    apiGet(`/api/invoices/${id}`)
      .then((data) => setInvoice(data))
      .catch((err) => console.error("Error fetching invoice:", err));
  }, [id]);

  if (!invoice) return <Text>Načítám fakturu...</Text>;

  const { seller, buyer } = invoice;

  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>
        Detail faktury {invoice.invoiceNumber}
      </Heading>

      <Stack spacing={6}>
        <Card>
          <CardHeader>
            <Heading size="md">Prodávající</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<Divider />} spacing={0}>
              <Text><strong>Jméno:</strong> {seller?.name}</Text>
              <Text><strong>IČ:</strong> {seller?.identificationNumber}</Text>
              <Text><strong>DIČ:</strong> {seller?.taxNumber}</Text>
              <Text><strong>Účet:</strong> {seller?.accountNumber}/{seller?.bankCode}</Text>
              <Text><strong>IBAN:</strong> {seller?.iban}</Text>
              <Text><strong>Telefon:</strong> {seller?.telephone}</Text>
              <Text><strong>Email:</strong> {seller?.mail}</Text>
              <Text><strong>Adresa:</strong> {seller?.street}, {seller?.zip} {seller?.city}, {seller?.country}</Text>
              <Text><strong>Poznámka:</strong> {seller?.note}</Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Kupující</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<Divider />} spacing={0}>
              <Text><strong>Jméno:</strong> {buyer?.name}</Text>
              <Text><strong>IČ:</strong> {buyer?.identificationNumber}</Text>
              <Text><strong>DIČ:</strong> {buyer?.taxNumber}</Text>
              <Text><strong>Účet:</strong> {buyer?.accountNumber}/{buyer?.bankCode}</Text>
              <Text><strong>IBAN:</strong> {buyer?.iban}</Text>
              <Text><strong>Telefon:</strong> {buyer?.telephone}</Text>
              <Text><strong>Email:</strong> {buyer?.mail}</Text>
              <Text><strong>Adresa:</strong> {buyer?.street}, {buyer?.zip} {buyer?.city}, {buyer?.country}</Text>
              <Text><strong>Poznámka:</strong> {buyer?.note}</Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Fakturační údaje</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<Divider />} spacing={0}>
              <Text><strong>Datum vystavení:</strong> {invoice.issued}</Text>
              <Text><strong>Datum splatnosti:</strong> {invoice.dueDate}</Text>
              <Text><strong>Produkt:</strong> {invoice.product}</Text>
              <Text><strong>Cena:</strong> {invoice.price}</Text>
              <Text><strong>DPH:</strong> {invoice.vat}%</Text>
              <Text><strong>Poznámka:</strong> {invoice.note}</Text>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Box>
  );
};

export default InvoiceDetail;
