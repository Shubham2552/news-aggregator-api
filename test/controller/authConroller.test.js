process.env.NODE_ENV = 'test';

let chai=require('chai');
let chaiHttp=require('chai-http');
chai.use(chaiHttp);
const server=require('../../src/index');
const { describe } = require('mocha');
const expect=require('chai').expect;

describe('verifies signup flow',()=>{
    it('successful signup',(done)=>{
        let signupBody={
            id:1,
            fullName:'test name',
            email:'testmail123@gmail.com',
            password:'test1234'
        };

        chai.request(server).post('/register').send(signupBody).end((err,res)=>{
            expect(res.status).equal(200);
            expect(res.body.message).equal('user Registered successfully');
            done();
        });

    });

    it('Duplicate id used',(done)=>{
        let signupBody={
            id:1,
            fullName:'test name',
            email:'testmail123@gmail.com',
            password:'test1234'
        };

        chai.request(server).post('/register').send(signupBody).end((err,res)=>{
            expect(res.status).equal(500);
       
            expect(res.body.message).equal('User id has to be unique and number');
            done();
        });
    });

    it('Duplicate email used',(done)=>{
        let signupBody={
            id:3,
            fullName:'test name',
            email:'testmail123@gmail.com',
            password:'test1234'
        };

        chai.request(server).post('/register').send(signupBody).end((err,res)=>{
            expect(res.status).equal(500);
      
            expect(res.body.message).equal('This email is already registered');
            done();
        });
    });

    it('Malformed request',(done)=>{
       let signupBody= {
        "id":3,
        "fullName":'test name',
     
        "password":'test1234'
            
        }

        chai.request(server).post('/register').send(signupBody).end((err,res)=>{
            expect(res.status).equal(500);
            console.log(res.body.message);
            expect(res.body.message).equal('User Info is malformed please provide all the properties');
            done();
        });
    });
})

describe('verifies signin flow',()=>{

    //Test for successful signin
    it('successful signin',(done)=>{
        let signInBody={
            email:'testmail123@gmail.com',
            password:'test1234'
        };

        chai.request(server).post('/signin').send(signInBody).end((err,res)=>{
            expect(res.status).equal(200);
            expect(res.body.message).equal('Login successfull');
            done();
        });

    });

    //Test for invalid password
    it('wrong password signin error',(done)=>{
        let signInBody={
            email:'testmail123@gmail.com',
            password:'test234'
        };

        chai.request(server).post('/signin').send(signInBody).end((err,res)=>{
            expect(res.status).equal(401);
            expect(res.body.message).equal('Invalid Password!');
            done();
        });

    });

    //Test for invalid email signin
    it('invalid email signin',(done)=>{
        let signInBody={
            email:'testmail12@gmail.com',
            password:'test234'
        };

        chai.request(server).post('/signin').send(signInBody).end((err,res)=>{
            expect(res.status).equal(404);
            expect(res.body.message).equal('User not found');
            done();
        });
    });

});