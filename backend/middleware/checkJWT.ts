import jwks = require('jwks-rsa');
import * as jwt from 'express-jwt';

export const checkJWT = jwt.expressjwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-zl-5ep6x.eu.auth0.com/.well-known/jwks.json'
  }) as jwt.GetVerificationKey,
  audience: 'https://test.api',
  issuer: 'https://dev-zl-5ep6x.eu.auth0.com/',
  algorithms: ['RS256']
});