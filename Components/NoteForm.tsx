import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { Note } from "../Models/Note";

import * as Notifications from "expo-notifications";

interface OnCreateNoteProps {
  readonly onCreateNote: (noteData: Note) => Promise<void>;
}

function NoteForm({ onCreateNote }: OnCreateNoteProps) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  function changeTitle(enteredTitle: string): void {
    setTitle(enteredTitle);
  }
  function changeContent(enteredContent: string): void {
    setContent(enteredContent);
  }

  async function saveNote() {
    if (!title.trim() || !content.trim()) {
      Alert.alert(
        "Cảnh báo",
        "Note chỉ có thể lưu khi bạn điền đầy đủ thông tin!"
      );
      return;
    }

    const id = (Math.random() + Math.random()).toString();
    const now = new Date();
    now.setHours(now.getHours() + 7);
    const createdAt = now.toISOString().split(".")[0].replace("T", " ");

    const note = new Note(id, title, content, createdAt);

    try {
      await onCreateNote(note);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "A new note has been saved",
          body: "Check it again to make sure that it's exactly!",
          data: { id },
        },
        trigger: {
          seconds: 5,
          repeats: false,
          type: "timeInterval",
        } as any,
      });
    } catch (error: any) {
      Alert.alert("Cảnh báo", `Không thể lưu note! Lỗi: ${error.message}`);
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={title}
        onChangeText={changeTitle}
        placeholder="Enter Title"
      />
      <TextInput
        style={styles.textInput}
        value={content}
        onChangeText={changeContent}
        placeholder="What do you want to note ?"
      />

      <Button title="Save" onPress={saveNote} />
    </View>
  );
}

export default NoteForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    width: "80%",
    height: 50,
    padding: 10,
    margin: 10,
    fontSize: 16,
  },
});
