import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { init } from "./utill/database";
import { Colors } from "./Components/UI/Colors";

import AllNote from "./Screens/AllNote";
import AddNote from "./Screens/AddNote";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [dbIntialized, setDbIntialized] = useState(false);

  useEffect(() => {
    async function startup() {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Thông báo", "Bạn cần cấp quyền để nhận Notification!");
        }

        await init();
        setDbIntialized(true);
      } catch (error) {
        Alert.alert("Cảnh báo", `Không thể tạo db ! Lỗi: ${error}`);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    startup();

    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification");
        console.log(notification.request.content.data.id);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification Response");
        console.log(response.notification.request.content.data.id);
      }
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbIntialized) {
      await SplashScreen.hideAsync();
    }
  }, [dbIntialized]);

  if (!dbIntialized) {
    return null;
  }
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.p4,
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="AllNote"
            component={AllNote}
            options={{
              headerTitle: "All Notes",
            }}
          />
          <Stack.Screen
            name="AddNote"
            component={AddNote}
            options={{
              headerTitle: "Add New Note",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
