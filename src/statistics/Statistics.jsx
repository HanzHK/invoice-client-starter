
import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { formatCurrency } from "../utils/currencyFormat";

import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
  const [invoiceStats, setInvoiceStats] = useState(null);
  const [personStats, setPersonStats] = useState([]);

  useEffect(() => {
    apiGet("/api/invoices/statistics")
      .then((data) => setInvoiceStats(data))
      .catch((err) => console.error("Chyba při načítání statistik faktur:", err));

    apiGet("/api/persons/statistics")
      .then((data) => setPersonStats(data))
      .catch((err) => console.error("Chyba při načítání statistik osob:", err));
  }, []);

const chartData = {
  labels: personStats.map((p) => p.personName),
  datasets: [
    {
      label: "Příjmy",
      data: personStats.map((p) => p.revenue),
      backgroundColor: "rgba(54, 162, 235, 0.6)",
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Příjmy podle osob (CZK)",
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (value) => formatCurrency(value),
      },
    },
  },
};


return (
  <Box p={6}>
    <Heading mb={4}>Statistiky</Heading>

    {invoiceStats && (
      <SimpleGrid columns={[1, 3]} spacing={6} mb={8}>
        <Stat p={4} shadow="md" borderWidth="1px" borderRadius="md">
          <StatLabel>Obrat za aktuální rok</StatLabel>
          <StatNumber>{formatCurrency(invoiceStats.currentYearSum)}</StatNumber>
        </Stat>
        <Stat p={4} shadow="md" borderWidth="1px" borderRadius="md">
          <StatLabel>Celkový obrat</StatLabel>
          <StatNumber>{formatCurrency(invoiceStats.allTimeSum)}</StatNumber>
        </Stat>
        <Stat p={4} shadow="md" borderWidth="1px" borderRadius="md">
          <StatLabel>Počet vystavených faktur</StatLabel>
          <StatNumber>{invoiceStats.invoicesCount}</StatNumber>
        </Stat>
      </SimpleGrid>
    )}

    <Heading size="md" mb={4}>
      Top osoby / společnosti podle příjmů
    </Heading>
    <Table variant="striped" colorScheme="teal" mb={8}>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Jméno</Th>
          <Th>Celkové příjmy</Th>
        </Tr>
      </Thead>
      <Tbody>
        {personStats.map((p) => (
          <Tr key={p.personId}>
            <Td>{p.personId}</Td>
            <Td>{p.personName}</Td>
            <Td>{formatCurrency(p.revenue)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>

    {personStats.length > 0 && (
      <Box shadow="md" borderWidth="1px" borderRadius="md" p={4}>
        <Heading size="sm" mb={4}>
          Graf příjmů podle osob
        </Heading>
        <Bar data={chartData} options={chartOptions} />
      </Box>
    )}
  </Box>
);

};

export default Statistics;