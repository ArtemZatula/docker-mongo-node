export function protect(req, res, next) {
    const { user } = req.session;
    if (!user) {
        return res.status(401).json({
            status: 'failure',
            message: 'Unauthorised'
        });
    }
    req.user = user;
    next();
}