import {auth} from 'express-oauth2-jwt-bearer'

export const checkJWT = auth({
  audience: 'https://test.api',
  issuerBaseURL: `https://dev-zl-5ep6x.eu.auth0.com/`,
})