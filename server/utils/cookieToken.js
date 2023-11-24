const CookieToken = (user, res, status = 200) => {
    const token = user.generateToken();

    return res.status(status).json({
        success: true,
        token: token,
        user,
    });
};

module.exports = CookieToken;