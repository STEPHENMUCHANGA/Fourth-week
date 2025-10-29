require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const passport = require('passport');
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // local Vite dev server
  'https://fourth-week.onrender.com/api', // your live frontend on Vercel
];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (like mobile apps or curl)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         console.log('❌ CORS blocked for origin:', origin);
//         return callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//   })
// );
// Temporary: Allow all origins for testing
app.use(
  cors({
    origin: "*", // ✅ Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);
// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const lessonRoutes = require('./routes/lessons');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);

// Serve uploads (if used)
app.use(
  '/uploads',
  express.static(path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads'))
);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err.message);
    process.exit(1);
  });
