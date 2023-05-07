let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../src/index');
const expect = require('chai').expect;

describe('Get news route',()=>{
    //Get preferences route for correct login and it fetches the preferences
    it('Check news fetching route for success with correct login',(done)=>{
      let signInBody = {
        email:'testmail123@gmail.com',
        password:'test1234'
    }
    chai.request(server).post('/signin').send(signInBody).end((err, siginResponse) => {
      chai.request(server).post('/preferences').set('authorization', `JWT ${siginResponse.body.accessToken}`).send({
        "preferences":["Sports","Tech"]
    }).end((err, res) => {
        chai.request(server).get('/news').set('authorization', `JWT ${siginResponse.body.accessToken}`).end((err,res)=>{
            expect(res.status).equal(200);
            
        
        })
        // expect(res.status).equal(200);
        // expect(res.text).equal("Successfully fetched preferences Sports,Tech");
        // console.log(res.body.message);
      
        done();
      });
    });
    })
  
  

    
  
  })