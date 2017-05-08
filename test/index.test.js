process.env.NODE_ENV = 'test'
process.env.MONGODB_URI = 'mongodb://localhost/52weektest'

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/index');
const should = chai.should();
// const { User } = require('../app/user')
chai.use(chaiHttp);

describe('The product wizard', ()  => {

  describe('Post params', () => {
    it ('Should ingore anything that isnt a text', (done) => {
      let postData = {
        notification_type: 'MessageSent',
        external_contact_id: '-1',
        name: 'Jack',
        text: 'TwinPlus',
        id: '-1',
        account_type: 'Telegram',
        account: 'BarclaysBot'
      }

      chai.request(server)
        .post('/api/bot/respond')
        .send(postData)
        .end((err,res) => {

          res.should.have.status(200)
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('ignored').eql(true)

          done()

        })
    })
  })

  describe('Basic saving of user data', () => {

    let userData = {
      notification_type: 'MessageReceived',
      external_contact_id: '1',
      name: 'Alex',
      text: 'TwinPlus',
      id: '1',
      account_type: 'Telegram',
      account: 'BarclaysBot'
    }

    it('Should save the user data when there is an initial post', (done) => {
      chai.request(server)
        .post('/api/bot/respond')
        .send(userData)
        .end((err, res) => {

          // console.log('Response', res)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('user')

          let user = res.body.user.data

          user.should.have.property('contactId').equal(userData.id)
          user.should.have.property('name').eql(userData.name)
          user.should.have.property('state').eql('new')
          user.should.have.property('source').eql(userData.account)
          user.should.have.property('accountType').eql(userData.account_type)
          user.should.have.property('metadata').eql(null)

          done()
        })
    })
  // })

  // describe('The product wizard steps', () => {
  //   let data = {
  //     notification_type: 'MessageReceived',
  //     external_contact_id: '2',
  //     name: 'Alex',
  //     text: 'TwinPlus',
  //     id: '2',
  //     account_type: 'Telegram',
  //     account: 'BarclaysBot'
  //   }
  //
  //   it('Should respond with the welcome prompt', (done) => {
  //     chai.request(server)
  //       .post('/api/bot/respond')
  //       .send(data)
  //       .end((err, res) => {
  //
  //         res.should.have.status(200)
  //         res.body.should.have.property('success').eql(true)
  //
  //         // let { responses, user } = res.body
  //         // responses.should.be.a('array')
  //         //
  //         // let expected = [
  //         //   {
  //         //     text: "Hi Alex, my name is Lily and I'm here to tell you more about the Twin Plus current account",
  //         //     options: null
  //         //   },
  //         //   {
  //         //     text: "Imagine an account that gives you monthly cash-back rewards, a free insurance cover and convenient access through your Mobile phone so you can pursue the extra-ordinary.",
  //         //     options: ["Tell me more", "Not interested"]
  //         //   }
  //         // ]
  //         //
  //         // responses.should.be.eql(expected)
  //         // user.state.should.be.equal('opt-in')
  //
  //         done()
  //       })
  //   })
  })
})
