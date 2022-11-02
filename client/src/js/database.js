import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

/**
 * Functionalizes gettting readwrite access to the databse.
 * @param {String} dbName - The name of the databse to access
 * @returns {Promise} - Resolves to the database access
 */
const getDBStore = async (dbName) => openDB(dbName,1)
  .then(db => db
    .transaction(dbName,'readwrite')
    .objectStore(dbName));

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await getDBStore('jate');
  await db.put({ id: 1, value: content });
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await getDBStore('jate');
  const result = await db.getAll();
  console.log('db result',result);
  return result?.[0]?.value;
}

initdb();
