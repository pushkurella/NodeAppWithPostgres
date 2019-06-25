process.env.NODE_ENV='test';
let chai = require('chai');
let mocha = require('mocha');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);

describe('Students',()=>{
    beforeEach((done)=>{
        console.log('in the before each');
        done();
    });
});

xdescribe('Get roles list',()=>{
    console.log('value of node env '+process.env.NODE_ENV);
    it('Should get the list of all roles',(done)=>{
        chai.request(server)
        .get('/roles')
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.equal(12);
            done();
        });
    });
});

xdescribe('Get specific role',()=>{
    it('Should get specific role',(done)=>{
        chai.request(server)
        .get('/roles/5')
        .end((err,res)=>{
            if(err) console.log('theres an error '+err);
            res.should.have.status(200);
            res.body.should.be.a('object');
            console.log('body val '+(res.body));
            //res.body.should.have.property('id');
            //res.body[0].should.be.equal("Admin");
            done();
        });
    });
});

//post data

xdescribe('post student data',()=>{
    it('should post student data',(done)=>{
        chai.request(server)
        .post('/roles')
        .send({
            id : 97,
            Role : 'good role',
            Permission : 'Y'
        })
        .end((err,res)=>{
            res.should.have.status(200);
            res.should.be.a('Object');
            //res.should.have.haveOwnProperty('rowCount');
            // res.body.should.have.property('rowCount');
            // res.body.rowCount.should.equal(1);
            done();
        })
    })
});

xdescribe('update student data',()=>{
    it('should update student data',(done)=>{
        chai.request(server)
        .put('/roles/8')
        .send({
            role : 'good role',
            permission : 'Y'
        })
        .end((err,res)=>{
            res.should.have.status(200);
            res.should.be.a('Object');
            //res.should.have.haveOwnProperty('rowCount');
            // res.body.should.have.property('rowCount');
            // res.body.rowCount.should.equal(1);
            //res.body.should.equal('1 row updated',res.body);
            
            done();
        });
    });
});

describe('delete student data',()=>{
    it('should delete student data',(done)=>{
        chai.request(server)
        .delete('/roles/8')
        .send({
            role : 'good role',
            permission : 'Y'
        })
        .end((err,res)=>{
            res.should.have.status(200);
            res.should.be.a('Object');
            //res.should.have.haveOwnProperty('rowCount');
            // res.body.should.have.property('rowCount');
            // res.body.rowCount.should.equal(1);
            //res.body.should.equal('1 row updated',res.body);
            
            done();
        });
    });
});