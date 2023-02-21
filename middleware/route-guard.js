const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.redirect('/auth/login');
    }
    next();
};

const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
        return res.redirect('/');
    }
    next();
};

const exposeUserToView = (req, res, next) => {
    if (req.session.currentUser) {
        res.locals.currentUser = req.session.currentUser
        res.locals.isLoggedIn = true
    }
    next();
};

module.exports = { isLoggedIn, isLoggedOut, exposeUserToView };