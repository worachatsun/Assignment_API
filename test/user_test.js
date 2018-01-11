const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)

describe('/POST register', () => {
    it('it should not register when dont have any data', (done) => {
        let user = {}

        chai.request('http://localhost:3000')
            .post('/auth/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('error')
                res.body.should.have.property('message')
                done()
            })
    })

    it('it should not register duplicate email', (done) => {
        let user = {
            "email": "sun@sun.sun",
            "username": "sun",
            "password": "sunn"
        }

        chai.request('http://localhost:3000')
            .post('/auth/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('error')
                res.body.should.have.property('message')
                done()
            })
    })

    it('it should not register duplicate username', (done) => {
        let user = {
            "email": "sun@sun.sun1",
            "username": "sun",
            "password": "sunn"
        }

        chai.request('http://localhost:3000')
            .post('/auth/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('error')
                res.body.should.have.property('message')
                done()
            })
    })
})