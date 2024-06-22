require('dotenv').config();

let express = require('express');
let app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

console.log("Hello World");


// app.get('/',(req,res)=>{
//     res.send("Hello World");
// });

absolutePath = __dirname + "/views/index.html";
app.get('/', (req, res) => {
    res.sendFile(absolutePath);
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {
    let message = "Hello Mhammad";
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message = message.toUpperCase();
    }

    res.json({ "message": message });
});


app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
},
    (req, res) => {
        res.json({ "time": req.time })
    });


app.get('/:word/echo', (req, res) => {
    const word = req.params.word;
    res.json({ "echo": word });
});


app.route('/name')
    .get((req, res) => {
        const firstName = req.query.first;
        const lastName = req.query.last;
        res.json({ "name": `${firstName} ${lastName}` });
    })
    .post((req, res) => {
        const firstName = req.body.first;
        const lastName = req.body.last;
        res.json({ "name": `${firstName} ${lastName}` });
    })



















module.exports = app;
