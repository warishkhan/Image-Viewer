import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/component/Home";
import SingleView from "./src/component/SingleView";
import { AppProvider } from "./src/component/context";

export default function App() {
  //Native Stack Navigator. Native Stack Navigator provides a way for your app to transition between screens where each new screen is placed on top of a stack.
  const Stack = createNativeStackNavigator();
  return (

    //Provider is the container for all React Spectrum applications. It defines the theme, locale, and other application level settings, and can also be used to provide common properties to a group of components.
    <NavigationContainer>
      <AppProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{
              headerShown: false,
            }}
          >
            {() => <Home itemsPerPage={10} />}
          </Stack.Screen>
          <Stack.Screen name="SingleView" component={SingleView} />
        </Stack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
}
