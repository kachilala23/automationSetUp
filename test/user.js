import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v1/');
import { expect } from 'chai';

const TOKEN = '189a6c00293c708b6ceb4c5db389e69f6e90a774fd879705e07e7794dac630e0';

describe('Users', () => {
    it('GET /users', () => {
      // request.get(`users?access-token=${TOKEN}`).end((err, res) => {
      //   expect(res.body.data).to.not.be.empty;
      //   done();
      // });
  
      return request.get(`users?access-token=${TOKEN}`).then((res) => {
        expect(res.body.data).to.not.be.empty;
      });
    });
  
    it('GET /users/:id', () => {
      return request.get(`users/9?access-token=${TOKEN}`).then((res) => {
        expect(res.body.data.id).to.be.eq(9);
      });
    });
  
    it('GET /users with query params', () => {
      const url = `users?access-token=${TOKEN}&page=5&gender=Female&status=Active`;
  
      return request.get(url).then((res) => {
        expect(res.body.data).to.not.be.empty;
        res.body.data.forEach((data) => {
          expect(data.gender).to.eq('Female');
          expect(data.status).to.eq('Active');
        });
      });
    });
  
    it.only('POST /users', () => {
      const data = {
        email: `test-${Math.floor(Math.random() * 9999)}@mail.ca`,
        name: 'stanlolo',
        gender: 'male',
        status: 'inactive',
      };
  
      return request
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
        });
    });
  
    it('PUT /users/:id', () => {
      const data = {
        status: 'active',
        name: `stanlolo - ${Math.floor(Math.random() * 9999)}`,
      };
  
      return request
        .put('users/132')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          console.log(res.body);
          expect(res.body.data).to.deep.include(data);
        });
    });
  
    it.only('DELETE /users/:id', () => {
      return request
        .delete('users/11')
        .set('Authorization', `Bearer ${TOKEN}`)
        .then((res) => {
          console.log(res.body);
          expect(res.body.data).to.be.eq(null);
        });
    });
  });
  