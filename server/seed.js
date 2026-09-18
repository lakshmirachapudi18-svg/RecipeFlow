const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { connectDB } = require('./config/db');
const Recipe = require('./models/Recipe');
const sampleRecipes = require('./utils/seedData');

const seedDB = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.error('❌ MONGODB_URI is not configured. Please check server/.env.');
    process.exit(1);
  }

  try {
    await Recipe.deleteMany({});
    console.log('Cleared existing recipes...');
    
    // Remove custom string _id for Mongoose auto ObjectId generation if desired, or keep clean
    const cleanRecipes = sampleRecipes.map(({ _id, ...rest }) => rest);
    await Recipe.insertMany(cleanRecipes);
    console.log(`✅ Successfully seeded ${cleanRecipes.length} recipes into MongoDB!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDB();
