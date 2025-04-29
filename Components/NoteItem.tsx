import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "./UI/Colors";
import { Note } from "../Models/Note";
import React from "react";
interface NoteItemProps {
  readonly note: Note;
  readonly onPress: (id: string) => void;
}

function NoteItem({ note, onPress }: NoteItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onLongPress={() => onPress(note.id)}
    >
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
      <Text style={styles.date}>{note.createdAt}</Text>
    </Pressable>
  );
}

export default NoteItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.p1,
    borderColor: Colors.p2,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  pressed: {
    opacity: 0.75,
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
  },

  content: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },

  date: {
    fontSize: 14,
    color: "#888",
    textAlign: "right",
  },
});
