import moment from "moment";

class Auth {
    static authenticateUser(token) {
        localStorage.setItem("token", token);
    };

    static isAuthenticated() {
        let token = localStorage.getItem("token");
        if (!token)
            return false;
        let tokenPayload = token.split('.')[1];
        let expires = JSON.parse(window.atob(tokenPayload)).exp;
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
}

export default Auth;
