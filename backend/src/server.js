require('dotenv').config({ path: require('path').join(process.cwd(), 'backend', '.env') });
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Free Sewaa backend running on http://localhost:${PORT}`);
  });
}

start().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
