import passport from 'passport';
require('dotenv/config');
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UsersRepo } from '../database/repositories/Users';
import { generateJwt, hashString, isHashValid } from '../helpers/utilities';
import { processLogin, processSignup } from '../modules/auth/auth.service';
import { status, userRole } from '../modules/auth/auth.constant';
import { UnAuthorizedError } from '../errors';
import { ProcessSignupParams } from '../modules/auth/auth.interface';
const userRepo = new UsersRepo();

export const processGoogleSSO = () => {
  const GOOGLE_CALLBACK_URL = 'http://localhost:7000/v1/auth/callback';

  passport.use(
    new GoogleStrategy(
      {
        clientID: '1044323825522-cn6n7hmdhpjahn7vdgaogfcunts3thno.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: GOOGLE_CALLBACK_URL,
        passReqToCallback: true
      },
      async (request, accessToken, refreshToken, profile, cb) => {
        if (!profile.emails || profile.emails.length === 0) {
          return cb(new UnAuthorizedError('No email found in Google profile'));
        }
        try {
          const googleUser: ProcessSignupParams = {
            username: profile.name?.givenName,
            email: profile.emails[0].value,
            password: profile.id,
            walletId:"hey"
          };

          const user = await userRepo.findOne({ where: { email: googleUser.email } });
          if (!user) {
            const data = await userRepo.create(googleUser);
          }

          if (user) {
            return cb(null, user);
          }
        } catch (error: any) {
          console.error('An error occurred:', error);
          return cb(error);
        }
      }
    )
  );

  passport.serializeUser((user: any, cb) => {
    console.log('Serializing user:', user);
    cb(null, user.id);
  });

  passport.deserializeUser(async (id: string, cb) => {
    try {
      const user = await userRepo.findOne({ where: { id } });
      console.log('Deserialized user:', user);
      cb(null, user);
    } catch (err) {
      console.log('Error deserializing:', err);
      cb(err, null);
    }
  });
};
