export const uploadFile = async (folder, user, type) => {
    
    const documentInfo = {
        name: `${type}`,
        reference: `public/img/${folder}/`,
        status: true,
    };
    user.documents.push(documentInfo);

    await user.save();
}