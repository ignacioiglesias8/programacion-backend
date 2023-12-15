export const uploadFile = async (name, folder, user, type) => {
    const documentInfo = {
        name: `${type}`,
        reference: `public/img/${folder}/${user._id}${type}${name}`,
        status: true,
    };
    user.documents.push(documentInfo);

    await user.save();
}