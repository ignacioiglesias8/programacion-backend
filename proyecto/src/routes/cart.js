import { Router} from 'express';

const router = Router();

const cart = [
    {
        name: "Nacho",
        lastname: "Iglesias",
    }
];

router.get('/', (req,res)=>{
    res.send(cart)
})

router.post('/', (req,res)=> {
    const itemCart = {
        name: req.body.name ?? 'Sin nombre',
        lastname : req.body.lastname ?? 'Sin curso',
    }

    cart.push(itemCart);

    res.status(201).send ('Usuario creado correctamente')
})

export default router;