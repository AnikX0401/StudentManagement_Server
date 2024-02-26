var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(cors());
let students = [{
    name: 'rahul',
    "rollNumber": 1,
    address: {
        city: 'Pune',
        zipcode: 411037
    },
    trainings: ['JAVA', 'HTML'],
    level: 'Intermediate',
    email : 'rahul21@gmail.com'
},
{
    name: 'manish',
    "rollNumber": 2,
    address: {
        city: 'Pune',
        zipcode: 411037
    },
    trainings: ['JAVA', 'HTML'],
    level: 'Basic',
    email : 'manish21@gmail.com'
},
{
    name: 'rohit',
    "rollNumber": 3,
    address: {
        city: 'Pune',
        zipcode: 411037
    },
    trainings: ['HTML'],
    level: 'Advance',
    email : 'rohit77@gmail.com'

},
{
    name: 'sandip',
    "rollNumber": 4,
    address: {
        city: 'Pune',
        zipcode: 411037
    },
    trainings: ['HTML', 'JAVASCRIPT'],
    level: 'Intermediate',
    email : 'sandip90@gmail.com'
},
{
    "id": 5,
    name: 'rishabh',
    "rollNumber": 7,
    address: {
        city: 'Pune',
        zipcode: 411037
    },
    trainings: ['HTML', 'PYTHON'],
    level: 'Intermediate',
    email : 'rishabh25@gmail.com'
},
{
    name: 'rushikesh',
    "rollNumber": 9,
    address: {
        city: 'Pune',
        zipcode: 411037
    },
    trainings: ['PYTHON'],
    level: 'Advance',
    email : 'rushikesh9@gmail.com'
},
{
    name: 'akshay',
    "rollNumber": 14,
    address: {
        city: 'Pune',
        zipcode: 411037
    },
    trainings: ['HTML', 'REACT'],
    level: 'Advance',
    email : 'akshay15@gmail.com'
},
{
    name: 'satyam',
    "rollNumber": 22,
    address: {
        city: 'Pune',
        zipcode: 411037
    },
    trainings: ['JAVASCRIPT', 'ANGULAR'],
    level: 'Advance',
    email : 'satyam01@gmail.com'
},
{
    name: 'aniket',
    "rollNumber": 44,
    address: {
        city: 'Pune',
        zipcode: 411037
    },
    trainings: ['HTML', 'JAVASCRIPT', 'REACT'],
    level: 'Advance',
    email : 'aniket04@gmail.com'
},
{
    name: 'rohan',
    "rollNumber": 35,
    address: {
        city: 'Pune',
        zipcode: 411037
    },
    trainings: ['HTML', 'JAVASCRIPT', 'ANGULAR'],
    level: 'Basic',
    email : 'rohan35@gmail.com'
},
{
    name: 'ketan',
    "rollNumber": 30,
    address: {
        city: 'Pune',
        zipcode: 411037
    },
    trainings: ['HTML', 'REACT', 'PYTHON'],
    level: 'Intermediate',
    email : 'ketan5@gmail.com'
}
];





app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/students', function (req, res) {
    res.status(200).json(students);
});

app.get('/students/level/:level', function (req, res) {
    const level = req.params.level;
    students = students.filter(student => student.level === level);
    res.status(200).json(students);
 });

app.post('/student', function (req, res) {
    const newStudent = req.body;
    if (!Array.isArray(newStudent.trainings)){
        res.status(400).send("Trainings must be Array")
    }
    else {
    students.push(newStudent);
    res.status(200).json(students);
    }
});

app.get('/student/:rollNumber', function (req, res) {
    const student = students.find(student => student.rollNumber === parseInt(req.params.rollNumber))
    res.status(200).json(student);
});

// app.get('/student/:level', function (req, res){
//     const student = students.find(student => student.level === parseInt(req.params.level) )
//     res.status(200).json(student);
// })

app.delete('/student/:rollNumber', function (req, res) {
    students = students.filter(student => student.rollNumber !== parseInt(req.params.rollNumber))
    res.status(200).json(students);
});


app.put('/student/:rollNumber', function (req, res) {
    const newAttributes = req.body;
    students = students.map(student => {
        if (student.rollNumber === parseInt(req.params.rollNumber)) {
            student = {
                ...student,
                ...newAttributes
            }
        }
        return student;
    })
    res.status(200).json(students);
});

app.listen(5050);
console.log('Hello');