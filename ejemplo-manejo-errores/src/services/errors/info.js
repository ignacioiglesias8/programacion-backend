export const generateUserErrorInfo = (user) => {
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * first_name : needs to be a String, received ${user.first_name}
    * last_name  : needs to be a String, received ${user.last_name}
    * email      : needs to be a String, received ${user.email}`
}

export const generateUserConsultErrorInfo = (uid) => {
    return `The UID ${uid} is invalid. Exected a positive integer value`;
}