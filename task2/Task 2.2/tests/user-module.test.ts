import * as request from 'supertest';

import {app} from '../src/application';

describe('Module: User', () => {
    it("User GET /api/v1/users", (done: () => void): void => {
        request(app)
            .get('/api/v1/users')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it("User POST /api/v1/users/create", (done: () => void): void => {
        const data = {firstName: 'Vasiliy', lastName: "Pupkin"};

        request(app)
            .post('/api/v1/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toContainEqual(data);
                done();
            })
    });
});
