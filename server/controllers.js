const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Blusnrk@2',
  database: 'rate_politician',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to execute SQL queries
async function executeQuery(query, params = []) {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(query, params);
    return results;
  } finally {
    connection.release();
  }
}

// Register User
const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { first_name, last_name, username, email_address, password } = req.body._value;
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user details into the database
    const query = 'INSERT INTO users (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)';
    await executeQuery(query, [first_name, last_name, username, email_address, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error:' + error.sqlMessage });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { user_name, password } = req.body._value;

    // Check if the user exists in the database
    const query = 'SELECT * FROM users WHERE username = ?';
    const [user] = await executeQuery(query, [user_name]);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ user_id: user.id }, 'your_secret_key', { expiresIn: '1h' });
    const username = user.username;
    res.status(200).json({ token, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add Politician
const addPolitician = async (req, res) => {
  //console.log(req.body);
  try {
    const { first_name, last_name, political_affiliation, position, brief_bio } = req.body;

    //console.log(req);
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const image = req.file;

    // Insert politician details into the database

    const query = 'INSERT INTO politicians (first_name,last_name, political_affiliation, position, bio,image_url) VALUES (?, ?, ?, ?, ?,?)';
    await executeQuery(query, [first_name, last_name, political_affiliation, position, brief_bio, image.filename]);
    res.status(201).json({ message: 'Politician added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get All Politicians
const getPoliticians = async (req, res) => {
  try {
    // Retrieve all politicians from the database
    const query = 'SELECT * FROM politicians';
    const politicians = await executeQuery(query);

    res.status(200).json(politicians);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Search Politicians
const searchPoliticians = async (req, res) => {
  try {
    const { query } = req.query;

    // Search politicians in the database based on the provided query
    const searchQuery = 'SELECT * FROM politicians WHERE first_name LIKE ? or last_name LIKE ?';
    const searchResults = await executeQuery(searchQuery, [`%${query}%`, `%${query}%`]);

    res.status(200).json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const politicianProfile = async (req, res) => {
  try {
    const politicianId = req.params.id;
    // Retrieve politician details from the database based on the provided ID
    const query = 'SELECT * FROM politicians WHERE id = ?';
    const [politician] = await executeQuery(query, [politicianId]);

    if (!politician) {
      return res.status(404).json({ message: 'Politician not found' });
    }

    res.status(200).json(politician);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Rate Politician
const ratePolitician = async (req, res) => {
  try {
    const { politicianId, rating, review } = req.body;

    // Extract user ID from the JWT token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const userId = decodedToken.user_id;

    // Insert the rating and review into the politician_ratings table
    const query = 'INSERT INTO politician_ratings (politician_id, user_id, rating, review) VALUES (?, ?, ?, ?)';
    await executeQuery(query, [politicianId, userId, rating, review]);

    // Calculate the new average rating for the politician
    const avgRatingQuery = 'SELECT AVG(rating) AS avgRating FROM politician_ratings WHERE politician_id = ?';
    const [result] = await executeQuery(avgRatingQuery, [politicianId]);
    console.log(result);
    const newRating = result.avgRating;
    const updateQuery = 'UPDATE politicians SET average_rating = ? WHERE id = ?';
    await executeQuery(updateQuery, [newRating, politicianId]);

    res.status(200).json({ message: 'Rating and review submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Reviews of politicians
const politicianReviews = async (req, res) => {
  try {
    const politicianId = req.params.id;
    // Retrieve politician details from the database based on the provided ID
    const query = "SELECT pr.rating, "+
                      "pr.review, "+
                      "CONCAT(u.first_name,' ',u.last_name) AS full_name,"+
                      "u.username "+
                  "FROM politician_ratings pr "+
                  "JOIN users u ON pr.user_id = u.id "+
                  "WHERE pr.politician_id = ?";

    const reviews = await executeQuery(query, [politicianId]);

    if (!reviews) {
      return res.status(404).json({ message: 'Reviews not found' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { registerUser, loginUser, addPolitician, getPoliticians, searchPoliticians, politicianProfile, ratePolitician };
