import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet } from "../utils/api";
import PartyCard from "../components/common/PartyCard";
import PersonStatistics from "../components/statistics/PersonStatistics";
import {
  Box,
  Heading,
  Text,
  Stack,
  Card,
  CardHeader,
  CardBody,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown, FaChartLine } from "react-icons/fa";
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

        {/* Vystavené faktury = PŘÍJMY */}
        <Card>
          <CardHeader>
            <HStack spacing={2}>
              <Icon as={FaArrowUp} color="green.500" boxSize={5} />
              <Heading size="md">Vystavené faktury (příjmy)</Heading>
            </HStack>
            <Text fontSize="sm" color="gray.600" mt={1}>
              Faktury, které vystavil jiným subjektům (příjmy)
            </Text>
          </CardHeader>
          <CardBody>
            <PersonInvoicesTable
              identificationNumber={person.identificationNumber}
              type="sales"
              onDetail={(inv) => navigate(`/invoices/show/${inv._id}`)}
            />
          </CardBody>
        </Card>

        {/* Přijaté faktury = VÝDAJE */}
        <Card>
          <CardHeader>
            <HStack spacing={2}>
              <Icon as={FaArrowDown} color="red.500" boxSize={5} />
              <Heading size="md">Přijaté faktury (výdaje)</Heading>
            </HStack>
            <Text fontSize="sm" color="gray.600" mt={1}>
              Faktury pro tento subjekt vysvaené jinými subjekty (výdaje)
            </Text>
          </CardHeader>
          <CardBody>
            <PersonInvoicesTable
              identificationNumber={person.identificationNumber}
              type="purchases"
              onDetail={(inv) => navigate(`/invoices/show/${inv._id}`)}
            />
          </CardBody>
        </Card>

        {/* Statistiky */}
        <Card>
          <CardHeader>
            <HStack spacing={2}>
              <Icon as={FaChartLine} color="blue.500" boxSize={5} />
              <Heading size="md">Statistiky</Heading>
            </HStack>
          </CardHeader>
          <CardBody>
            <PersonStatistics personId={person._id} />
          </CardBody>
        </Card>
      </Stack>
    </Box>
  );
};

export default PersonDetail;