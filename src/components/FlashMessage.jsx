import React from "react";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

export function FlashMessage(props) {
  const status = props.theme === "success" ? "success" : "error";

  return (
    <Alert status={status} mb={4} borderRadius="md">
      <AlertIcon />
      <AlertDescription>{props.text}</AlertDescription>
    </Alert>
  );
}

export default FlashMessage;