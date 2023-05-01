const request = require('supertest');
const getApp = require('./app');
const HttpStatus = require("./constants/httpStatuses.js");

require('dotenv').config();

// Cria os mocks das funções que existem em cada repository do projeto, para então declararmos
// versões falsas desses repositories que serão passadas para o nosso app falso que será usado
// nos testes
const connect = jest.fn();
const findOneById = jest.fn();
const findOneByEmail = jest.fn();
const insertOne = jest.fn();
const deleteOne = jest.fn();
const deleteAll = jest.fn();
const updateOne = jest.fn();
const findAll = jest.fn();

fakeUserRepository = {
    connect,
    findOneById,
    findOneByEmail,
    insertOne,
    deleteOne,
    deleteAll,
    updateOne,
    findAll
}

const checkCredentials = jest.fn();

fakeClientRepository = {
    connect,
    findOneById,
    insertOne,
    checkCredentials,
    findAll
}

fakeRepoArray = {
    user: fakeUserRepository,
    client: fakeClientRepository
}

const app = getApp(fakeRepoArray);

describe("UserApi", ()=>{

    //Executa uma vez antes de cada teste
    beforeEach(async ()=>{
        //Reseta os mocks usados nos testes, pra impedir que um teste cause efeitos colaterais em outro
        findOneById.mockReset();
        insertOne.mockReset();
        deleteOne.mockReset();
        updateOne.mockReset();
        findAll.mockReset();
    })

    const dummyUser = {
        "name": "John Doe",
        "email": "john@doe.com"
    }

    const dummyId = "123456789012";

    describe("/users",()=>{
        describe("GET /",()=>{
            test("retornar status HTTP_OK", async()=>{
                const response = await request(app).get('/users');
                expect(findAll.mock.calls.length).toBe(1);
                expect(response.statusCode).toBe(HttpStatus.OK);
            });
        })
        describe("POST /",()=>{
            test("retornar status HTTP_OK_CREATED se usuário foi criado com sucesso", async()=>{
                insertOne.mockResolvedValue(dummyUser);
                const response = await request(app).post('/users').send(dummyUser);
                expect(insertOne.mock.calls.length).toBe(1);
                expect(response.statusCode).toBe(HttpStatus.OK_CREATED);
            });

            test("retornar status HTTP_CONFLICT se usuário não foi criado com sucesso", async()=>{
                insertOne.mockRejectedValue(new Error());
                const response = await request(app).post('/users').send(dummyUser);
                expect(insertOne.mock.calls.length).toBe(1);
                expect(response.statusCode).toBe(HttpStatus.CONFLICT);
            });
        })
    })
    
    describe("/users/:id",()=>{
        describe("GET /",()=>{
            test("retornar status HTTP_OK se um usuário existente foi encontrado", async()=>{
                findOneById.mockResolvedValue(dummyUser);
                const response = await request(app).get(`/users/${dummyId}`);
                expect(findOneById.mock.calls.length).toBe(1);
                expect(response.statusCode).toBe(HttpStatus.OK);
            });
            test("retornar status HTTP_NOT_FOUND se um usuário existente não foi encontrado", async()=>{
                findOneById.mockRejectedValue(new Error());
                const response = await request(app).get(`/users/${dummyId}`);
                expect(findOneById.mock.calls.length).toBe(1);
                expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
            });
        })
        describe("PUT /",()=>{
            test("retornar status HTTP_OK se um usuário foi atualizado", async()=>{
                const response = await request(app).put(`/users/${dummyId}`);
                expect(updateOne.mock.calls.length).toBe(1);
                expect(response.statusCode).toBe(HttpStatus.OK);
            });
            test("retornar status HTTP_NOT_FOUND se nenhum usuário foi atualizado", async()=>{
                updateOne.mockRejectedValue(new Error());
                const response = await request(app).put(`/users/${dummyId}`);
                expect(updateOne.mock.calls.length).toBe(1);
                expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
            });
        })
        describe("DELETE /",()=>{
            test("retornar status HTTP_OK se um usuário foi deletado", async()=>{
                const response = await request(app).delete(`/users/${dummyId}`);
                expect(deleteOne.mock.calls.length).toBe(1);
                expect(response.statusCode).toBe(HttpStatus.OK);
            });
            test("retornar status HTTP_NOT_FOUND se nenhum usuário foi deletado", async()=>{
                deleteOne.mockRejectedValue(new Error());
                const response = await request(app).delete(`/users/${dummyId}`);
                expect(deleteOne.mock.calls.length).toBe(1);
                expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
            });
        })
    })
})