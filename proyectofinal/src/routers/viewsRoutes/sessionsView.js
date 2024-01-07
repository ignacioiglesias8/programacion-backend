import { Router } from 'express';
import UserController from '../../controllers/UserController.js';
import { createHash, isValidPassword } from '../../functions/bcrypt.js';

const router = Router();

const userController = new UserController();

router.get("/", auth, async (req, res) => {
    res.render(
        'index',
        {
            style: "index.css",
            user: req.session.user
        }
    );
});

router.get("/login", logged, async (req, res) => {

    res.render(
        'login',
        {
            style: "index.css",
            loginFailed: req.session.loginFailed ?? false,
            registerSuccess: req.session.registerSuccess ?? false
        }
    );
});

router.get("/register", logged, async (req, res) => {

    res.render(
        'register',
        {
            style: "index.css",
            registerFailed: req.session.registerFailed ?? false
        }
    );
});

//Configuración para reseteo de password

router.get("/recovery", logged, async (req, res) => {

    res.render(
        'recovery',
        {
            title: "Recuperar contraseña",
            style: "index.css",
        }
    );
});

router.get('/recovery/:token', async (req, res) => {

    const timestampDiff = Date.now() - req.session.resetToken.timestamp;

    if (timestampDiff > 3600000){
        res.redirect('/recovery');
    }

    res.redirect('/reset');
});

router.get('/reset', async (req, res) => {
    try {
        const resetTokenRaw = req.session.resetToken;
        const resetToken = JSON.stringify(resetTokenRaw);

        res.render(
            'reset', 
            { 
                title: "Introducir nueva contraseña",
                style: "index.css",
                error: req.cookies.errorMessage ?? false,
                message: req.cookies.errorMessage ?? '',
                resetToken 
            }
        );
    }catch{
        return res.redirect('/recovery');
    }
})

router.post('/reset', async (req, res) => {
    const { resetToken, newPass } = req.body;
    
    try{
        const resetTokenParse = JSON.parse(resetToken);
        const userId = resetTokenParse.user.id;

        const user = await userController.getUserByEmail(resetTokenParse.user.email)

        if (newPass.length < 3) {
            throw new Error('Contraseña inválida: Debe utilizar 3 carácteres o más');
        }

        if (isValidPassword({password: user[0].password}, newPass)) {
            throw new Error('No se puede utilizar la misma contraseña');
        }

        const newPassword = createHash(newPass);

        await userController.updateUserNewPassword(userId, newPassword);

        return res.redirect('/login');
    }catch (error) {
        req.logger.warning(error.message);
        return res.cookie('errorMessage', error.message, {maxAge: 6000}).redirect('reset');
    }
})

function auth(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
}

function logged(req, res, next) {
    if (req.session.user) {
        return res.redirect("/");
    }

    next();
}

export default router;