import { connectDB } from '../config/db';

const createTables = async () => {
  const connection = await connectDB();

  try {
    // Create cake_categories table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS cake_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL
      )
    `);

    // Create cakes table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS cakes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2),
        image VARCHAR(255),
        category_id INT,
        FOREIGN KEY (category_id) REFERENCES cake_categories(id)
      )
    `);

    console.log('Tables created or already exist');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await connection.end();
  }
};

createTables().catch(console.error); 