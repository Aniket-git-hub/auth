import { getEnvironmentVariable } from '../utils/Helper';

function adminAuthMiddleware(req, res, next) {
    const adminPassword = getEnvironmentVariable('ADMIN_PASSWORD');

    if (!adminPassword) {
        return res
            .status(500)
            .json({ error: 'Admin password not configured.' });
    }

    const providedPassword = req.headers['admin-password'];

    if (!providedPassword || providedPassword !== adminPassword) {
        return res
            .status(401)
            .json({ error: 'Unauthorized. Admin password is required.' });
    }

    next();
}

export default adminAuthMiddleware;
