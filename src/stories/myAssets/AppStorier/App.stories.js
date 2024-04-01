// App.stories.js
import React, { useState, useEffect } from "react";
import App from "../../../App.jsx";
import { TableResults } from "../../../components/TableResults/TableResults.jsx";
import { action } from "@storybook/addon-actions";
// import "./App.css"; // Importujemy plik stylów CSS

export default {
  title: "App",
  component: App,
};

const Template = (args) => <App {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithTableResults = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [elementsPerPage, setElementsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow"
        );

        if (!response.ok) {
          throw new Error("Nie udało się pobrać danych");
        }

        const jsonData = await response.json();
        setData(jsonData.items);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <App>
      <div className="storybook-wrapper">
        {" "}
        {/* Dodajemy wrapper, aby zmieniać style */}
        <TableResults
          data={data}
          elementsPerPage={elementsPerPage}
          setElementsPerPage={setElementsPerPage}
        />
      </div>
    </App>
  );
};
