const chai = require('chai');
const chaiHttp = require('chai-http');
const { requestions, validUser, requestionsWithError } = require('../mock/index');
const User = require('../../src/users/usersModel');
const server = require('../../index');
const { BAD_REQUEST_FORMAT } = require('../../src/errors');

chai.use(chaiHttp);
chai.should();

const URL_BASE = 'http://localhost:3000';


describe('API para cadastro e atualização de usuário', () => {
  describe('Parametros da request', () => {
    it('Testar que não é possivel processar request sem o formato { data: { title, content} }', (done) => {
      chai.request(URL_BASE)
      .post('/users')
      .send(requestionsWithError.badRequest)
      .end((err, res) => {
        chai.assert.isNull(err);
        chai.assert.isNotEmpty(res.body);
        res.should.have.status(400);
        res.body.should.have.property('errors');
        done();
      });
    })
  })
  describe('Criação de usuário', () => {
    beforeEach(() => {
      User.deleteMany({}, (response) => response);
    });

    afterEach(() => {
      User.deleteMany({}, (response) => response);
    });
    it ('Testar que é possível criar um usuário com número de telefone e nome ', (done) => {
      chai.request(URL_BASE)
      .post('/users')
      .send(requestions.phone)
      .end((err, res) => {
        const { phone } = requestions;
        chai.assert.isNull(err);
        chai.assert.isNotEmpty(res.body);
        res.should.have.status(201);
        res.body.should.have.property('phone').equal(phone.data.content.phone);
        res.body.should.have.property('name').equal(phone.data.content.name);
        done();
      });
    });

    it ('Testar que não é possível criar um usuário sem número de telefone', (done) => {
      chai.request(URL_BASE)
      .post('/users')
      .send(requestionsWithError.withoutPhone)
      .end((err, res) => {
        chai.assert.isNull(err);
        chai.assert.isNotEmpty(res.body);
        res.should.have.status(400);
        res.body.should.have.property('errors');
        res.body.errors.phone.should.have.property('message');
        done();
      });
    });
  });
  describe('', () => {
    it('', () => {
          // it ('Testar que é possível adicionar CEP à conta do usuário', (done) => {
    //   chai.request(URL_BASE)
    //   .post('/users')
    //   .send(requestions.phone)
    //   .end((err, res) => {
    //     const { cep } = requestions;
    //     chai.assert.isNull(err);
    //     chai.assert.isNotEmpty(res.body);
    //     res.should.have.status(201);
    //     res.body.should.have.property('phone').equal(cep.data.content.phone);
    //     // res.body.address.should.have.property('cep').equal(cep.data.content.cep);
    //     done();
    //   });
    // });
    })
  })
});
