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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to database');

  // Creating the connection to the db
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite')
  const objectStore = tx.objectStore('jate');
  
  // Adding the request to the content.
  const request = objectStore.put({ id: 1, value: content });

  // Getting confirmation for the request.
  const result = await request;
  console.log('Successfully saved to database 🚀', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from database');

  // Creating the connection to the db
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const objectStore = tx.objectStore('jate');

  // Getting data from database
  const request = objectStore.get(1);

  // Get confirmation of the request.
  const result = await request;
  // Ternary operator
  result
  // If result is true, data is retrieved
    ? console.log('Data retrieved from database', result.value)
    // If not, data not found on database
    : console.log('Data not found in database')
  // If result is defined, then itr will be returned. If not, nothings happens
  return result?.value;
};

initdb();
