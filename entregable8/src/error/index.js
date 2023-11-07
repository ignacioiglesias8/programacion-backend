import errCodes from "./enums.js";

export default (err, req, res, next) => {
    console.log(err.code);

    switch (err.code) {
        case errCodes.INVALID_PARAMS:
            res.status(400).send({status: 'err', err: err.name});
            break;
        case errCodes.INVALID_TYPES_ERROR:
            res.status(400).send({status: 'err', err: err.name});
            break;
        default:
            res.status(500).send({status: 'err', err: 'Unhandled err'});
    }
}