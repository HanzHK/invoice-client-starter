/*
  Zobrazí čitelný název země podle mapy CountryLabels. Místo default ve formátu CZECHIA
*/
import React from "react";
import CountryLabels from "../../utils/CountryLabels";

const CountryDisplay = ({ value }) => {
  return <span>{CountryLabels[value] || value}</span>;
};

export default CountryDisplay;
