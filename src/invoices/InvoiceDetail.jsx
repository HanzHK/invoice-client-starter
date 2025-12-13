import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import CountryDisplay from "../components/common/CountryDisplay";
import dateStringFormatter from "../utils/dateStringFormatter";
import PartyCard from "../components/common/PartyCard";
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
        <PartyCard title="Prodávající" party={seller} />
        <PartyCard title="Kupující" party={buyer} />

        <Card>
          <CardHeader>
            <Heading size="md">Fakturační údaje</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<Divider />} spacing={0}>
              <Text><strong>Datum vystavení:</strong> {dateStringFormatter(invoice.issued, true)}</Text>
              <Text><strong>Datum splatnosti:</strong> {dateStringFormatter(invoice.dueDate, true)}</Text>
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
