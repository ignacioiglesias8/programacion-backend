import passport from 'passport';
import local from 'passport-local';
import {createHash, isValidPassword} from '../functions/bcrypt.js';
import GitHubStrategy from 'passport-github2';
import CartController from '../controllers/CartController.js';
import UserController from '../controllers/UserController.js';

const cartController = new CartController();
const userController = new UserController();

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
                let user = await userController.findOneUser({ email: username});
                if(user) {
                    req.logger.warning('User already exists');
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
                            cartInfo: await cartController.addCartToUser(),
                        }
                    ]
                };
                let result = await userController.createUser(newUser);

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
                    email: process.env.ADMIN_EMAIL,
                    password: process.env.ADMIN_PASSWORD,
                    age: 0,
                    role: 'admin'
                }
                
                if (username === adminUser.email && password === adminUser.password) {
                    return done(null, adminUser);
                } else {
                    const user = await userController.findOneUser({ email: username });
                    if (!user) {
                        console.error('User does not exist');
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
            callbackURL: process.env.GITHUB_CALLBACK_URL
            },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                let user = await userController.findOneUser({email: profile._json.email})
                if(!user) {
                    const currentDate = new Date();
                    currentDate.setTime(currentDate.getTime() - 3 * 60 * 60 * 1000);

                    let newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        email: profile._json.email,
                        age: '',
                        password: '',
                        cart: [
                            {
                                cartInfo: await cartController.addCartToUser(),
                            }
                        ],
                        role: 'user',
                        ticket: [],
                        documents: [],
                        last_connection: currentDate,
                    }
                    let result = await userController.createUser(newUser);
                    done(null, result);
                } else {
                    done(null, user);
                }
            } catch(error) {
                return done(error);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

export default initializatePassport;