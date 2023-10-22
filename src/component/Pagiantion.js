import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useGlobalContext } from "./context";

const Pagiantion = () => {

  //The useGlobalContext Hook provides function components access to the context value for a context object.
  const { totalPages, handleClick } = useGlobalContext();

  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <View style={styles.pagination_container}>
      {pages.map((num) => {
        return (
          //A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it. Opacity is controlled by wrapping the children in an Animated.
          <TouchableOpacity onPress={() => handleClick(num)} key={num}>
            <Text style={styles.num_container}>{num}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination_container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    padding: 5,
  },
  num_container: {
    width: 60,
    textAlign: "center",
    borderRadius: 5,
    margin: 3,
    fontWeight: "bold",
    backgroundColor: "skyblue",
    color: "white",
  },
});

export default Pagiantion;
