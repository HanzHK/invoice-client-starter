import React, { useState, useEffect } from "react";
import { Box, Input, Select, Button } from "@chakra-ui/react";
import { apiGet } from "../../utils/api";

/**
 * Komponenta pro filtrování faktur.
 * Posílá buyerId/sellerId jako čísla (interní ID osoby), nikoli jména.
 */
const InvoiceFilter = ({ onFilterChange }) => {
  const [buyerId, setBuyerId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [product, setProduct] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [limit, setLimit] = useState("");

  const [persons, setPersons] = useState([]);

  useEffect(() => {
    apiGet("/api/persons")
      .then((data) => setPersons(data))
      .catch((err) => console.error("Chyba při načítání osob:", err));
  }, []);

  const applyFilter = () => {
    onFilterChange({
      buyerId,
      sellerId,
      product,
      minPrice,
      maxPrice,
      limit,
    });
  };

  return (
    <Box display="flex" gap={4} mb={4} flexWrap="wrap">
      <Select
        placeholder="Kupující (buyerId)"
        value={buyerId}
        onChange={(e) => setBuyerId(Number(e.target.value))}
        width="240px"
      >
        {persons.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </Select>

      <Select
        placeholder="Prodávající (sellerId)"
        value={sellerId}
        onChange={(e) => setSellerId(Number(e.target.value))}
        width="240px"
      >
        {persons.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </Select>

      <Input
        placeholder="Produkt"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        width="240px"
      />

      <Input
        type="number"
        placeholder="Min. cena"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        width="160px"
      />

      <Input
        type="number"
        placeholder="Max. cena"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        width="160px"
      />

      <Input
        type="number"
        placeholder="Limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        width="120px"
      />

      <Button colorScheme="teal" onClick={applyFilter}>
        Filtrovat
      </Button>
    </Box>
  );
};

export default InvoiceFilter;
