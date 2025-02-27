import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'b8k90vhjfharwtwf2epj-mysql.services.clever-cloud.com', // Update with your database host
  user: 'uowgrrtmx0mqzkji', // Update with your database username
  password: '54qhkNpLu6M1BxWRP1r6', // Update with your database password
  database: 'b8k90vhjfharwtwf2epj' // Update with your database name
};

export const connectDB = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    throw error;
  }
}; 