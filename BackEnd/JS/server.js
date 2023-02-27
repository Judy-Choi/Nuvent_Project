require('dotenv').config();

const { createApp } = require('./app');
const { myDatabase } = require('./src/models/datasource');

const startServer = async () => {
    try {
        const app = createApp();
        const PORT = process.env.PORT;

        await myDatabase.initialize();
        console.log('Datebase has been initialized!!!');

        app.listen(PORT, () => console.log(`server is listening on ${PORT}!!!`));
    } catch (err) {
        console.error('Error during Data Source initializaion', err);
        myDatabase.destroy();
    }
};

startServer();
