let app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const randomHash = require('random-hash');


chai.use(chaiHttp);
const url = '/api/cliente/';

let tokenAdm = '';
let tokenCliente = '';

function setClienteToken() {

    const cliente = {
        nome: 'cliente_test',
        email: 'teste-' + randomHash.generateHash({ length: 5, charset: '0123456789ABCDEF' }) + '@teste.com',
        senha: '123',
        ativo: true
    }

    chai.request(app)
        .post(url + 'cadastrar')
        .send(cliente)
        .end(function (err, res) {
            res.should.have.status(201);
            chai.request(app)
                .post('/api/cliente/login')
                .send({ email: cliente.email, senha: cliente.senha })
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('cliente_id');
                    res.body.should.have.property('token');
                    tokenCliente = "Bearer " + res.body.token;
                });
        });
}

function setAdmToken() {

    const admExistente = {
        login: "Lucas",
        senha: "123"
    }

    chai.request(app)
        .post('/api/adm/login')
        .send(admExistente)
        .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('adm_id');
            res.body.should.have.property('token');
            tokenAdm = "Bearer " + res.body.token;
        });
}



describe('Testing Clientes', () => {

    //Executo metodo de Login antes para setar o Token no header
    before(function (done) {
        setClienteToken();
        setAdmToken();
        setTimeout(function () {
            done();
        }, 1000);
    });

    describe('/POST', () => {

        it('Should POST', (done) => {

            const cliente = {
                nome: 'cliente_test',
                email: 'teste-' + randomHash.generateHash({ length: 5, charset: '0123456789ABCDEF' }) + '@teste.com',
                senha: '123',
                ativo: true
            }

            chai.request(app)
                .post(url + 'cadastrar')
                .send(cliente)
                .end(function (err, res) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('result');
                    res.body.result.should.be.a('object');
                    res.body.result.should.have.property('id');
                    res.body.result.should.have.property('nome');
                    res.body.result.should.have.property('email');
                    res.body.result.should.have.property('ativo');
                    done();
                });
        })

        it('Should not POST', (done) => {

            const adm = {
                login: 'cliente_test'
            }

            chai.request(app)
                .post(url + 'cadastrar')
                .send(adm)
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
                .set('Authorization', tokenAdm)
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
                .set('Authorization', tokenAdm)
                .end((err, res) => {
                    chai.request(app)
                        .get(url + res.body.result[0].id)
                        .set('Authorization', tokenCliente)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.should.be.json;
                            res.body.should.be.a('object');
                            res.body.should.have.property('result');
                            res.body.should.have.property('message');
                            res.body.result.should.have.property('id');
                            res.body.result.should.have.property('nome');
                            res.body.result.should.have.property('email');
                            res.body.result.should.have.property('ativo');
                            done();
                        })
                })
        })
    })

    describe('/PUT', () => {

        it('Should PUT', function (done) {

            const cliente = {
                nome: 'cliente_test_update'
            }

            chai.request(app)
                .get(url)
                .set('Authorization', tokenAdm)
                .end((err, res) => {
                    chai.request(app)
                        .put(url + res.body.result[0].id)
                        .send(cliente)
                        .set('Authorization', tokenCliente)
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
                .set('Authorization', tokenAdm)
                .end((err, res) => {
                    chai.request(app)
                        .delete(url + res.body.result[0].id)
                        .set('Authorization', tokenAdm)
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