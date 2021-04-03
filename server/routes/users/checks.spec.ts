import http from 'http';
import request from 'supertest';

import server from '../../server';

describe('User', () => {
    const SUT = http.createServer(server({ dev: true }));
    const userPayload = {
        birthDate: Date.now(),
        email: 'admin_user_test@tsseract.com',
        name: 'Tsseract',
        password: 'Admin.1234',
        username: 'admin_user_test',
    };

    describe('GetUser(id: String, username: String)', () => {
        it('should return a user given its username', async () => {
            const user = await request(SUT).post('/graphql')
            return user
        })
    })

})
