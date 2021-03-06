const { validationResult } = require('express-validator');
const userService = require('../service/user-service');
const ApiError = require('../exceptions/api-errors');

class UserControllers {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);

            const { email, password } = req.body;
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Error while validate', errors.array()));
            }
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);
        } catch (e) {
            return next(e);
        }
    };

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);

        } catch (e) {
            return next(e);
        }
    };

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (e) {
            return next(e);
        }
    };

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);

            return res.redirect(process.env.NODE_ENV === 'production' ? process.env.PROD_CLIENT_URL : process.env.DEV_CLIENT_URL);
        } catch (e) {
            return next(e);
        }
    };

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);
        } catch (e) {
            return next(e);
        }
    };

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users)
        } catch (e) {
            return next(e);
        }
    };
}

module.exports = new UserControllers();
