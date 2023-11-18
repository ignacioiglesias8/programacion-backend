export const authorization = (roles) =>{
    return async (req, res, next) =>{
        if(!req.user) return res.status(401).send({error:"Unauthorized"});
        if(!roles.includes(req.user.role)) return res.status(403).send({error:"No permissions"});
        next();
    }
}