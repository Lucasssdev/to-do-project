import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../app/main";
import Search from "../app/search";
import { StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { themas } from "../global/themes";

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} />
      <Tab.Navigator
        screenOptions={({ route }) => {
          const iconName =
            route.name === "MyList"
              ? "list-outline"
              : route.name === "Search" // condições para definir o icon de cada pagina
              ? "search-outline"
              : "bug-outline";

          return {
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={iconName} size={size} color={color} />
            ),
            tabBarActiveTintColor: themas.colors.red,
            tabBarInactiveTintColor: themas.colors.lightGray,
            headerTintColor: themas.colors.red, // style para o title da pagina e a navegação das paginas
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerLeft: () => (
              <Ionicons
                name="checkmark-circle-outline"
                color={themas.colors.red}
                style={{
                  marginLeft: 135,
                  fontSize: 25,
                }}
              />
            ),
          };
        }}
      >
        <Tab.Screen name="MyList" component={Main} />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
