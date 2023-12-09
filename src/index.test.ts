import request from "supertest";
import {app, server} from "./index";

describe("Test Server", () => {
    afterAll((done) => {
       server.close(done);
    });

    it('Get all accounts', async () => {
        const response = await request(app).get('/accounts');

        expect(response.status).toBe(200);
    });
});