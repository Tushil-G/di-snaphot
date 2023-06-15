import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { apiKey } from "../api/config";

export const PhotoContext = createContext();

const PhotoContextProvider = (props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const runSearch = (query) => {
    setLoading(true); // Set loading state to true before making the request
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        setImages(response.data.photos.photo);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Encountered an error with fetching and parsing data", error);
        setLoading(false); // Set loading to false on error as well
      });
  };
  

  useEffect(() => {
    runSearch("mountain"); // Fetch initial images when the component mounts
  }, []);

  return (
    <PhotoContext.Provider value={{ images, loading, runSearch }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
