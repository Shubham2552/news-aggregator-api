let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../src/index');
const expect = require('chai').expect;

describe('Set preferences' , () => {
    //Correct signin and set preferences
  it('signs in validates the token and set the preferences', (done) => {   
        let signInBody = {
            email:'testmail123@gmail.com',
            password:'test1234'
        }
        chai.request(server).post('/signin').send(signInBody).end((err, siginResponse) => {
          chai.request(server).post('/preferences').set('authorization', `JWT ${siginResponse.body.accessToken}`).send({
            "preferences":["Sports","Tech"]
        }).end((err, res) => {
            expect(res.status).equal(200);
            expect(res.text).equal("Successfully set preferences Sports,Tech");
          
            done();
          });
        });
    });


    //Incorrect signin with wrong password and doesn't set preferences
    it('signs in doesn\'t validates due to wrong password the token and does not set the preferences', (done) => {   
        let signInBody = {
            email:'testmail123@gmail.com',
            password:'test234'
        }
        chai.request(server).post('/signin').send(signInBody).end((err, siginResponse) => {
          chai.request(server).post('/preferences').set('authorization', `JWT ${siginResponse.body.accessToken}`).send({
            "preferences":["Sports","Tech"]
        }).end((err, res) => {
            expect(res.status).equal(403);
            expect(res.body.message).equal("Invalid JWT token");
            
          
            done();
          });
        });
    });

        //Incorrect signin with no header and doesn't set preferences
        it('signs in doesn\'t validates the token due to no header and does not set the preferences', (done) => {   
          let signInBody = {
              email:'testmail123@gmail.com',
              password:'test234'
          }
          chai.request(server).post('/signin').send(signInBody).end((err, siginResponse) => {
            chai.request(server).post('/preferences').set('authorization', `JSW ${siginResponse.body.accessToken}`).send({
              "preferences":["Sports","Tech"]
          }).end((err, res) => {
              expect(res.status).equal(403);
              expect(res.body.message).equal("Authorization header not found");
              console.log(res.body.message);
              
            
              done();
            });
          });
      });
});

describe('Get preferences route',()=>{
  //Get preferences route for correct login and it fetches the preferences
  it('Check get preference route for corrent login',(done)=>{
    let signInBody = {
      email:'testmail123@gmail.com',
      password:'test1234'
  }
  chai.request(server).post('/signin').send(signInBody).end((err, siginResponse) => {
    chai.request(server).get('/preferences').set('authorization', `JWT ${siginResponse.body.accessToken}`).end((err, res) => {
      expect(res.status).equal(200);
      expect(res.text).equal("Successfully fetched preferences Sports,Tech");
      console.log(res.body.message);
    
      done();
    });
  });
  })

    //Get preferences route for incorrect login and it does not fetches the preferences
    it('Check get preference route for incorrent login',(done)=>{
      let signInBody = {
        email:'testmail123@gmail.com',
        password:'test234'
    }
    chai.request(server).post('/signin').send(signInBody).end((err, siginResponse) => {
      chai.request(server).get('/preferences').set('authorization', `JWT ${siginResponse.body.accessToken}`).end((err, res) => {
        expect(res.status).equal(403);
        expect(res.body.message).equal("Invalid JWT token");
        console.log(res.body.message);
      
        done();
      });
    });
    })
  

})