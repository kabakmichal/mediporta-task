// TableContainer.stories.js
import React from "react";
import TableResults from "./TableResults"; // Importujesz komponent TableResults
import { TableContainer, Paper } from "@mui/material"; // Importujesz TableContainer z Material-UI

export default {
  title: "TableContainer",
  component: TableContainer,
};

const Template = (args) => (
  <TableContainer component={Paper}>
    <TableResults {...args} />{" "}
    {/* Tutaj używasz TableResults jako dzieci TableContainer */}
  </TableContainer>
);

export const Basic = Template.bind({});
Basic.args = {
  data: [
    /* przekaż dane */
  ],
  elementsPerPage: 10, // Przykładowa liczba elementów na stronę
  setElementsPerPage: () => {}, // Przykładowa funkcja ustawiająca liczbę elementów na stronę
};
