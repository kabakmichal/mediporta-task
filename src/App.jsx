import "./App.css";
import TableResults from "./components/TableResults/TableResults.jsx";
import { useState, useEffect } from "react";

function App() {
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
    <>
      <TableResults
        data={data}
        elementsPerPage={elementsPerPage}
        setElementsPerPage={setElementsPerPage}
      />
    </>
  );
}

export default App;
