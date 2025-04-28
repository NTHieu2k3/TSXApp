import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "./UI/Colors";
import { Note } from "../Models/Note";

interface NoteItemProps {
  readonly note: Note;
  readonly onPress: (id: string) => void;
}

function NoteItem({ note, onPress }: NoteItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={() => onPress(note.id)}
    >
      <View>
        <Text>{note.id}</Text>
        <Text>{note.title}</Text>
        <Text>{note.content}</Text>
        <Text>{note.createdAt}</Text>
      </View>
    </Pressable>
  );
}

export default NoteItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.p1,
    borderColor: Colors.p2,
    borderWidth: 1,
    borderRadius: 20,
  },

  pressed: {
    opacity: 0.7,
  },
});
