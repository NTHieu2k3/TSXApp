import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert } from "react-native";
import { Note } from "../Models/Note";
import { insertNote } from "../utill/database";

import NoteForm from "../Components/NoteForm";


type StackParamList = {
  AllNote: undefined;
};

interface AddNoteProps {
  readonly navigation: NativeStackNavigationProp<StackParamList>;
}

function AddNote({ navigation }: AddNoteProps) {
  async function createNoteHandler(note: Note): Promise<void> {
    try {
      await insertNote(note);
      navigation.reset({
        index: 0,
        routes: [{ name: "AllNote" }],
      });
      Alert.alert("Thông báo", "Thêm thành công !");
    } catch (error: any) {
      Alert.alert("Cảnh báo", `Không thể lưu note ! Lỗi: ${error.message}`);
    }
  }

  return <NoteForm onCreateNote={createNoteHandler} />;
}

export default AddNote;
