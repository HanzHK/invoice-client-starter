import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";

export function InputField(props) {
  const INPUTS = ["text", "number", "date"];
  const type = props.type.toLowerCase();
  const isTextarea = type === "textarea";
  const required = props.required || false;

  if (!isTextarea && !INPUTS.includes(type)) {
    return null;
  }

  const minProp = props.min || null;
  const min = ["number", "date"].includes(type) ? minProp : null;
  const minlength = ["text", "textarea"].includes(type) ? minProp : null;

  return (
    <FormControl isRequired={required}>
      <FormLabel>{props.label}</FormLabel>
      {isTextarea ? (
        <Textarea
          placeholder={props.prompt}
          rows={props.rows}
          minLength={minlength}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
        />
      ) : (
        <Input
          type={type}
          placeholder={props.prompt}
          minLength={minlength}
          min={min}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
        />
      )}
    </FormControl>
  );
}

export default InputField;