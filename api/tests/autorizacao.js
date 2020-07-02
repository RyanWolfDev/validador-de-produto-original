let app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const randomHash = require('random-hash');

chai.use(chaiHttp);
const url = '/api/autorizacao/';

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
        .post('/api/cliente/cadastrar')
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


describe('Testing Autorizacao', () => {

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

            let cliente_id;
            let token;

            //Primeiro eu crio Produto
            chai.request(app)
                .post('/api/produto/')
                .set('Authorization', tokenAdm)
                .send({
                    descricao: 'produto_test',
                    sku: randomHash.generateHash({ length: 8, charset: '0123456789ABCDEF' }),
                    ativo: true,
                    imagemUrl: "http://test.com/teste.jpg"
                })
                .end((err, res) => {

                    //Depois o Token
                    chai.request(app)
                        .post('/api/token/')
                        .set('Authorization', tokenAdm)
                        .send({
                            produto_id: res.body.result.id,
                            quantidade: 1
                        })
                        .end((err, res) => {

                            token = res.body.result[0].token
                            cliente_id = res.body.result.id

                            //E por ultimo crio a Autorizacao com Token criado e o Usuario logado
                            chai.request(app)
                                .post(url)
                                .send({
                                    cliente_id: cliente_id,
                                    token: token
                                })
                                .set('Authorization', tokenCliente)
                                .end(function (err, res) {
                                    res.should.have.status(201);
                                    res.should.be.json;
                                    res.body.should.be.a('object');
                                    res.body.should.have.property('message');
                                    res.body.should.have.property('result');
                                    res.body.result.should.be.a('object');
                                    done();
                                });

                        });
                });
        })

        it('Should not POST', (done) => {

            const token = {
                quantidade: 1
            }

            chai.request(app)
                .post(url)
                .send(token)
                .set('Authorization', tokenAdm)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });
        })
    })

    describe('/GET ALL BY ADM', () => {

        it('Should GET ALL', (done) => {

            chai.request(app)
                .get(url + '/adm')
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


    describe('/GET ALL BY CLIENTE', () => {

        it('Should GET ALL', (done) => {

            chai.request(app)
                .get(url)
                .set('Authorization', tokenCliente)
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

    describe('/DELETE', () => {
        it('Should DELETE', (done) => {
            chai.request(app)
                .get(url)
                .set('Authorization', tokenCliente)
                .end((err, res) => {
                    chai.request(app)
                        .delete(url + res.body.result[0].id)
                        .set('Authorization', tokenCliente)
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