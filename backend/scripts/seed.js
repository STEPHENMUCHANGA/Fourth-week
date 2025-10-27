
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Course = require('../src/models/Course');
const Lesson = require('../src/models/Lesson');

async function seed(){
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to DB for seeding');

  await User.deleteMany({});
  await Course.deleteMany({});
  await Lesson.deleteMany({});

  const alice = new User({ name: 'Alice Instructor', email: 'alice@smartlerner.test', password: 'password123', role: 'instructor' });
  const bob = new User({ name: 'Bob Student', email: 'bob@smartlerner.test', password: 'password123', role: 'student' });
  await alice.save();
  await bob.save();

  const courses = [
    { title: 'AI Basics', description: 'Introduction to AI concepts and applications.', instructor: alice._id, tags: ['AI','ML'] },
    { title: 'Web Development', description: 'Modern web dev with JavaScript, React and Node.', instructor: alice._id, tags: ['Web','Frontend'] },
    { title: 'Agriculture Tech', description: 'Applying tech & AI to agriculture.', instructor: alice._id, tags: ['AgTech'] }
  ];
  const created = await Course.insertMany(courses);

  const lessons = [
    { course: created[0]._id, title: 'What is AI?', content: 'AI definition and history.' },
    { course: created[0]._id, title: 'Supervised vs Unsupervised', content: 'Basic ML paradigms.' },
    { course: created[1]._id, title: 'Intro to HTML/CSS', content: 'Basics of web layout.' },
    { course: created[1]._id, title: 'React Fundamentals', content: 'Components, state, props.' },
    { course: created[2]._id, title: 'Sensors in Agriculture', content: 'Soil sensors and IoT.' }
  ];
  await Lesson.insertMany(lessons);

  console.log('Seeding completed');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
