import apiClient from "../services/api-service";

import { useEffect, useState } from "react";

const GetAllProducts = (endpoint, deps = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    apiClient
      .get(endpoint)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, deps);

  return { data, error, loading };
};

export default GetAllProducts;
