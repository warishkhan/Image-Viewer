import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { USER_PER_PAGE } from "../utils/constant";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "./context";

const Items = () => {

  //useNavigation is a hook which gives access to navigation object. It's useful when you cannot pass the navigation prop into the component directly, or don't want to pass it in case of a deeply nested child. useNavigation() returns the navigation prop of the screen it's inside.
  const navigation = useNavigation();

  //The useGlobalContext Hook provides function components access to the context value for a context object.
  const { items, page, query, setQuery } = useGlobalContext();

  const startIndex = (page - 1) * USER_PER_PAGE;
  const selectedUsers = items.slice(startIndex, startIndex + USER_PER_PAGE);

  const Cards = ({ item }) => {
    return (
      <View style={styles.card_container}>
        <TouchableOpacity
          onPress={() => {
            //Pass params to a route by putting them in an object as a second parameter to the navigation. navigate function: this. props. navigation. navigate('RouteName', { /* params go here */ })
            navigation.navigate("SingleView", { id: item.id, item });
          }}
          style={{ flex: 1 }}
        >
          <Image
            source={{ uri: item.src.small }}
            style={{ width: 190, height: 100 }}
          />
          <Text style={styles.photo_text}>{item.alt}</Text>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text_header}>Image Viewer</Text>
        <View style={styles.text_container}>
          <TextInput
            style={styles.text_input}
            placeholder="Search images here..."
            value={query}
            onChangeText={(text) => setQuery(text)}
          />
        </View>
        { query ? (
          <ScrollView>
            <View style={styles.card_main_container}>
              {selectedUsers.map((item, index) => (
                <Cards key={index} item={item} />
              ))}
            </View>
          </ScrollView>
        ) : (
          <>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 530,
                width: "100%",
              }}
            >
              <Text style={{fontSize:30,fontWeight:"bold",opacity:.5,color:"brown"}}>OOPs! Image Not found</Text>
            </View>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text_header: {
    fontSize: 45,
    fontWeight: "bold",
    width: "100%",
    backgroundColor: "#fff",
    textAlign: "center",
    paddingTop: 35,
    paddingBottom: 10,
    marginBottom: 10,
    borderWidth: 0,
    color: "purple",
    textShadowColor: "skyblue",
    textShadowRadius: 6,
  },
  text_container: {
    width: "95%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    elevation: 5,
    overflow: "hidden",
  },
  text_input: {
    width: 250,
    textAlign: "center",
    padding: 2,
    fontSize: 20,
    opacity: 0.5,
  },
  card_main_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
  },
  card_container: {
    width: 190,
    height: 170,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 5.5,
    backgroundColor: "#fff",
    shadowColor: "blue",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    elevation: 8,
    overflow: "hidden",
    shadowRadius: 5,
    borderWidth: 0,
  },
  photo_text: {
    padding: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: 13,
    opacity: 0.7,
  },
});

export default Items;
