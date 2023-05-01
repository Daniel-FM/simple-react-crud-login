import { AuthService } from "src/service/AuthService";
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Header } from "src/components/Header";
import { CrudArea } from "src/components/CrudArea";

export const Home = () => {
  const [loggedClient, setLoggedClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusCode, setStatusCode] = useState(200);

  useEffect(() => {
    const checkLoggedIn = async() => {
      console.log("Checking if client is logged in...");
      try {
        const client = await AuthService.getLoggedInClient();
        setLoggedClient(client);
      } catch(e) {
        setStatusCode(e.toJSON().status);
        console.log("Failed to get the client");
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  } else if (statusCode === null){
    return <div>Falha de conexão com a API.</div>
  } else if (loggedClient) {
    return(
      <div className="App">
        <Header/>
        <CrudArea/>
      </div>
    )
  } else {
    console.log(loggedClient);
    return <Navigate to="/login" />
  }
};