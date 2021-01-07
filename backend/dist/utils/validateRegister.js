"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateRegister = (options) => {
    if (options.username.length === 0) {
        return [
            {
                field: "username",
                message: "Username cannot be empty!",
            },
        ];
    }
    if (options.username.match(/^[^a-zA-Z0-9]+$/)) {
        return [
            {
                field: "username",
                message: "Username can only contain letters and numbers!",
            },
        ];
    }
    if (!options.email.includes("@")) {
        return [
            {
                field: "email",
                message: "Invalid email!",
            },
        ];
    }
    if (options.password.length < 8) {
        return [
            {
                field: "password",
                message: "Password length must be at least 8!",
            },
        ];
    }
    if (options.password !== options.confirmPassword) {
        return [
            {
                field: "confirmPassword",
                message: "Passwords don't match!",
            },
        ];
    }
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map