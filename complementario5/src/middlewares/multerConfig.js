import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req,file,cb){
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

        cb(null,`../public/img/${destinationFolder}`)
    },
    filename: function(req,file,cb){
        const userId = req.params.uid;
        const currentDate = new Date().toISOString().replace(/[-T:\.Z]/g, "");

        const customFileName = `${userId}_${currentDate}_${file.originalname}`;

        cb(null,customFileName)
    }
});  

export const uploader = multer({storage}) 