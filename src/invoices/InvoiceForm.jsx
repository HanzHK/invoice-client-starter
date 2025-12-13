import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../utils/api";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import FlashMessage from "../components/FlashMessage";
import {
  Box,
  Heading,
  Button,
  Stack,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const InvoiceForm = () => {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    seller: { _id: "" },
    buyer: { _id: "" },
    issued: "",
    dueDate: "",
    product: "",
    price: "",
    vat: "",
    note: "",
  });

  const [sent, setSent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    apiGet("/api/persons")
      .then((data) => setPersons(data))
      .catch((err) => console.error("Chyba při načítání osob:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transformace dat před odesláním
    const invoiceData = {
      ...invoice,
      price: Number(invoice.price),
      vat: Number(invoice.vat),
    };

    try {
      await apiPost("/api/invoices", invoiceData);
      setSuccess(true);
      // Po úspěšném uložení můžeme přesměrovat
      setTimeout(() => navigate("/invoices"), 2000);
    } catch (err) {
      setSuccess(false);
    }
    setSent(true);
  };

  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>
        Nová faktura
      </Heading>

      {sent && (
        <FlashMessage
          theme={success ? "success" : "danger"}
          text={
            success
              ? "Faktura byla uložena."
              : "Chyba při ukládání faktury."
          }
        />
      )}

      <Box
        as="form"
        onSubmit={handleSubmit}
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="sm"
      >
        <Stack spacing={6}>
          {/* Číslo faktury */}
          <InputField
            type="number"
            name="invoiceNumber"
            label="Číslo faktury"
            prompt="Např. 2025001"
            value={invoice.invoiceNumber}
            required={true}
            min="1"
            handleChange={(e) =>
              setInvoice({ ...invoice, invoiceNumber: e.target.value })
            }
          />

          {/* Prodávající a Kupující */}
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
            <GridItem>
              <InputSelect
                name="seller"
                label="Prodávající"
                value={invoice.seller._id}
                required={true}
                handleChange={(e) =>
                  setInvoice({ ...invoice, seller: { _id: e.target.value } })
                }
                items={persons}
              />
            </GridItem>
            <GridItem>
              <InputSelect
                name="buyer"
                label="Kupující"
                value={invoice.buyer._id}
                required={true}
                handleChange={(e) =>
                  setInvoice({ ...invoice, buyer: { _id: e.target.value } })
                }
                items={persons}
              />
            </GridItem>
          </Grid>

          {/* Datum vystavení a splatnosti */}
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
            <GridItem>
              <InputField
                type="date"
                name="issued"
                label="Datum vystavení"
                value={invoice.issued}
                required={true}
                handleChange={(e) =>
                  setInvoice({ ...invoice, issued: e.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <InputField
                type="date"
                name="dueDate"
                label="Datum splatnosti"
                value={invoice.dueDate}
                required={true}
                min={invoice.issued}
                handleChange={(e) =>
                  setInvoice({ ...invoice, dueDate: e.target.value })
                }
              />
            </GridItem>
          </Grid>

          {/* Produkt */}
          <InputField
            type="text"
            name="product"
            label="Produkt"
            prompt="Název produktu nebo služby"
            value={invoice.product}
            required={true}
            min="3"
            handleChange={(e) =>
              setInvoice({ ...invoice, product: e.target.value })
            }
          />

          {/* Cena a DPH */}
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
            <GridItem>
              <InputField
                type="number"
                name="price"
                label="Cena (Kč)"
                prompt="0"
                value={invoice.price}
                required={true}
                min="1"
                handleChange={(e) =>
                  setInvoice({ ...invoice, price: e.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <InputField
                type="number"
                name="vat"
                label="DPH (%)"
                prompt="21"
                value={invoice.vat}
                required={true}
                min="0"
                handleChange={(e) =>
                  setInvoice({ ...invoice, vat: e.target.value })
                }
              />
            </GridItem>
          </Grid>

          {/* Poznámka */}
          <InputField
            type="textarea"
            name="note"
            label="Poznámka"
            prompt="Volitelná poznámka k faktuře"
            rows={4}
            value={invoice.note}
            handleChange={(e) =>
              setInvoice({ ...invoice, note: e.target.value })
            }
          />

          {/* Tlačítka */}
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button type="submit" colorScheme="blue" size="lg">
              Uložit fakturu
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate("/invoices")}
            >
              Zrušit
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default InvoiceForm;