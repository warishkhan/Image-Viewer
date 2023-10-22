import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { createClient } from "pexels";

const SingleView = ({ route }) => {

  //Read the params in your screen component.
  const id = route.params.id;
  const client = createClient(
    "Oz2lKNSmOliqg3gtZIdyZ8aKpHK25YR34svkpXvHPcRsvc5rs0kGoh4x"
  );
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getImages = async () => {
    setIsLoading(true);
    try {
      let response = await client.photos.show({ id: id });
      setItem(response);
      setIsLoading(false);
    } catch (error) {
      console.log({ error: "data not found" });
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  if (isLoading) {
    return (
      <Text
        style={{
          textAlign: "center",
          marginTop: 300,
          fontWeight: "bold",
          fontSize: 30,
          opacity: 0.7,
          color: "brown",
        }}
      >
        {" "}
        Image Loading please wait...
      </Text>
    );
  }

  return (
    <View>
      <Image
        source={{ uri: item.src.small }}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </View>
  );
};

export default SingleView;
