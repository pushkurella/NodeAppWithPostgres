const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const port =3000;
const student = require('./routes/student');
require('dotenv').config();

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    
    next();
    console.log(process.env.check+' value');
});
var httpServer= http.createServer(app);

// app.get('/', (req, res) => {
//     res.send('hello');
// });
//gets all the objects in json 
// app.get('/',(req,res) =>{
//     const obj = student.getStudents();
//     res.setHeader('Content-type','application/json');
//     res.json(obj);
// });
app.get('/', student.getUsers);
app.get('/roles',student.getRoles);
app.get('/roles/:id',student.getSpecificRole);
app.post('/roles',student.postRoles);
app.put('/roles/:id',student.updateRoles);
app.delete('/roles/:id',student.deleteRoles);
//gets specific employee obj
app.get('/getStudent/:std_id',student.getSpecificStudent);

//adds new employee object
app.post('/add',student.addStudents);

//updates employee with specific id
app.put('/update/:user_id',(req, res) =>{
    //const stud={id:9,name:'king'};
    console.log('req params '+ req.params.user_id);
    console.log('req body '+JSON.stringify(req.body) + ' where id is '+ req.body.id);
    var stud= req.body;
    const obj = student.addStudent(stud);
    res.json(obj);
});

//only update employee with specific id
app.patch('/updateInfo',(req, res) =>{
    //const stud={id:9,name:'king'};
    console.log('req params '+JSON.stringify(req.body) + ' where id is '+ req.body.id);
    var stud= req.body;
    const obj = student.addStudent(stud);
    res.send(obj);
});

//delete employee with specific id
app.delete('/delete/:emp_id',(req, res) =>{
    //const stud={id:9,name:'king'};
    console.log('req params '+JSON.stringify(req.body) + ' where id is '+ req.body.id);
    var emp_id= req.params.emp_id;
    console.log('deleted empid '+emp_id);
    const obj = student.getStudents();
    delete obj[emp_id];
    res.send(obj);
});
httpServer.listen(port, () => {
    console.log(`app running on 3000`);
});

module.exports =app;

