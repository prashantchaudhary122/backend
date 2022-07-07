const path = require("path")
var request = require("supertest");
var baseUrl = "http://localhost:5000/api/logger/logs";
var projectDetail = require("./server.test")
var activeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjI0MTU0MDM5ZDQxZjZhYTY3YzBjZDkzIiwianRpIjoibGhreXJTamZ2TyIsImlhdCI6MTY1NzEwMjc4NSwiZXhwIjoxNjU4Mzk4Nzg1fQ.1tiZH3cLAN2nje0dd9O2NJ4te5PfF8FBEqAvozFYFuQ'


describe('LOGS test', () => {



    describe('GET RESQUEST', () => {

        it("should not get logs with filter , project code and project type when auth token and in header", (done) => {
            request(`${baseUrl}`)
                .get(`/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should not get logs with filter , project code is invalid or not avilable in query string", (done) => {
            request(`${baseUrl}`)
                .get(`/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '' })
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should get logs with filter , project code and project type in query string", (done) => {
            request(`${baseUrl}`)
                .get(`/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });


        it("should get logs with filter , project code and project type in query string", (done) => {
            request(`${baseUrl}`)
                .get(`/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .query({ sort: 'logMsg' })
                .query({ limit: '25' })
                .query({ page: '1' })
                .query({ logType: 'error' })
                .query({ startDate: '2022-01-25' })
                .query({ endDate: '2022-04-25' })
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });


        // GET LOGS BY LOGTYPE
        it("should not get logs count with project type when auth token not in header", (done) => {
            request(`${baseUrl}`)
                .get(`/getLogsCount/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .query({ startDate: '2022-01-25' })
                .query({ endDate: '2022-04-25' })
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should not get logs count with project type when start and end day are not in the query string", (done) => {
            request(`${baseUrl}`)
                .get(`/getLogsCount/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });


        it("should not get logs count with project type when project type not in the query string", (done) => {
            request(`${baseUrl}`)
                .get(`/getLogsCount/${projectDetail[0].projectCode[1]}`)
                .query({ startDate: '2022-01-25' })
                .query({ endDate: '2022-04-25' })
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should get logs count with project type", (done) => {
            request(`${baseUrl}`)
                .get(`/getLogsCount/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .query({ startDate: '2022-01-25' })
                .query({ endDate: '2022-04-25' })
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        // DATE WISE LOGCOUNT WITH PROJECT CODE

        it("should not get datewise logs count with project type when auth token not in header", (done) => {
            request(`${baseUrl}`)
                .get(`/datewiselogcount/${projectDetail[0].projectCode[1]}`)
                .query({ startDate: '2022-01-25' })
                .query({ endDate: '2022-04-25' })
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should not get datewise logs count with project type when project type not in the query string", (done) => {
            request(`${baseUrl}`)
                .get(`/datewiselogcount/${projectDetail[0].projectCode[1]}`)
                .query({ startDate: '2022-01-25' })
                .query({ endDate: '2022-04-25' })
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should get datewise logs count with project type", (done) => {
            request(`${baseUrl}`)
                .get(`/datewiselogcount/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .query({ startDate: '2022-01-25' })
                .query({ endDate: '2022-04-25' })
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        // CREASH FREE USER DATEWISE WITH PROJECT CODE


        it("should not get crash free users datewise with project type without auth token", (done) => {
            request(`${baseUrl}`)
                .get(`/crashfree-users-datewise/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should get crash free users datewise with project type without start and end date", (done) => {
            request(`${baseUrl}`)
                .get(`/crashfree-users-datewise/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });


        it("should get crash free users datewise with project type", (done) => {
            request(`${baseUrl}`)
                .get(`/crashfree-users-datewise/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .query({ startDate: '2022-01-25' })
                .query({ endDate: '2022-04-25' })
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });


        //  GET ALERTS WITH FILTER
        it("should not get alerts with filter , project code and project type when auth token and in header", (done) => {
            request(`${baseUrl}`)
                .get(`/alerts/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should not get alerts with filter  , project code is invalid or not avilable in query string", (done) => {
            request(`${baseUrl}`)
                .get(`/alerts/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '' })
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should get alerts with filter , project code and project type in query string", (done) => {
            request(`${baseUrl}`)
                .get(`/alerts/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .query({ sort: 'logMsg' })
                .query({ limit: '25' })
                .query({ page: '1' })
                .query({ logType: 'error' })
                .query({ startDate: '2022-01-25' })
                .query({ endDate: '2022-04-25' })
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should get alerts with project type", (done) => {
            request(`${baseUrl}`)
                .get(`/alerts/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .query({ startDate: '2022-01-25' })
                .query({ endDate: '2022-04-25' })
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });


        // GET CRASHLYTICS DATA WITH PROJECT TYPE
        it("should not get crashlytics data with project type when auth token and in header", (done) => {
            request(`${baseUrl}`)
                .get(`/get-crashlytics-data/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should get crashlytics data with project type and start and end day are not in query", (done) => {
            request(`${baseUrl}`)
                .get(`/get-crashlytics-data/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .query({ logMsg: 'java.lang.Integer.parseInt(Integer.java:608' })

                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should get crashlytics data with project type", (done) => {
            request(`${baseUrl}`)
                .get(`/get-crashlytics-data/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .query({ startDate: '2022-01-01' })
                .query({ endDate: '2022-04-04' })
                .query({ logMsg: 'java.lang.Integer.parseInt(Integer.java:608' })

                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });


        // GET LOG OCCURANCE DATEWISE WITH PROJECT CODE
        it("should not get log occurance datewise with project type when auth token and in header", (done) => {
            request(`${baseUrl}`)
                .get(`/log-occurrences-datewise/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should get log occurance datewise with project type and query string with no date query string", (done) => {
            request(`${baseUrl}`)
                .get(`/log-occurrences-datewise/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .query({ logMsg: 'java.lang.Integer.parseInt(Integer.java:608' })
                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });

        it("should get log occurance datewise project type", (done) => {
            request(`${baseUrl}`)
                .get(`/log-occurrences-datewise/${projectDetail[0].projectCode[1]}`)
                .query({ projectType: '001' })
                .query({ startDate: '2022-02-12' })
                .query({ endDate: '2022-05-13' })
                .query({ logMsg: 'java.lang.Integer.parseInt(Integer.java:608' })

                .set(
                    "Authorization",
                    `Bearer ${activeToken} `
                )
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });
    })


    it("should not create log project type where file is missing or empty send in body", (done) => {
        request(`${baseUrl}`)
            .post(`/${projectDetail[0].projectCode[1]}`)
            .send({
                version: projectDetail[0].newLog.version,
                type: projectDetail[0].newLog.type,
                log: {
                    file: "",
                    date: projectDetail[0].newLog.log.date,
                    msg: projectDetail[0].newLog.log.msg,
                    type: projectDetail[0].newLog.log.type
                },
                device: {
                    did: projectDetail[0].newLog.device.did,
                    name: projectDetail[0].newLog.device.did,
                    manufacturer: projectDetail[0].newLog.device.did,
                    battery: projectDetail[0].newLog.device.battery,
                    os: {
                        name: projectDetail[0].newLog.device.os.name,
                        type: projectDetail[0].newLog.device.os.type
                    }
                }
            })

            .set(
                "Authorization",
                `Bearer ${activeToken} `
            )
            .expect(500)
            .end(function (err, res) {

                if (err) return done(err);
                return done();
            });
    });

    it("should not create log project type where date is missing or empty send in body", (done) => {
        request(`${baseUrl}`)
            .post(`/${projectDetail[0].projectCode[1]}`)
            .send({
                version: projectDetail[0].newLog.version,
                type: projectDetail[0].newLog.type,
                log: {
                    file: projectDetail[0].newLog.log.file,
                    date: "",
                    msg: projectDetail[0].newLog.log.msg,
                    type: projectDetail[0].newLog.log.type
                },
                device: {
                    did: projectDetail[0].newLog.device.did,
                    name: projectDetail[0].newLog.device.did,
                    manufacturer: projectDetail[0].newLog.device.did,
                    battery: projectDetail[0].newLog.device.battery,
                    os: {
                        name: projectDetail[0].newLog.device.os.name,
                        type: projectDetail[0].newLog.device.os.type
                    }
                }
            })
            .expect(500)
            .end(function (err, res) {

                if (err) return done(err);
                return done();
            });
    });

    it("should create log project type", (done) => {
        request(`${baseUrl}`)
            .post(`/${projectDetail[0].projectCode[1]}`)
            .send({
                version: projectDetail[0].newLog.version,
                type: projectDetail[0].newLog.type,
                log: {
                    file: projectDetail[0].newLog.log.file,
                    date: projectDetail[0].newLog.log.date,
                    msg: projectDetail[0].newLog.log.msg,
                    type: projectDetail[0].newLog.log.type
                },
                device: {
                    did: projectDetail[0].newLog.device.did,
                    name: projectDetail[0].newLog.device.did,
                    manufacturer: projectDetail[0].newLog.device.did,
                    battery: projectDetail[0].newLog.device.battery,
                    os: {
                        name: projectDetail[0].newLog.device.os.name,
                        type: projectDetail[0].newLog.device.os.type
                    }
                }
            })

            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });


    it("should not create log in v2 route project type where file is missing or empty send in body", (done) => {
        request(`${baseUrl}`)
            .post(`/v2/${projectDetail[0].projectCode[1]}`)
            .send({
                version: projectDetail[0].newLog.version,
                type: projectDetail[0].newLog.type,
                log: {
                    file: "",
                    date: projectDetail[0].newLog.log.date,
                    msg: projectDetail[0].newLog.log.msg,
                    type: projectDetail[0].newLog.log.type
                },
                device: {
                    did: projectDetail[0].newLog.device.did,
                    name: projectDetail[0].newLog.device.did,
                    manufacturer: projectDetail[0].newLog.device.did,
                    battery: projectDetail[0].newLog.device.battery,
                    os: {
                        name: projectDetail[0].newLog.device.os.name,
                        type: projectDetail[0].newLog.device.os.type
                    }
                }
            })

            .set(
                "Authorization",
                `Bearer ${activeToken} `
            )
            .expect(500)
            .end(function (err, res) {

                if (err) return done(err);
                return done();
            });
    });


    it("should not create log with v2 route", (done) => {
        request(`${baseUrl}`)
            .post(`/v2/${projectDetail[0].projectCode[1]}`)
            .send({
                version: projectDetail[0].newLog.version,
                type: projectDetail[0].newLog.type,
                log: {
                    file: projectDetail[0].newLog.log.file,
                    date: projectDetail[0].newLog.log.date,
                    msg: projectDetail[0].newLog.log.msg,
                    type: projectDetail[0].newLog.log.type
                },
                device: {
                    did: projectDetail[0].newLog.device.did,
                    name: projectDetail[0].newLog.device.did,
                    manufacturer: projectDetail[0].newLog.device.did,
                    battery: projectDetail[0].newLog.device.battery,
                    os: {
                        name: projectDetail[0].newLog.device.os.name,
                        type: projectDetail[0].newLog.device.os.type
                    }
                }
            })
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });


    it("should create log with v2 route", (done) => {
        request(`${baseUrl}`)
            .post(`/v2/${projectDetail[0].projectCode[1]}`)
            .send({
                version: projectDetail[0].newLog.version,
                type: projectDetail[0].newLog.type,
                log: {
                    file: projectDetail[0].newLog.log.file,
                    date: projectDetail[0].newLog.log.date,
                    msg: projectDetail[0].newLog.log.msg,
                    type: projectDetail[0].newLog.log.type
                },
                device: {
                    did: projectDetail[0].newLog.device.did,
                    name: projectDetail[0].newLog.device.name,
                    manufacturer: projectDetail[0].newLog.device.manufacturer,
                    battery: projectDetail[0].newLog.device.battery,
                    os: {
                        name: projectDetail[0].newLog.device.os.name,
                        type: projectDetail[0].newLog.device.os.type
                    }
                }
            })
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

    // it("should create log with v2 route with form data", (done) => {
    //     request(`${baseUrl}`)
    //         .post(`/v2/${projectDetail[0].projectCode[1]}`)
    //         .field('version', projectDetail[0].newLog.version)
    //         .field('type', projectDetail[0].newLog.type)
    //         .field('did', projectDetail[0].newLog.device.did)
    //         .field('deviceName', projectDetail[0].newLog.device.name)
    //         .field('manufacturer', projectDetail[0].newLog.device.manufacturer)
    //         .field('osName', projectDetail[0].newLog.device.os.name)
    //         .field('osType', projectDetail[0].newLog.device.os.type)
    //         .attach('filePath', path.resolve(__dirname, './img.jpg'))
    //         .expect(201)
    //         .end(function (err, res) {
    //                //             if (err) return done(err);
    //             return done();
    //         });
    // });


    it("should not create alerts project type where did not defind or invalid", (done) => {
        request(`${baseUrl}`)
            .post(`/alerts/${projectDetail[0].projectCode[1]}`)
            .send({
                did: "",
                type: projectDetail[0].alertData.type,
                ack: [
                    {
                        msg: projectDetail[0].alertData.ack[0].msg,
                        code: projectDetail[0].alertData.ack[0].code,
                        timestamp: projectDetail[0].alertData.ack[0].timestamp
                    },

                ]
            })
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

    it("should not create alerts project type where code and timestamp not defind or invalid", (done) => {
        request(`${baseUrl}`)
            .post(`/alerts/${projectDetail[0].projectCode[1]}`)
            .send({
                did: projectDetail[0].alertData.did,
                type: projectDetail[0].alertData.type,
                ack: [
                    {
                        msg: projectDetail[0].alertData.ack[0].msg,
                        code: "",
                        timestamp: ""
                    },

                ]
            })


            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

    it("should not create alerts project type where project type not defind or invalid", (done) => {
        request(`${baseUrl}`)
            .post(`/alerts/${projectDetail[0].projectCode[1]}`)
            .send({
                did: projectDetail[0].alertData.did,
                type: "",
                ack: [
                    {
                        msg: projectDetail[0].alertData.ack[0].msg,
                        code: projectDetail[0].alertData.ack[0].code,
                        timestamp: projectDetail[0].alertData.ack[0].timestamp
                    },

                ]
            })


            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });


    it("should create alerts project type", (done) => {
        request(`${baseUrl}`)
            .post(`/alerts/${projectDetail[0].projectCode[1]}`)
            .send({
                did: projectDetail[0].alertData.did,
                type: projectDetail[0].alertData.type,
                ack: [
                    {
                        msg: projectDetail[0].alertData.ack[0].msg,
                        code: projectDetail[0].alertData.ack[0].code,
                        timestamp: projectDetail[0].alertData.ack[0].timestamp
                    },

                ]
            })


            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
})
