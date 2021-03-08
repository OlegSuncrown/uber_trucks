const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const loadRoutes = require('./routes/loadRoutes');
const truckRoutes = require('./routes/truckRoutes');

const {notFound, errorHandler} = require('./middleware/errorMiddleware');

dotenv.config();
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users/me', userRoutes);
app.use('/api/loads', loadRoutes);
app.use('/api/trucks', truckRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

// Connect DB and start server
const start = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  app.listen(PORT, () => {
    console.log(`
        Server is running in ${process.env.NODE_ENV} mode on Port: ${PORT}`);
  });
};

start();
