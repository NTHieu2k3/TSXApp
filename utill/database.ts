import * as SQLite from "expo-sqlite";
import { Note } from "../Models/Note";

let db: SQLite.SQLiteDatabase | null = null;

export async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) {
    return db;
  }
  try {
    db = await SQLite.openDatabaseAsync("note.db");
    return db;
  } catch (error: any) {
    throw new Error(`Lỗi: ${error}`);
  }
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    try {
      await db.closeAsync();
      db = null;
    } catch (error: any) {
      throw new Error(`Không thể đóng database! ${error.message}`);
    }
  }
}

export async function init(): Promise<void> {
  await openDatabase();
  if (!db) throw new Error("Database chưa mở!");

  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS notes(
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL
      )
    `);
  } catch (error: any) {
    throw new Error(`Không thể tạo database! ${error.message}`);
  } finally {
    await closeDatabase();
  }
}

export async function insertNote(note: Note): Promise<void> {
  await openDatabase();
  if (!db) throw new Error("Database chưa mở!");

  try {
    await db.runAsync(
      `INSERT INTO notes (id, title, content, createdAt) VALUES (?, ?, ?, ?)`,
      [note.id, note.title, note.content, note.createdAt]
    );
  } catch (error: any) {
    throw new Error(`Không thể thêm note! ${error.message}`);
  } finally {
    await closeDatabase();
  }
}

export async function getAllNote(): Promise<Note[]> {
  await openDatabase();
  if (!db) throw new Error("Database chưa mở!");

  try {
    const result = await db.getAllAsync<Note>("SELECT * FROM notes");
    return result;
  } catch (error: any) {
    throw new Error(`Không thể lấy dữ liệu Notes! ${error.message}`);
  } finally {
    await closeDatabase();
  }
}

export async function deleteNote(id: string): Promise<void> {
  await openDatabase();
  if (!db) throw new Error("Database chưa mở!");

  try {
    await db.runAsync(`DELETE FROM notes WHERE id = ?`, [id]);
  } catch (error: any) {
    throw new Error(`Không thể xóa note! ${error.message}`);
  }
}
