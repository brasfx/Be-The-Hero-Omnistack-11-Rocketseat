const request = require('supertest'); 
const app = require('../../../src/app');
const connection = require('../../../src/database/connection');
describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    afterAll(async () => {
        await connection.destroy();
    })
    it('shoud be able to creat a new ONG',async() =>{
        const response = await request(app).post('/ongs').send({
            name:"Bicharada Universitaria 2",
            email:"bicharada@furg.com",
            whatsapp:"5399876543",
            city:"Rio Grande",
            uf:"RS" 
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
        console.log(response.body);

    });
});