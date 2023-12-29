import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const sendEmailProductDeleted = async (product, user) => {
    if (!emailRegex.test(product[0].owner)) throw new Error ('Invalid email');
    if (user[0].role === "premium"){
        const email = await transport.sendMail({
            from: 'Ecommerce <ignacioiglesias8@gmail.com>',
            to: product[0].owner,
            subject: 'Producto eliminado',
            html:   `<div>
                        <h1>Producto eliminado</h1>
                        <p>El producto ${product[0].title} con Id: ${product[0]._id}
                        ha sido eliminado del sistema</p>
                    </div>`,
        })
        return email
    }

    return email;
}