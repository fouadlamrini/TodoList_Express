const express = require('express');
const connectDb = require('./config/database');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const logger = require('./utils/logger');
dotenv.config();
const todosRouter = require('./routes/todos');
const app = express();

const PORT = process.env.PORT || 7000;
// 1. Application-wide middleware

app.use(express.json());
// app.use(morgan('dev'));
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));
app.use(helmet());

app.use(
    compression({
        threshold: 0,
    })
);
// 3. Routes
app.use('/todos', todosRouter);
// 4. 404 handler
app.use((req, res) => {
    res.status(404).send('Not found');
});

// connect a db

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
});
//Run server
