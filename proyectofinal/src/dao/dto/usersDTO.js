export default class UsersDTO {
    constructor(users) {
        this.users = users.map(user => ({
            full_name: `${user.first_name} ${user.last_name}` ?? 'Unknown',
            username: user.email,
            role: user.role,
            cartId: user.cart[0].cartInfo._id
        }));
    }
}