const CookieToken = (user, res, status = 200) => {
    const token = user.generateToken();

    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    return res.status(status).cookie('Shopscape', token, options).json({
        success: true,
        token: token,
        user,
    });
};

module.exports = CookieToken;