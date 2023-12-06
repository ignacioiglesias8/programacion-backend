import errCodes from "../error/enums.js";

export default (err, req, res, next) => {
    req.logger.error(err);

    switch (err.code) {
        case errCodes.NOT_FOUND:
            res.status(400).send({status: 'err', err: err});
            break;
        case errCodes.INVALID_TYPES_ERROR:
            res.status(400).send({status: 'err', err: err});
            break;
        default:
            res.status(500).send({status: 'err', err: 'Unhandled err'});
    }
}