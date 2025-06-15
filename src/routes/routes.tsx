import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../app/main";
import Analytics from "../components/analytics";
import { StatusBar, Image, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { themas } from "../global/themes";

const Tab = createBottomTabNavigator();

// Componente de cabeçalho personalizado com apenas a logo
const LogoHeader = () => {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Image
        source={require("../assets/logo1.png")}
        style={{
          width: 80,
          height: 80,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

export default function Routes() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} />
      <Tab.Navigator
        screenOptions={({ route }) => {
          const iconName =
            route.name === "MyList"
              ? "list-outline"
              : route.name === "Analytics"
              ? "bar-chart-outline"
              : "bug-outline";

          return {
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={iconName} size={size} color={color} />
            ),
            tabBarActiveTintColor: themas.colors.red,
            tabBarInactiveTintColor: themas.colors.lightGray,
            headerTintColor: themas.colors.red,
            // Remover o título padrão
            headerTitle: () => <LogoHeader />,
            // Remover o ícone à esquerda
            headerLeft: () => null,
            // Centralizar tudo
            headerTitleAlign: "center",
          };
        }}
      >
        <Tab.Screen
          name="MyList"
          component={Main}
          options={{
            // Manter o texto na barra de tabs inferior
            tabBarLabel: "MyList",
            // Ocultar o título no cabeçalho e mostrar apenas a logo
            headerTitle: () => <LogoHeader />,
          }}
        />
        <Tab.Screen
          name="Analytics"
          component={Analytics}
          options={{
            // Manter o texto "Análise" na barra de tabs inferior
            tabBarLabel: "Análise",
            // Ocultar o título no cabeçalho e mostrar apenas a logo
            headerTitle: () => <LogoHeader />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
