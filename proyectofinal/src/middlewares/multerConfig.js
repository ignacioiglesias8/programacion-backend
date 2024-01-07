import multer from 'multer';
import UserController from '../controllers/UserController.js';
import __dirname from '../utils.js';

const userController = new UserController();

const storage = multer.diskStorage({
    destination: async function(req, file, cb) {
        const userId = req.params.uid;
        const user = await userController.findOneUser({ _id: userId });

        if (!user) {
            cb(new Error('Usuario no encontrado'));
            return;
        }

        let destinationFolder;

        const routeType = req.route.path.split('/')[2];
        switch (routeType) {
            case 'profiles':
                destinationFolder = 'profiles';
                break;
            case 'products':
                destinationFolder = 'products';
                break;
            case 'documents':
                destinationFolder = 'documents';
                break;
            default:
                destinationFolder = '';
        }

        cb(null, __dirname + `../../public/img/${destinationFolder}`);
        
    },
    filename: function(req,file,cb){
        const userId = req.params.uid;
        const date = req.currentDate

        const customFileName = `${userId}_${date}_${file.originalname}`;

        cb(null,customFileName)
    }
});  

export const uploader = multer({storage}) 

export const getCurrentDate = (req, res, next) => {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() - 3 * 60 * 60 * 1000);
    req.currentDate = currentDate.toISOString().replace(/[-T:\.Z]/g, "");
    next();
};