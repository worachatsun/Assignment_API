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

describe('/POST login', () => {
    it('it should not login when input wrong username', (done) => {
        let user = {
            username: "sunqqqqq", 
            password: "sunn"
        }

        chai.request('http://localhost:3000')
            .post('/auth/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('error')
                res.body.should.have.property('message')
                done()
            })
    })

    it('it should not login when input wrong password', (done) => {
        let user = {
            username: "sun", 
            password: "sunn11111"
        }

        chai.request('http://localhost:3000')
            .post('/auth/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('error')
                res.body.should.have.property('message')
                done()
            })
    })

    it('it should login', (done) => {
        let user = {
            username: "sun", 
            password: "sunn"
        }

        chai.request('http://localhost:3000')
            .post('/auth/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.user.should.have.property('username')
                res.body.user.should.have.property('email')
                res.body.user.should.have.property('_id')
                done()
            })
    })
})