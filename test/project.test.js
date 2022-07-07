var request = require("supertest");
var baseUrl = "http://localhost:5000/api/logger/projects";
var projectDetail = require("./server.test")
var activeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjI0MTU0MDM5ZDQxZjZhYTY3YzBjZDkzIiwianRpIjoibk9rWUhDUEtSOCIsImlhdCI6MTY1NzAxNzgyMSwiZXhwIjoxNjU4MzEzODIxfQ.8mSSCP-paLe789f6pp4IWd9OcU2WaFNLD9IooqsEk9Q'

/**
* @note grab the token from activ logged in user 
* @note change the token with different user logged in at the time 
*/
describe("PROJECT test", () => {
    describe("GET request", () => {
        it("should get all project data where auth token in invalid or not send", (done) => {

            request(`${baseUrl}`)
                .get(`/`)
                .expect("Content-Type", /json/)
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should get all project data", (done) => {

            request(`${baseUrl}`)
                .get(`/`)
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect("Content-Type", /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should not get device count with project code where auth token is not valid or not send in header", (done) => {
            request(`${baseUrl}`)
                .get(`/getDeviceCount/${projectDetail[0].projectCode[1]}`)
                .expect("Content-Type", /json/)
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should not get device count when project code is invalid or empty and not defined", (done) => {
            request(`${baseUrl}`)
                .get(`/getDeviceCount/`)
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect("Content-Type", /json/)
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });
        it("should get device count with product code", (done) => {
            request(`${baseUrl}`)
                .get(`/getDeviceCount/${projectDetail[0].projectCode[1]}`)
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect("Content-Type", /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should get project with project code", (done) => {
            request(`${baseUrl}`)
                .get(`/${projectDetail[0].projectCode[1]}`)
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect("Content-Type", /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

    });
    describe("POST request", () => {
        // run this route just for testing 
        // second request it will not work coz it will create a entry in database 
        // delete the database last entry to re run this testin route

        // it("should create project", (done) => {
        //     request(`${baseUrl}`)
        //         .post(`/`)
        //         .set(
        //             "Authorization",
        //             `Bearer ${activeToken} `
        //         )
        //         .send({ name: projectDetail[0].newProjetDetails.name, description: projectDetail[0].newProjetDetails.description, device_type: projectDetail[0].newProjetDetails.device_type })
        //         .expect("Content-Type", /json/)
        //         .expect(201)
        //         .end(function (err, res) {
        //             if (err) return done(err);
        //             return done();
        //         });
        // });
        it("should not create project where project name, project description , project type but auth token is has not sent in header", (done) => {
            request(`${baseUrl}`)
                .post(`/`)
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .send({ name: "", description: "", device_type: "" })
                .expect("Content-Type", /json/)
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should not create project where project name, project description , project type are empty  or invalid", (done) => {
            request(`${baseUrl}`)
                .post(`/`)
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .send({ name: "", description: "", device_type: "" })
                .expect("Content-Type", /json/)
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });
    });
    // describe("PUT request", () => {

    //     it("should update project with projectcode", (done) => {
    //         request(`${baseUrl}`)
    //             .put(`/${projectDetail[0].projectCode[3]}`)
    //             .set(
    //                 "Authorization",
    //                 `Bearer ${activeToken} `
    //             )
    //             .send({ name: projectDetail[0].newProjetDetails.name, device_type: ["type3"] })
    //             .expect("Content-Type", /json/)
    //             .expect(400)
    //             .end(function (err, res) {
    //                 console.log(res)
    //                 if (err) return done(err);
    //                 return done();
    //             });
    //     });

    //     it("should not add email with  project type where email is not valid or empty", (done) => {
    //         request(`${baseUrl}`)
    //             .put(`/updateEmail/${projectDetail[0].projectCode[0]}`)
    //             .set(
    //                 "Authorization",
    //                 `Bearer ${activeToken} `
    //             )
    //             .send({ email: "" })
    //             .expect("Content-Type", /json/)
    //             .expect(400)
    //             .end(function (err, res) {
    //                 if (err) return done(err);
    //                 return done();
    //             });
    //     });

    //     it("should add email with  project type", (done) => {
    //         request(`${baseUrl}`)
    //             .put(`/updateEmail/${projectDetail[0].projectCode[0]}`)
    //             .set(
    //                 "Authorization",
    //                 `Bearer ${activeToken} `
    //             )
    //             .send({ email: projectDetail[0].email })
    //             .expect("Content-Type", /json/)
    //             .expect(200)
    //             .end(function (err, res) {
    //                 if (err) return done(err);
    //                 return done();
    //             });
    //     });

    // });
});
