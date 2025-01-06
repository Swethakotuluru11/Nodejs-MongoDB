const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your_secret_key';
 
mongoose.set('strictQuery', false);
 
const uri = "mongodb://localhost:27017";
mongoose.connect(uri, { 'dbName': 'userDashboard' });
 
const User = mongoose.model('User', { username: String, email: String, password: String });
const Post = mongoose.model('Post', { userId: mongoose.Schema.Types.ObjectId, text: String });
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: SECRET_KEY, resave: false, saveUninitialized: true, cookie: { secure: false } }));
 
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views folder for EJS templates
 
function authenticateJWT(req, res, next) {
  const token = req.session.token;
 
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
 
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
 
function requireAuth(req, res, next) {
  const token = req.session.token;
 
  if (!token) return res.redirect('/login');
 
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.redirect('/login');
  }
}
 
// Routes to render EJS templates
app.get('/', (req, res) => res.render('index', { username: req.user ? req.user.username : null }));
 
app.get('/register', (req, res) => res.render('register'));
 
app.get('/login', (req, res) => res.render('login'));
 
app.get('/index', requireAuth, (req, res) => {
  // Access the username from the query string if it exists
  const username = req.query.username || req.user.username;
  res.render('index', { username });
});
 
 
app.get('/post', requireAuth, (req, res) => res.render('post'));
 
app.get('/posts', authenticateJWT, (req, res) => {
  const userId = req.user.userId;  // Extract userId from the authenticated user
 
  Post.find({ userId: userId }) // Fetch posts only for this user
    .then(posts => {
      if (posts.length === 0) {
        return res.status(404).json({ message: 'No posts found for this user' });
      }
      res.json({ posts });  // Send back the user's posts
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error fetching posts' });
    });
});
 
 
app.get('/posts/:postId', authenticateJWT, (req, res) => {
  const postId = req.params.postId;
 
  // Check if postId is a valid ObjectId (if you're using ObjectId in MongoDB)
  if (!ObjectId.isValid(postId)) {
    return res.status(400).json({ message: 'Invalid post ID format' });
  }
 
  // Fetch the post from the database
  Post.findById(postId)
    .then(post => {
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);  // Send the post as JSON
    })
    .catch(error => {
      res.status(500).json({ message: 'Error fetching post', error });
    });
});
//register
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
 
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
 
    if (existingUser)
    return res.redirect(`/register?error=Error: Invalid credentials`);
 
    const newUser = new User({ username, email, password });
    await newUser.save();
 
    // Create a JWT token and store it in the session
    const token = jwt.sign({ userId: newUser._id, username: newUser.username }, SECRET_KEY, { expiresIn: '1h' });
    req.session.token = token;
 
    // Redirect to the index page with the username after successful registration
    res.redirect('/index');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
 
 
// Login user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
 
   try {
    // Find the user based on username (ideally, password should be hashed)
    const user = await User.findOne({ username });
 
    if (!user || user.password !== password) {
      // If invalid credentials, redirect back to login with error message
      //return res.redirect(`/login?error=Incorrect username and password`);
      console.log("error message");
      const errorMessage = "Incorrect username and password";
     return res.render('login',{error:errorMessage} );
    }
 
    // Generate the token
    const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    console.log(token);  // Log the generated token for debugging
 
    // Store the token in session for session-based authentication (optional)
    req.session.token = token;
 
    // For Postman: Return the token as a response
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json({ token });  // Send the token as JSON
    }
 
    // For Browser: Redirect to the index page 
    res.redirect('/index');
     // Optionally, you could send the token in a cookie instead
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

 
 
// Create post
app.post('/post', authenticateJWT, (req, res) => {
  const { text } = req.body;
 
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ message: 'Please provide valid post content' });
  }
 
  const newPost = new Post({ userId: req.user.userId, text });
 
  newPost.save()
    .then(post => {
      res.status(201).json({ message: 'Post created successfully', postId: post._id });
    })
    .catch(err => res.status(500).json({ message: 'Error saving post' }));
});
// Update post
app.put('/posts/:postId', authenticateJWT, (req, res) => {
  const postId = req.params.postId;
  const { text } = req.body;
 
  Post.findOneAndUpdate({ _id: postId, userId: req.user.userId }, { text }, { new: true })
    .then(updatedPost => {
      if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
      res.json({ message: 'Post updated successfully', updatedPost });
    })
    .catch(() => res.status(500).json({ message: 'Error updating post' }));
});
// Delete post
app.delete('/posts/:postId', authenticateJWT, (req, res) => {
  const postId = req.params.postId;
 
  Post.findOneAndDelete({ _id: postId, userId: req.user.userId })
    .then(deletedPost => {
      if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
      res.json({ message: 'Post deleted successfully', deletedPost });
    })
    .catch(() => res.status(500).json({ message: 'Error deleting post' }));
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error(err);
    res.redirect('/login');
  });
});
app.get('/login', (req, res) => {
  const errorMessage = req.session.error;  // Get the error message from session
  delete req.session.error;  // Clear the error message from session

  res.render('login', { error: " "});  // Pass the error message to your view
});
//  app.get('/login', (req, res) => {
//   const error = req.query.error || null;
//   console.log('Error value:', error);  // Debugging line
//   res.render('login', { error: error });
// });

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));