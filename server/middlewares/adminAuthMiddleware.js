const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const verifyAdmin = (req, res, next) => {
    const accessToken = req.headers.accesstoken;
    console.log("accessToken:",accessToken)
    try {
        if (!accessToken) {
            return res.status(403).json({ error: 'Verification failed' });
        }

        jwt.verify(accessToken,process.env.SECRET_KEY, (err, user) => {
            if (err) {
                console.error('Verification error:', err);
                return res.status(403).json({ error: 'Verification failed, timeout Please login again' });
            }
            // If verification is successful, you can optionally attach the user to the request object
            req.user = user;
            next(); // Proceed to the next middleware or route handler
        });
    } catch (err) {
        console.error('Error in verifyAdmin:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = { verifyAdmin }