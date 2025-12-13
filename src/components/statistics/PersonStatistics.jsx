import React, { useEffect, useState } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import { apiGet } from "../../utils/api";

const PersonStatistics = ({ personId }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!personId) return;

    setLoading(true);
    apiGet(`/api/Persons/statistics?personId=${personId}`)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStats(data[0]);
        } else {
          setStats(null);
        }
      })
      .catch((err) => console.error("Chyba při načítání statistik:", err))
      .finally(() => setLoading(false));
  }, [personId]);

  if (loading) return <Spinner />;

  if (!stats) return <Text>Žádné statistiky k dispozici.</Text>;

  return (
    <Box mt={4} p={3} borderWidth="1px" borderRadius="md" boxShadow="sm">
      <Text><strong>Fakturované příjmy:</strong> {stats.revenue} Kč</Text>
    </Box>
  );
};

export default PersonStatistics;
