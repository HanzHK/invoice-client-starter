import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Stack,
  Icon,
} from "@chakra-ui/react";
import {
  FaUser,
  FaIdCard,
  FaRegEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStickyNote,
  FaUniversity,
  FaHashtag,
} from "react-icons/fa";
import CountryDisplay from "./CountryDisplay";

const PartyCard = ({ title, party }) => {
  if (!party) return null;

  return (
    <Card>
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={3}>
          <Text><Icon as={FaUser} mr={2} /> {party.name}</Text>
          <Text><Icon as={FaIdCard} mr={2} /> IČ: {party.identificationNumber}</Text>
          <Text><Icon as={FaIdCard} mr={2} /> DIČ: {party.taxNumber}</Text>
          <Text><Icon as={FaUniversity} mr={2} /> Účet: {party.accountNumber}/{party.bankCode}</Text>
          <Text><Icon as={FaHashtag} mr={2} /> IBAN: {party.iban}</Text>
          <Text><Icon as={FaPhone} mr={2} /> {party.telephone}</Text>
          <Text><Icon as={FaRegEnvelope} mr={2} /> {party.mail}</Text>
          <Text>
            <Icon as={FaMapMarkerAlt} mr={2} /> {party.street}, {party.zip} {party.city},{" "}
            <CountryDisplay value={party.country} />
          </Text>
          <Text><Icon as={FaStickyNote} mr={2} /> {party.note}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default PartyCard;
