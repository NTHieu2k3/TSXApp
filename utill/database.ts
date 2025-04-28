import * as SQLite from "expo-sqlite";
import { Note } from "../Models/Note";

export async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
  try {
    const db = await SQLite.openDatabaseAsync("note.db");
    return db;
  } catch (error: any) {
    throw new Error(`Lỗi: ${error}`);
  }
}

export async function init() {
  const db = await openDatabase();
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS notes(
        id text primary key not null,
        title text not null,
        content text not null,
        createdAt text not null)`
    );
    return Promise.resolve();
  } catch (error: any) {
    return Promise.reject(
      new Error(`Không thể tạo database ! ${error.message}`)
    );
  }
}

export async function insertNote(note: Note): Promise<void> {
  const db = await openDatabase();
  try {
    await db.runAsync(
      `Insert into notes (id, title, content, createdAt) values (?, ?, ?, ?)`,
      [note.id, note.title, note.content, note.createdAt]
    );
    return Promise.resolve();
  } catch (error: any) {
    return Promise.reject(
      new Error(`Không thể tạo database ! ${error.message}`)
    );
  }
}

export async function getAllNote() {
  const db = await openDatabase();
  try {
    const result = await db.getAllAsync<Note>("Select * from notes");
    return result;
  } catch (error: any) {
    return Promise.reject(
      new Error(`Không thể lấy dữ liệu Notes ! ${error.message}`)
    );
  }
}

export async function deleteNote(id: string) {
  const db = await openDatabase();
  try {
    await db.runAsync(`delete from notes where id = ? `, [id]);
    return Promise.resolve();
  } catch (error: any) {
    return Promise.reject(
      new Error(`Không thể lấy dữ liệu Notes ! ${error.message}`)
    );
  }
}
