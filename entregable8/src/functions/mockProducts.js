import { fakerDE as faker } from '@faker-js/faker';

export const generateMockProducts = () => {
    const numberOfNights = faker.number.int({ min: 3, max: 7 });
    const description = `${numberOfNights} noches`;

    const numberOfThumbnails = faker.number.int({ min: 0, max: 3 });
    const thumbnails = [];
    for (let j = 0; j < numberOfThumbnails; j++) {
        thumbnails.push(faker.image.avatar());
    }

    return {
        id: faker.database.mongodbObjectId(),
        title: faker.location.city(),
        description,
        price: parseFloat(faker.commerce.price({min: 100, max: 1000, dec: 0})),
        thumbnails,
        code: faker.commerce.isbn(10),
        stock: faker.number.int({ min: 0, max: 25 }),
        category: Math.random() < 0.5 ? 'nacional' : 'internacional',
        status: faker.datatype.boolean(),
    }
}