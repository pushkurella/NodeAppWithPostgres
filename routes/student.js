// var express = require('express');
// const app= express();
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Password@207',
    port: 5432
});

const obj = [
    {
        id: 1,
        name: 'pushpak'
    },
    {
        id: 2,
        name: 'karthik'
    },
    {
        id: 3,
        name: 'Rathna'
    }
];

const getUsers = (req, res) => {
    pool.query('select * from boiler_plate', (err, result) => {

        //return res.sendStatus(200).json(result.rows);
        res.send(result.rows);
    })
}

const getRoles = (req, res) => {
    console.log('called getRoles');

    pool.query('SELECT * FROM public."Roles"', (err, result) => {
        if (err) console.log('error ' + err);
        var obj = result.rows;
        let arr = [];
        obj.map((data) => {
            // arr.push(data.Role);
            // console.log('data in map '+data.Role);
        })
        var data = obj.forEach((data) => {
            arr.push(data.Role);
           // console.log('data in foreach ' + data.Role);
            return arr;
        })
        console.log('type od data ' + typeof data);
        var filtered = obj.filter((data) => {
           // console.log('data in filter ' + data);
            return data.Role === 'Team lead';
        })
        // console.log('filtered ddata '+JSON.stringify(filtered));
        // console.log('filtered data '+ filtered.id);
        // console.log('obj data role '+obj[0].Role);
        return res.send(arr);
    })
}
const postRoles = (req, res) => {
    console.log('inside postroles');
    var id = req.body.id;
    var role = req.body.Role;
    var permission = req.body.Permission;
    console.log('params ' + JSON.stringify(req.params));
    console.log('id, role and permission are ' + id + ' ' + role + ' ' + permission);
    try {
        pool.query('insert into public."Roles" values ($1,$2,$3) returning id', [id, role, permission], (err, result) => {
            console.log('inside post query');
            console.log(result);
            res.send('the id inserted was ' + JSON.stringify(result.rows[0]));
        })
    } catch (err) {
        console.log(err);
        res.send('we got an ' + err);
    }
}
const updateRoles = (req, res) => {
    console.log('inside updateroles');
    var id = req.params.id;
    let role = req.body.role;
    let permission = req.body.permission;
    console.log('id, role and permission are ' + id + ' ' + role + ' ' + permission);
    //UPDATE public."Roles"	SET id=?, "Role"=$1, "Permission"=$2 WHERE id=$3
    pool.query('update public."Roles" set "Role" = $1, "Permission" =$2 where id=$3',[role,permission,id],(err,result)=>{
        console.log('inside update query');
        console.log(result.rowCount);
        res.send(JSON.stringify(result.rowCount)+' row updated');
    })
}
const deleteRoles = (req, res) => {
    console.log('inside deleteroles');
    var id = req.params.id;
    // let role = req.body.role;
    // let permission = req.body.permission;
    console.log('id is  ' + id );
    //UPDATE public."Roles"	SET id=?, "Role"=$1, "Permission"=$2 WHERE id=$3
    pool.query('DELETE FROM public."Roles"	WHERE id=$1;',[id],(err,result)=>{
        console.log('inside delete query');
        console.log(result.rowCount);
        res.send(JSON.stringify(result.rowCount)+' row updated');
    });
}
// 6-19-2019

// const promise2 = new Promise((resolve,reject)=>{

//     let a =6;
//     if(a%2 ==0){
//         resolve('what an even number it is');
//     }
//     else{
//         reject('vyaaak odd number it is');
//     }
// });



// const normalFn =(sucess,failure)=>{
//     let a=9;
//     if(9%2==0){
//         sucess('ok');
//     }
//     else {
//         failure('not ok');
//     }
// };

// normalFn((hel)=>{
//     console.log('hel is '+hel);
// },(hi)=>{
//     console.log('hi is '+hi);
// })

const defaultFunc = (req, res) => {

    //normalFn('ok','okk');
    // promise2.then(resp=>{
    //     console.log('this is the response from promise2 '+ resp);
    // }).catch((err)=>{
    //     console.log('this is the rejected response '+err);
    // })

    //const obj = student.getStudents();
    // let promise = new Promise((resolve,reject)=>{
    //     var a=4;
    //     if(a%2==0){
    //         setTimeout(()=>{
    //             res.setHeader('Content-type','application/json');
    //             res.json(obj);
    //             console.log('in set timeout');
    //         },2000);    
    //         resolve('its an even number');
    //     }
    //     else{
    //         reject('not an even number');
    //     }
    // });
    // var info='';
    // var prom=promise.then(data=>{
    //     info=data;
    //     console.log('data '+data);
    //     return info;
    // }).catch(err=>{
    //     console.log('error '+err);
    // });
    // console.log('this is the info '+prom.then(data=>console.log('inside prom '+data)));
};


const a = false, b = false;
const calledFunction = (successcallback, failurecallback) => {
    if (a) {
        successcallback('pk');
    }
    else {
        failurecallback('not pk');
    }
}

calledFunction((success) => {
    console.log('this is the success ' + success);
}, (error) => {
    console.log('this is the error ' + error);
});



const getSpecificStudent = (req, res) => {
    let id = req.params.std_id;
    console.log('single student id ' + id);
    //const obj = student.getStudents();
    console.log('indi ' + JSON.stringify(obj[id - 1]["name"]));
    //res.setHeader('Content-type','application/json');
    res.json(obj[id - 1]["name"]);
};

const getSpecificRole = (req,res)=>{
    let id = req.params.id;
    console.log('single role id ' + id);
    //const obj = student.getStudents();
    pool.query('select * FROM public."Roles" WHERE id=$1;',[id],(err,result)=>{
        console.log('inside getSpecific role query');
        console.log(typeof result.rows[0]);
        console.log(result.rows[0]);
        res.send(JSON.stringify(result.rows[0]));
    })
   //res.json(JSON.stringify(obj));
};

const addStudents = (req, res) => {
    //const stud={id:9,name:'king'};
    console.log('req params ' + JSON.stringify(req.body) + ' where id is ' + req.body.id);
    var stud = req.body;
    const obj = addStudent(stud);
    res.json(obj);
};

function getStudents() {
    console.log(obj);
    return obj;
}
function addStudent(student) {
    obj.push(student);
    return obj;
}
module.exports = {
    getStudents,
    addStudent,
    defaultFunc,
    getSpecificStudent,
    addStudents,
    getUsers,
    getRoles,
    getSpecificRole,
    postRoles,
    updateRoles,
    deleteRoles
}