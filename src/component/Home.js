import React from "react";
import { ScrollView, View } from "react-native";
import Items from "./Items";
import Pagiantion from "./Pagiantion";
import { useGlobalContext } from "./context";

const Home = () => {
  const{query}= useGlobalContext()
  return (
    //The ScrollView is a generic scrolling container that can contain multiple components and views. The scrollable items can be heterogeneous, and you can scroll both vertically and horizontally (by setting the horizontal property).
    <ScrollView>
      <View style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
        <Items />
        {query?
        <Pagiantion />: ""}
      </View>
    </ScrollView>
  );
};

export default Home;
