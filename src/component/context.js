import React, { useContext, useEffect, useState } from "react";

//Please install Pexels npm package to use pexels api.
import { createClient } from "pexels";
import { USER_PER_PAGE } from "../utils/constant";


// Context API allows data to be passed through a component tree without having to pass props manually at every level. This makes it easier to share data between components.

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //Authorization is required for the Pexels API. All requests you make to the API will need to include your key. This is provided by adding an Authorization header.
  const client = createClient(
    "Oz2lKNSmOliqg3gtZIdyZ8aKpHK25YR34svkpXvHPcRsvc5rs0kGoh4x"
  );
//Hooks were added to React in version 16.8. Hooks allow function components to have access to state and other React features.

//useState is a Hook that allows you to have state variables in functional components.
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("Bikes");
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  
  //getImages function is used for fetching data from api.
  const getImages = async (query) => {
    setIsLoading(true);
    try {
      let response = await client.photos.search({ query, per_page: 50 });

      setItems(response.photos);
      setTotalPages(Math.ceil(response.photos.length / USER_PER_PAGE));
      setIsLoading(false);
    } catch (error) {
      console.log({ error: "data not found" });
    }
  };

  //The useEffect Hook allows you to perform side effects in your components. Some examples of side effects are: fetching data, directly updating the DOM, and timers.

  useEffect(() => {
    getImages(query);
  }, [query]);


  //Invoke when user click to request another page.
  const handleClick = (num) => {
    setPage(num);
  };
 
  return (

    //The provider is used to create a context that can be consumed. React uses provider pattern in Context API to share data across the tree descendant nodes.
    <AppContext.Provider
      value={{
        handleClick,
        items,
        page,
        totalPages,
        query,
        setQuery,
        setPage,
        isLoading,
      }}
      // Here, the children prop is of type React. ReactNode, which represents a React node (e.g. an element, text, or fragment). This is a flexible type that allows any type of child to be passed to the PostsContextProvider component.
    >
      {children}
    </AppContext.Provider>
  );
};

//React Context is a way to manage state globally.
//The useContext Hook provides function components access to the context value for a context object.
const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
