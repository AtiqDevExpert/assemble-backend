const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoute');
const eventRoutes = require('./routes/eventRoute');
const oAuthUserRoutes = require('./routes/oauthRoutes');

dotenv.config();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb+srv://assemble:123@cluster0.xdkbbje.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection failed', err));

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/oauth', oAuthUserRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
