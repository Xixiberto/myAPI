const app = require('./app')
const port = 8000

app.listen(port, () => {
    console.log(`API REST running in http://localhost:${port}`);
});

