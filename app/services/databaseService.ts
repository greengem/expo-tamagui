import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('finance_tracker.db');

// Initialize the database by creating the purchases table
export const initDB = (): Promise<void> => {
    return new Promise((resolve, reject) => {
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
        reject(error);
      }, () => {
        console.log("Database initialized successfully");
        resolve();
      });
    });
  };

// Add a new purchase
export const addPurchase = (amount: number, category: string, date: string, note?: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO purchases (amount, category, date, note) VALUES (?, ?, ?, ?);`,
          [amount, category, date, note || null],
          () => resolve(),
          (_, error) => {
            console.error("Error adding purchase:", error);
            reject(error);
            return false;
          }
        );
      });
    });
  };
  

// Fetch all purchases
export const fetchPurchases = (): Promise<{ id: number; amount: number; category: string; date: string; note?: string; }[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM purchases;`,
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => {
          console.error("Error fetching purchases:", error);
          reject(error);
          return false;
        }
      );
    });
  });
};
