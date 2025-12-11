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

import Country from "./Country";

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    apiGet(`/api/Persons/${id}`)
      .then((data) => setPerson(data))
      .catch((error) => console.error("Error fetching person:", error));
  }, [id]);

  if (!person) {
    return <Text>Načítám data...</Text>;
  }

  const country =
    Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>
        Detail osoby
      </Heading>

      <Card>
        <CardHeader>
  <Heading size="md">{person.name}</Heading>
        </CardHeader>
        <CardBody>
        <Stack divider={<Divider />} spacing={2}>
            <Text><strong>IČ:</strong> {person.identificationNumber}</Text>
            <Text><strong>DIČ:</strong> {person.taxNumber}</Text>
            <Text>
            <strong>Bankovní účet:</strong> {person.accountNumber}/{person.bankCode} ({person.iban})
            </Text>
            <Text><strong>Tel.:</strong> {person.telephone}</Text>
            <Text><strong>Mail:</strong> {person.mail}</Text>
            <Text>
            <strong>Sídlo:</strong> {person.street}, {person.city}, {person.zip}, {country}
            </Text>
            <Text><strong>Poznámka:</strong> {person.note}</Text>
        </Stack>
        </CardBody>

      </Card>
    </Box>
  );
};

export default PersonDetail;
