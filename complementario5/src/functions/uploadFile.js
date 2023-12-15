export const uploadFile = async (name, folder, user) => {
    const documentInfo = {
        name: name,
        reference: `public/img/${folder}/${name}`,
        status: true,
    };
    user.documents.push(documentInfo);

    await user.save();
}