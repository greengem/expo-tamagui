import * as SQLite from 'expo-sqlite';
import { SQLError } from 'expo-sqlite';

const db = SQLite.openDatabase('expense_tracker.db');

// Initialize the database
export const initDB = (callback?: (error?: SQLError) => void): void => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS purchases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        note TEXT
      );`
    );
  }, (error) => {
    console.error("Error initializing database:", error);
    callback?.(error);
    return false;
  }, () => {
    console.log("Database initialized successfully");
    callback?.();
  });
};

// Add a purchase to the database
export const addPurchase = (amount: number, category: string, date: string, note?: string, callback?: (error?: SQLError) => void): void => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO purchases (amount, category, date, note) VALUES (?, ?, ?, ?);`,
      [amount, category, date, note || null],
      () => callback?.(),
      (_, error) => {
        console.error("Error adding purchase:", error);
        callback?.(error);
        return false;
      }
    );
  });
};

// Fetch all purchases from the database
export const fetchPurchases = (callback?: (error?: SQLError, result?: any[]) => void): void => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM purchases;`,
      [],
      (_, { rows: { _array } }) => callback?.(undefined, _array),
      (_, error) => {
        console.error("Error fetching purchases:", error);
        callback?.(error);
        return false;
      }
    );
  });
};
