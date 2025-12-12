import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet } from "../utils/api";
import { FaIdCard, FaRegEnvelope, FaPhone, FaMapMarkerAlt, FaStickyNote } from "react-icons/fa";
import {
  Box,
  Icon,
  Heading,
  Text,
  Stack,
  Divider,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import PersonInvoicesTable from "../components/tables/PersonInvoicesTable";

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    apiGet(`/api/persons/${id}`)
      .then((data) => setPerson(data))
      .catch((err) => console.error("Error fetching person:", err));
  }, [id]);

  if (!person) return <Text>Načítám osobu...</Text>;

  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>
        Detail osoby {person.name}
      </Heading>

      <Stack spacing={6}>
            <Card>
      <CardHeader>
        <Heading size="md">Základní údaje</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={3}>
           <Text>
        <Icon as={FaIdCard} mr={2} /> IČ: {person.identificationNumber}
      </Text>
      <Text>
        <Icon as={FaIdCard} mr={2} /> DIČ: {person.taxNumber}
      </Text>
      <Text>
        <Icon as={FaRegEnvelope} mr={2} /> {person.mail}
      </Text>
      <Text>
        <Icon as={FaPhone} mr={2} /> {person.telephone}
      </Text>
      <Text>
        <Icon as={FaMapMarkerAlt} mr={2} /> {person.street}, {person.zip} {person.city}, {person.country}
      </Text>
      <Text>
        <Icon as={FaStickyNote} mr={2} /> {person.note}
      </Text>
        </Stack>
      </CardBody>
    </Card>

        {/* Vystavené faktury */}
        <Card>
          <CardHeader>
            <Heading size="md">Vystavené faktury</Heading>
          </CardHeader>
          <CardBody>
            <PersonInvoicesTable
              identificationNumber={person.identificationNumber}
              type="sales"
              onDetail={(inv) => navigate(`/invoices/show/${inv._id}`)}
            />
          </CardBody>
        </Card>

        {/* Přijaté faktury */}
        <Card>
          <CardHeader>
            <Heading size="md">Přijaté faktury</Heading>
          </CardHeader>
          <CardBody>
            <PersonInvoicesTable
              identificationNumber={person.identificationNumber}
              type="purchases"
              onDetail={(inv) => navigate(`/invoices/show/${inv._id}`)}
            />
          </CardBody>
        </Card>
      </Stack>
    </Box>
  );
};

export default PersonDetail;
