import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

export function InputSelect(props) {
  const required = props.required || false;

  return (
    <FormControl isRequired={required}>
      <FormLabel>{props.label}</FormLabel>
      <Select
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        placeholder="Vyberte..."
      >
        {props.items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

export default InputSelect;