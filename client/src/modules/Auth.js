import moment from "moment";
import { Base64 } from "js-base64";

class Auth {
    static authenticateUser(token) {
        localStorage.setItem("token", token);
    };

    static isAuthenticated() {
        let token = localStorage.getItem("token");
        if (!token)
            return false;
        let tokenPayload = token.split('.')[1];

        let expires = JSON.parse(Base64.decode(tokenPayload)).exp;
        if (moment().isAfter(moment.unix(expires))) {
            localStorage.removeItem("token");
            return false;
        }
        return true;
    };

    static deauthenticateUser() {
        localStorage.removeItem("token");
    };

    static getToken() {
        return localStorage.getItem("token");
    };

    static getUser() {
        let token = localStorage.getItem("token");
        if (!token || !this.isAuthenticated())
            return;
        let payload = token.split('.')[1];
        let user = JSON.parse(Base64.decode(payload)).user;
        return user;
    }
}

export default Auth;
