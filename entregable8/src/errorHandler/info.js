export const generateUserErrorInfo = (user) => {
	return `One or more properties of the user were incomplete or not valid`;
}

export const generateDatabaseErrorInfo = (operation, table) => {
	return `Error while performing ${operation} on the ${table} table in the database`;
}

export const generateAuthenticationErrorInfo = () => {
	return `Authentication failed. Invalid username or password.`;
}

export const generatePermissionErrorInfo = (action, resource) => {
	return `Permission denied. You don't have the necessary privileges to ${action} the ${resource}.`;
}

export const generateFileUploadErrorInfo = () => {
	return `Error while uploading the file. Please try again.`;
}

export const generateNotFoundErrorInfo = (resource) => {
	return `The requested ${resource} was not found.`;
}

export const generateValidationErrorInfo = (details) => {
	return `Validation failed. ${details}`;
}

export const generateServerErrorInfo = () => {
	return `Internal server error. Please contact the administrator.`;
}