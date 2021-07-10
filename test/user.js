import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v1/');

const TOKEN = '189a6c00293c708b6ceb4c5db389e69f6e90a774fd879705e07e7794dac630e0'

describe('Users', () => {
    it('GET /users', () => {
        request.get(`users?access-token=${TOKEN}`).end((err, res) => {
            console.log(err);
            console.log(res.body); 
        });
    });
});


