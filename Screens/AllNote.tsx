import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";

type StackParamList = {
  AllNote: undefined;
  AddNote: undefined;
};

type NavigationProp = NativeStackNavigationProp<StackParamList>;

function AllNote() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View>
      <Text>All Note Screen</Text>
      <Button title="Thêm" onPress={() => navigation.navigate("AddNote")} />
    </View>
  );
}

export default AllNote;
