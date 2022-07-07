var request = require('supertest');

// BDD -> behaviour driven development
// AAA -> act , assertion , action
var baseUrl = 'http://localhost:5000/api/logger';
var user = require("./server.test")

describe('Auth Test', () => {

    describe('POST REQUEST', () => {
        it('Missing required fields for login', function (done) {
            request(baseUrl)
                .post('/auth/login')
                .send({ email: "", password: "" })
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });
        /**
        * @route -> validation routes for login email invalid
        */

        it('should user not register where user email invalid exits', (done) => {
            request(baseUrl)
                .post(`/auth/login`)
                .send({ email: "123", password: user[0].password })
                .set('Authorization', `Bearer ${user[0].tokens[0].token}`)
                .expect('Content-Type', /json/)
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        })

        it('should user get login where all details are fine', (done) => {
            request(baseUrl)
                .post(`/auth/login`)
                .set('Authorization', `Bearer ${user[0].tokens[0].token}`)
                .expect('Content-Type', "application/json; charset=utf-8")
                .send({ email: user[0].email, password: user[0].password })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        })
        it('should user not register where user details is empty', function (done) {
            request(baseUrl)
                .post('/auth/register')
                .send({ name: "", email: "", password: "" })
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });


        it('should user not register where user already exits', (done) => {
            request(baseUrl)
                .post(`/auth/register`)
                .send({ name: user[0].name, email: user[0].email, password: user[0].password })
                .set('Authorization', `Bearer ${user[0].tokens[0].token}`)
                .expect('Content-Type', /json/)
                .expect(409)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        })

        /**
         * @route -> validation routes for register email invalid
         */

        it('should user not register where user email invalid exits', (done) => {
            request(baseUrl)
                .post(`/auth/register`)
                .send({ name: user[0].name, email: "123", password: user[0].password })
                .set('Authorization', `Bearer ${user[0].tokens[0].token}`)
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        })
        // please check if user run this route so user will create on the database as well
        /**
         * @note -> delete the created user from database and try again
         * uncomment to run this route for testing purpose only 
         */
        // it('should user register with new user', (done) => {
        //     var newUser = {
        //         name: "test",
        //         email: "test@gmail.com",
        //         password: "test1111"
        //     }
        //     request(baseUrl)
        //         .post(`/auth/register`)
        //         .send({ name: newUser.name, email: newUser.email, password: newUser.password })
        //         .set('Authorization', `Bearer ${user[0].tokens[0].token}`)
        //         .expect('Content-Type', /json/)
        //         .expect(201)

        //         .end(function (err, res) {
        //             if (err) return done(err);
        //             return done();
        //         });
        // })


        it('should user send forget password to given gmail', (done) => {
            request(baseUrl)
                .post(`/auth/forget`)
                .send({ email: user[0].email, })
                .set('Authorization', `Bearer ${user[0].tokens[0].token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        })

        it('should not update reset password with wrong otp', (done) => {
            request(baseUrl)
                .post(`/auth/resetPassword`)
                .send({
                    otp: user[0].otp, // otp from custome user created at top  -> invalid otp
                    password: user[0].password,
                    passwordVerify: user[0].passwordVerify,
                })
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        })

        it('should not update reset password where password and verify password are not equal', (done) => {
            request(baseUrl)
                .post(`/auth/resetPassword`)
                .send({
                    otp: "T1VJBX",
                    // otp from custome user created at top  -> valid otp from email for one time 
                    // need to paste the otp here from email for work this route fine
                    password: "test_",
                    passwordVerify: "test",
                })
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        })

        it('should not update reset password where password and verify password are empty', (done) => {
            500
            request(baseUrl)
                .post(`/auth/resetPassword`)
                .send({
                    otp: "T1VJBX",
                    // otp from custome user created at top  -> valid otp from email for one time 
                    // need to paste the otp here from email for work this route fine
                    password: "",
                    passwordVerify: "",
                })
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        })

        it('should  update reset password with valid otp, password and verify password', (done) => {
            request(baseUrl)
                .post(`/auth/resetPassword`)
                .send({
                    otp: "T1VJBX",
                    // otp from custome user created at top  -> valid otp from email for one time 
                    // need to paste the otp here from email for work this route fine
                    password: "test0000",
                    passwordVerify: "test0000",
                })
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        })

    })
    describe('GET REQUEST', () => {
        /**
    * @note uncomment to run this route for testing purpose only  
    * @note grab the token from activ logged in user 
    * @note change the token with different user logged in at the time 
    */
        // it('should get user logout', (done) => {
        //     request(baseUrl)
        //         .get(`/auth/logout`)
        //         .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjI0MTU0MDM5ZDQxZjZhYTY3YzBjZDkzIiwianRpIjoibkN1SWR5eFg5RCIsImlhdCI6MTY1Njk5NzY5MCwiZXhwIjoxNjU4MjkzNjkwfQ.4M5ShL91yMX7i6Qg6AwOB5WbcRDo00lPNbxHW9lSnxs`)
        //         .expect('Content-Type', /json/)
        //         .expect(200)
        //         .end(function (err, res) {
        //             if (err) return done(err);
        //             return done();
        //         });

        // })
        it('should not user get logout when user is unauthorized', (done) => {
            request(baseUrl)
                .get(`/auth/logout`)
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });

        })
        it('should get all users', (done) => {
            request(baseUrl)
                .get(`/users`)
                // grab the token from activ logged in user
                //  change the token with different user logged in at the time
                .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjI0MTU0MDM5ZDQxZjZhYTY3YzBjZDkzIiwianRpIjoiS1RkY25td3pzSyIsImlhdCI6MTY1Njk5NzgxMCwiZXhwIjoxNjU4MjkzODEwfQ.wzp-wQSoMZJEjlALqjRDyFR2UXBBxZMqxDIu1pAOJYI`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        })
    })




    describe('PUT REQUEST', () => {
        /**
* @note uncomment to run this route for testing purpose only  
* @note grab the token from activ logged in user 
* @note change the token with different user logged in at the time 
*/

        it('should not user update when token is not valid', (done) => {
            request(baseUrl)
                .put(`/users/update`)
                // grab the token from activ logged in user
                //  change the token with different user logged in at the time
                // ${user[0].tokens[0].token} = custome created token
                .set('Authorization', `Bearer ${user[0].tokens[0].token}`)
                .expect(500)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });

        })

        it('should not user update when sending email is empty', (done) => {
            request(baseUrl)
                .put(`/users/update`)
                // grab the token from activ logged in user
                //  change the token with different user logged in at the time
                // ${user[0].tokens[0].token} = custome created token
                .set('Authorization', `Bearer ${user[0].tokens[0].token}`)
                .send({ email: "" })
                .expect(500)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });

        })

        // it('should get user update', (done) => {
        //     request(baseUrl)
        //         .get(`/users/update`)
        //         // grab the token from activ logged in user
        //         //  change the token with different user logged in at the time
        //         .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjI0MTU0MDM5ZDQxZjZhYTY3YzBjZDkzIiwianRpIjoiQ2dKSlBBU09xNyIsImlhdCI6MTY1NzAwMTM2MSwiZXhwIjoxNjU4Mjk3MzYxfQ.otDQk-BCvt0Mqg-xsLmdOrUmSorSutWTi1e5GUmGM8E`)
        //         .send({ name: user[0].name })
        //         .expect('Content-Type', /json/)
        //         .expect(200)
        //         .end(function (err, res) {
        //             if (err) return done(err);
        //             return done();
        //         });

        // })

        it('should not user update user password when password and verifypassword is empty with valid token is not valid', (done) => {
            request(baseUrl)
                .put(`/users/changepassword`)
                // grab the token from activ logged in user
                //  change the token with different user logged in at the time
                .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjI0MTU0MDM5ZDQxZjZhYTY3YzBjZDkzIiwianRpIjoiVmdGSTROTVlUOCIsImlhdCI6MTY1NzAwMTcxNiwiZXhwIjoxNjU4Mjk3NzE2fQ.OhkTK6QGkErln0R7NjzyAV3_5ixMjZvigYqI1dIVal0`)
                .send({ currentPassword: "", newPassword: "" })
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });

        })

        // it('should get update user password', (done) => {
        //     request(baseUrl)
        //         .get(`/users/changepassword`)
        //         .set('Authorization', `Bearer ${user[0].tokens[0].token}`)
        //         .send({ currentPassword: user[0].password, newPassword: user[0].passwordVerify })
        //         .expect('Content-Type', /json/)
        //         .expect(200)
        //         .end(function (err, res) {
        //             if (err) return done(err);
        //             return done();
        //         });
        // })
    })
})

