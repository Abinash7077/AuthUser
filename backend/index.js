const express = require('express');
const multer = require('multer');
const csv = require('csv-writer').createObjectCsvWriter;
const mysql = require('mysql2');
const cors=require('cors')
const path=require('path')


const app = express();
app.use(express.json())
app.use(cors())
const port = 3000;

// MySQL database configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud'
});



//multer2
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/backend/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });


// Route to create a new user
app.post('/users', upload.single('profile_pic'), (req, res) => {
  const { name, email, gender, phone, password } = req.body;
  const profilePicPath = req.file ? req.file.path : 'logo192.png'; // Use default avatar if no file is uploaded

  const user = {
    name,
    email,
    gender,
    phone,
    password,
    profile_pic: profilePicPath,
    status: 'pending',
    date: new Date(),
  };

  const query = 'INSERT INTO users SET ?';
  connection.query(query, user, (err, result) => {
    if (err) {
      console.log('Error creating user:', err);
      res.status(500).send('Failed to create user');
      return;
    }

    console.log('User created:', result);
   /*  res.status(200).send('User created successfully'); */
    res.status(200).send({
      name:req.body.name
    })

  });
});
// Route to create a new user
/* app.post('/users', (req, res) => {
    const { name, email, gender, phone, password, } = req.body;
    const profile_pic = req.file ? req.file.filename : '/';
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
    const query = 'INSERT INTO users (name, email, gender, phone, password, date) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [name, email, gender, phone, password, date], (err, result) => {
      if (err) {
        console.log('Error registering user:', err);
        res.status(500).send('Failed to register user');
        return;
      }
  
      res.status(201).send('User registered successfully');
    });
  }); */

  //login status

  


  //login
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (err, result) => {
      if (err) {
        console.log('Error logging in:', err);
        res.status(500).send('Failed to log in');
        return;
      }
  
      if (result.length === 0) {
        res.status(404).send('User not found');
        return;
      }
  
      const user = result[0];
  
      if (user.password !== password) {
        res.status(401).send('Incorrect password');
        return;
      }
  
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        status: "Activate",
      });
     
    });
  });




// Route to get user status
app.get('/users/status/:userId', (req, res) => {
  const { userId } = req.params;

  const query = `SELECT status FROM users WHERE id = ?;`;

  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get user status!' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'User not found!' });
    } else {
      const status = results[0].status;

      let message;
      if (status === 'pending') {
        message = 'Your account is pending activation.';
      } else if (status === 'active') {
        message = 'Your account is active.';
      } else if (status === 'de-active') {
        message = 'Your account is deactivated.';
      }

      res.json({ message });
    }
  });
});

// Route to update user profile
app.put('/users/:userId', upload.single('profile_pic'), (req, res) => {
  const { userId } = req.params;
  const { name, email, gender, phone } = req.body;
  const profile_pic = req.file ? req.file.filename : null;

  const query = `UPDATE users 
    SET name = ?, email = ?, gender = ?, phone = ?, profile_pic = ? 
    WHERE id = ?;`;

  connection.query(
    query,
    [name, email, gender, phone, profile_pic, userId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update user profile!' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: 'User not found!' });
      } else {
        res.json({ message: 'User profile updated successfully!' });
      }
    }
  );
});

// Route to change user password
app.put('/users/:userId/password', (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;

  const query = `UPDATE users SET password = ? WHERE id = ?;`;

  connection.query(query, [password, userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to change user password!' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'User not found!' });
    } else {
      res.json({ message: 'User password changed successfully!' });
    }
  });
});

// Route to delete user account
app.delete('/users/:userId', (req, res) => {
  const { userId } = req.params;

  const query = `DELETE FROM users WHERE id = ?;`;

  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete user account!' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'User not found!' });
    } else {
      res.json({ message: 'User account deleted successfully!' });
    }
  });
});

// Route to display all registered users with pagination, sorting, and searching
/*  app.get('/users', (req, res) => {
  const { page = 1, limit = 10, sort = 'id', search = '' } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const countQuery = `SELECT COUNT(*) AS total FROM users WHERE name LIKE ?;`;

  connection.query(countQuery, [`%${search}%`], (error, countResult) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch user count!' });
    } else {
      const total = countResult[0].total;

      const query = `SELECT * FROM users WHERE name LIKE ? ORDER BY ${sort} LIMIT ?, ?;`;

      connection.query(
        query,
        [`%${search}%`, startIndex, limit],
        (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch users!' });
          } else {
            res.json({ users: results, total });
          }
        }
      );
    }
  });
}); 
  */

app.get('/users', (req, res) => {
  const { page = 1, limit = 10, sortField = 'id', sortOrder = 'asc', search = '' } = req.query;
  const offset = (page - 1) * limit;

  const countQuery = 'SELECT COUNT(*) as total FROM users ';
  connection.query(countQuery, [`%${search}%`], (err, countResult) => {
    if (err) {
      console.log('Error retrieving user count:', err);
      res.status(500).send('Failed to retrieve user count');
      return;
    }

    const total = countResult[0].total;

    const query = 'SELECT * FROM users';
    connection.query(query, [`%${search}%`, sortField, sortOrder, limit, offset], (err, result) => {
      if (err) {
        console.log('Error retrieving users:', err);
        res.status(500).send('Failed to retrieve users');
        return;
      }

      res.status(200).json({
        data: result,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      });
    });
  });
});

// Route to download users as CSV
app.get('/users/download', (req, res) => {
  const query = `SELECT * FROM users;`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch users for download!' });
    } else {
      const csvWriter = csv({
        path: 'users.csv',
        header: [
          { id: 'id', title: 'ID' },
          { id: 'name', title: 'Name' },
          { id: 'email', title: 'Email' },
          { id: 'gender', title: 'Gender' },
          { id: 'phone', title: 'Phone' },
          { id: 'status', title: 'Status' },
          { id: 'date', title: 'Date' },
          { id: 'profile_pic', title: 'Profile Picture' }
        ]
      });

      csvWriter
        .writeRecords(results)
        .then(() => {
          res.download('users.csv');
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Error generating CSV file!' });
        });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
