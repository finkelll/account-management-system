import request from "supertest";
import {app, server} from "../index";

describe("Test Account Actions", () => {
    afterAll((done) => {
        server.close(done);
    });

    it('Try to reach nonexistent account', async () => {
        const response = await request(app).get('/account/-999/statement');
        expect(response.status).toBe(404);
    });


    it('Get Statements', async () => {
        const response = await request(app).get('/account/2/statement');
        expect(response.body).toMatchObject({status: 0});
        expect(response.status).toBe(200);
    });

    it('Deposit Into Test Account', async () => {
        const response = await request(app).put('/account/2/deposit').send({
            amount: 300
        });
        expect(response.body).toMatchObject({status: 0});
        expect(response.status).toBe(200);
    });
    it('Withdrawal Into Test Account', async () => {
        const response = await request(app).put('/account/2/withdrawal').send({
            amount: 300
        });
        expect(response.body).toMatchObject({status: 0});
        expect(response.status).toBe(200);
    });
});