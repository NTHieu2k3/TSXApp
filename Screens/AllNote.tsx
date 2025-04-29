import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Note } from "../Models/Note";
import { getAllNote } from "../utill/database";


import NoteList from "../Components/NoteList";

type StackParamList = {
  AllNote: undefined;
  AddNote: undefined;
};

type NavigationProp = NativeStackNavigationProp<StackParamList>;

function AllNote() {
  const [loadedNotes, setLoadedNotes] = useState<Note[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchNote() {
      try {
        const notes = await getAllNote();
        setLoadedNotes(notes);
      } catch (error: any) {
        Alert.alert("Cảnh báo", `Lỗi: ${error.message}`);
      }
    }

    if (isFocused) {
      fetchNote();
    }
  }, [isFocused, loadedNotes]);
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <NoteList notes={loadedNotes} />
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => navigation.navigate("AddNote")}
        >
          <Text style={styles.textButton}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default AllNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  buttonContainer: {
    position: "absolute",
    bottom: 40,
    right: 30,
  },

  button: {
    backgroundColor: "#1047eb",
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  textButton: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },

  pressed: {
    opacity: 0.7,
  },
});
