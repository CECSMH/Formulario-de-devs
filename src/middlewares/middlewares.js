exports.globals = {
    isLoged(req, res, next) {
        
        if (!req.session.user) {
          return res.redirect('/');
        }
        next();
    },

    global(req, res, next) {
        res.locals.user = req.session.user;
        next();
    }
}




