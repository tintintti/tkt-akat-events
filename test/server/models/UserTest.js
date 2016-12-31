const
    assert = require("better-assert"),
    User = require("../../../server/models/User");

describe("User model", function () {
    it("should not save password in plaintext", function (done) {
        User.create({
            email: "test",
            password: "lamepassword"
        }).then(user => {
            assert(user.password !== "lamepassword");
            done();
        });
    });

    describe("checkPassword", function () {
        let user;
        beforeEach('create user', function (done) {
            User.create({
                email: "test",
                password: "lamepassword"
            }).then((usr) => {
                user = usr;
                done();
            });
        });

        it("should resolve if given correct password", function (done) {
            user.checkPassword("lamepassword").then(function () {
                assert(true);
                done();
            }).catch(function () {
                assert(false);
                done();
            });
        });

        it("should reject if given incorrect password", function (done) {
            user.checkPassword("wrongpassword").then(() => {
                assert(false);
                done();
            }).catch(() => {
                assert(true);
                done();
            })
        });
    })
});
