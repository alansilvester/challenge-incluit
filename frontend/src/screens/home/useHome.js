import { useEffect, useState } from "react";

const useHome = () => {
  const [dataInicial, setDataInicial] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const loadHome = async () => {
    setIsLoading(true);
    const responseCall = await fetch("http://localhost:4000/api/animals");
    const dataResponse = await responseCall.json();
    if (dataResponse) {
      setDataInicial(dataResponse);
      setIsLoading(false);
      return;
    } else {
      setDataInicial([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHome();
  }, []);

  return { dataInicial, isLoading, loadHome };
};

export default useHome;
