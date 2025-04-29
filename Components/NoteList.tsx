import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Note } from "../Models/Note";
import NoteItem from "./NoteItem";
import { deleteNote } from "../utill/database";

interface NoteListProps {
  readonly notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  async function del(id: string) {
    try {
      await deleteNote(id);
      Alert.alert("Thông báo", "Xóa thành công !");
    } catch (error: any) {
      Alert.alert("Cảnh báo", `Không thể xóa Note này ! Lỗi: ${error.message}`);
    }
  }

  function delNote(id: string) {
    Alert.alert("Xác nhận", "Bạn có muốn xóa không ?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          del(id);
        },
      },
    ]);
  }

  if (!notes || notes.length == 0) {
    return (
      <View>
        <Text style={styles.falbacktext}>
          No notes add yet - Start adding now ?
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={notes}
      renderItem={({ item }) => (
        <NoteItem note={item} onPress={() => delNote(item.id)} />
      )}
    />
  );
}

export default NoteList;

const styles = StyleSheet.create({
  falbacktext: {
    padding: 20,
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
  },
});
