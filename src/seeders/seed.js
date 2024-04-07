const mongoose = require('mongoose');
const faker = require('faker');
const Organization = require('../models/Organization');
const User = require('../models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

// Seed the database
async function seed() {
  try {
    // Create organizations
    const organizations = [];
    for (let i = 0; i < 5; i++) {
      const organization = new Organization({ name: faker.company.companyName() });
      await organization.save();
      organizations.push(organization);
    }

    // Create users
    for (let i = 0; i < 10; i++) {
      const organization = organizations[Math.floor(Math.random() * organizations.length)];
      const user = new User({
        username: faker.internet.userName(),
        password: faker.internet.password(),
        role: i < 5 ? 'admin' : 'user',
        organization: organization._id
      });
      await user.save();
    }

    console.log('Database seeded successfully');
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

seed();
