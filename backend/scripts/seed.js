require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // ✅ for password hashing
const User = require('../src/models/User');
const Course = require('../src/models/Course');
const Lesson = require('../src/models/Lesson');

async function seed() {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB for seeding');

    // Optional safety prompt (avoid accidental deletion in prod)
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️ Warning: Running in production mode — this will delete existing data!');
    }

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Lesson.deleteMany({}),
    ]);
    console.log('🧹 Existing collections cleared');

    // Hash passwords securely
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create sample users
    const alice = new User({
      name: 'Alice Instructor',
      email: 'alice@smartlearner.test',
      password: hashedPassword,
      role: 'instructor',
    });

    const bob = new User({
      name: 'Bob Student',
      email: 'bob@smartlearner.test',
      password: hashedPassword,
      role: 'student',
    });

    await alice.save();
    await bob.save();
    console.log('👥 Users seeded');

    // Create sample courses
    const courses = [
      {
        title: 'AI Basics',
        description: 'Introduction to AI concepts and applications.',
        instructor: alice._id,
        tags: ['AI', 'ML'],
      },
      {
        title: 'Web Development',
        description: 'Modern web dev with JavaScript, React, and Node.',
        instructor: alice._id,
        tags: ['Web', 'Frontend'],
      },
      {
        title: 'Agriculture Tech',
        description: 'Applying tech & AI to agriculture.',
        instructor: alice._id,
        tags: ['AgTech'],
      },
    ];

    const createdCourses = await Course.insertMany(courses);
    console.log(`📘 Seeded ${createdCourses.length} courses`);

    // Create sample lessons
    const lessons = [
      {
        course: createdCourses[0]._id,
        title: 'What is AI?',
        content: 'AI definition and history.',
      },
      {
        course: createdCourses[0]._id,
        title: 'Supervised vs Unsupervised Learning',
        content: 'Basic ML paradigms.',
      },
      {
        course: createdCourses[1]._id,
        title: 'Intro to HTML/CSS',
        content: 'Basics of web layout.',
      },
      {
        course: createdCourses[1]._id,
        title: 'React Fundamentals',
        content: 'Components, state, props.',
      },
      {
        course: createdCourses[2]._id,
        title: 'Sensors in Agriculture',
        content: 'Soil sensors and IoT.',
      },
    ];

    await Lesson.insertMany(lessons);
    console.log(`📚 Seeded ${lessons.length} lessons`);

    console.log('🌱 Database seeding completed successfully!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
}

seed();
