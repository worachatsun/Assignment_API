const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)

describe('/POST getPreferenceByUserID', () => {
    it('it should not POST a Preference without ID', (done) => {
      let pre = {
            _id: ''
      }

      chai.request('http://localhost:3000')
          .post('/api/getPreferenceByUserID')
          .send(pre)
          .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('object')
            res.body.should.have.property('error')
            res.body.should.have.property('message')
            done()
          })
    })
    it('it should POST a Preference ', (done) => {
        let pre = {
            _id: '5a55ad7cf80f14451f415a76'
        }
        chai.request('http://localhost:3000')
            .post('/api/getPreferenceByUserID')
            .send(pre)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('language')
                res.body.should.have.property('timezone')
                res.body.should.have.property('currency')
                res.body.should.have.property('message')
                res.body.should.have.property('category')
                res.body.should.have.property('created_by')
                res.body.should.have.property('profile_visibility')
                done()
            })
      })
})