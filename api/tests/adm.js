let app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);
const url = '/api/adm/';
let token = 'Bearer ';
const admExistente = {
    login: "Lucas",
    senha: "123"
}

describe('Testing Adms', () => {

    //Executo metodo de Login antes para setar o Token no header
    before(function (done) {
        chai.request(app)
            .post(url + 'login')
            .send(admExistente)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('adm_id');
                res.body.should.have.property('token');
                token = token.concat(res.body.token);
                done();
            });

    });

    describe('/POST', () => {

        it('Should POST', (done) => {

            const adm = {
                login: 'adm_test',
                senha: '123',
                ativo: true
            }

            chai.request(app)
                .post(url)
                .send(adm)
                .set('Authorization', token)
                .end(function (err, res) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('result');
                    res.body.result.should.be.a('object');
                    res.body.result.should.have.property('id');
                    res.body.result.should.have.property('login');
                    res.body.result.should.have.property('ativo');
                    done();
                });
        })

        it('Should not POST', (done) => {

            const adm = {
                login: 'adm_test2'
            }

            chai.request(app)
                .post(url)
                .send(adm)
                .set('Authorization', token)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('errors');
                    done();
                });
        })
    })

    describe('/GET ALL', () => {

        it('Should GET ALL', (done) => {

            chai.request(app)
                .get(url)
                .set('Authorization', token)
                .end((err, res) => {
                    if (res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.result.should.be.an('array');
                        done();
                    }
                })
        })
    })

    describe('/GET BY ID', () => {

        it('Should GET BY ID', (done) => {
            chai.request(app)
                .get(url)
                .set('Authorization', token)
                .end((err, res) => {
                    chai.request(app)
                        .get(url + res.body.result[0].id)
                        .set('Authorization', token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.should.be.json;
                            res.body.should.be.a('object');
                            res.body.should.have.property('result');
                            res.body.should.have.property('message');
                            res.body.result.should.have.property('id');
                            res.body.result.should.have.property('login');
                            res.body.result.should.have.property('ativo');
                            done();
                        })
                })
        })
    })

    describe('/PUT', () => {

        it('Should PUT', function (done) {

            const adm = {
                login: 'adm_test_update'
            }

            chai.request(app)
                .get(url)
                .set('Authorization', token)
                .end((err, res) => {
                    chai.request(app)
                        .put(url + res.body.result[0].id)
                        .send(adm)
                        .set('Authorization', token)
                        .end(function (err, res) {
                            res.should.have.status(200);
                            res.should.be.json;
                            res.body.result.should.be.a('object');
                            res.body.should.have.property('updatedRows').equal(1);
                            res.body.should.have.property('message');
                            res.body.should.have.property('result');
                            done();
                        });
                });
        });
    })

    describe('/DELETE', () => {
        it('Should DELETE', (done) => {
            chai.request(app)
                .get(url)
                .set('Authorization', token)
                .end((err, res) => {
                    chai.request(app)
                        .delete(url + res.body.result[0].id)
                        .set('Authorization', token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.should.be.json;
                            res.body.should.be.a('object');
                            res.body.should.have.property('message');
                            res.body.should.have.property('deletedRows').equal(1);
                            done();
                        })
                })
        })
    })
})