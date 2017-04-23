process.env.NODE_ENV = 'test'
process.env.MONGODB_URI = 'mongodb://localhost/52weekchallenge'

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/index');
const should = chai.should();

chai.use(chaiHttp);

describe('Our API version', () => {
  it('Should get the API version', (done) => {

    chai.request(server)
      .get('/api/version')
      .end((err, res) => {
        // console.log('Res', res, err)
        res.should.have.status(200)
        res.body.version.should.equal('1.1')
        done()
      })

  })
})
