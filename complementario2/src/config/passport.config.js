import passport from 'passport';
import local from 'passport-local';
import { userModel } from '../dao/db/models/users.model.js';
import {createHash, isValidPassword} from '../functions/bcrypt.js';
import GitHubStrategy from 'passport-github2';
import CartManager from '../dao/db/CartManagerDB.js';

const cartManager = new CartManager();

const localStratergy = local.Strategy;
const initializatePassport = () => {
    passport.use('register', new localStratergy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;

            try {
                let user = await userModel.findOne({ email: username});
                if(user) {
                    console.log('User already exists');
                    return done(null, false);
                }

                const newUser = {
                    first_name, 
                    last_name, 
                    email, 
                    age, 
                    password: createHash(password),
                    cart: [
                        {
                            cartInfo: await cartManager.createCart(),
                        }
                    ]
                    
                };
                let result = await userModel.create(newUser);

                return done(null, result);
            } catch (error) {
                return done("Error al registrar usuario: " + error);
            }
        }
    ))

    passport.use('login', new localStratergy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                const adminUser = {
                    first_name: 'Admin',
                    last_name: 'Coder',
                    email: 'adminCoder@coder.com',
                    password: 'adminCod3r123',
                    age: 0,
                    role: 'admin'
                }
                
                if (username === adminUser.email && password === adminUser.password) {
                    return done(null, adminUser);
                } else {
                    const user = await userModel.findOne({ email: username });
                    if (!user) {
                        console.log('User does not exist');
                        return done(null, false);
                    }
                    if (!isValidPassword(user, password)) {
                        return done(null, false);
                    }
                    return done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));
    
    passport.use(
        'github',
        new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    },

    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("este es el profile", profile); 
            let user = await userModel.findOne({email: profile._json.email})
            if(!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    age: '',
                    password: '',
                    role: 'user',
                }
                let result = await userModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch(error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

export default initializatePassport;