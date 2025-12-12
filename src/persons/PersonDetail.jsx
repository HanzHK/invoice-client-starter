import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet } from "../utils/api";
import CountryDisplay from "../components/common/CountryDisplay";
import PartyCard from "../components/common/PartyCard";
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
            
        {/* Základní údaje */}
        <PartyCard title="Základní údaje" party={person} />

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
