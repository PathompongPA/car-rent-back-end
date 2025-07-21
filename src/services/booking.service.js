const model = require("../model")
const utility = require("../utility")
const dayjs = require('dayjs');
const customer = require("./customer.service");

const booking = {

    create: async (req) => {
        // const files = req.files
        // const { slip } = files;
        let body = { ...req.body }
        let isNewCustomer = body.customerId === ""
        if (isNewCustomer) {
            let newCustomer = await customer.create(req)
            console.log("some", newCustomer.id)
            body.customerId = newCustomer.id
        }
        // let fileNameSlip = await utility.file.genFileName(slip)
        return await model.BOOKING.create(body)

    },
    read: async (req) => {
        const bookings = await model.BOOKING.findAll({
            attributes: { exclude: ['createdAt', "carId", "customerId"] },
            include: [
                {
                    model: model.CAR,
                    attributes: ['carName', "id"]

                },
                { model: model.CUSTOMER }
            ],
            where: {}
        });

        // bookings.forEach(({ checkInDate, checkOutDate }) => {
        //     const checkIn = dayjs(checkInDate);
        //     const checkOut = dayjs(checkOutDate);
        //     let d = checkIn;
        //     while (d.isBefore(checkOut) || d.isSame(checkOut)) {
        //         arrayBooking.push(d.format("YYYY-MM-DD"));
        //         d = d.add(1, "day");
        //     }
        // });

        // arrayBooking = [...new Set(arrayBooking)];

        return bookings
        // { booking: arrayBooking };
    },

    update: async (req) => {
        let body = { ...req.body }
        let file = req.files

        let brand = await model.BRAND.findOne(
            {
                where: { id: body.id },
                attributes: { exclude: ['createdAt', 'updatedAt', "isDelete"] }
            }
        )

        if (file.length > 0) {
            let fileName = await utility.file.genFileName(file)
            utility.file.deleteFile(brand.brandImg)
            utility.file.saveFile(fileName, file)
            body.brandImg = fileName[0]
        }

        await model.BRAND.update(
            body,
            {
                where: { id: body.id }
            }
        )

    },

    delete: async (req) => {
        console.log(req.body)
        const result = await model.BRAND.findOne({ where: req.body })
        let fileName = result.brandImg
        utility.file.deleteFile(fileName)
        await result.destroy()

    }
}

module.exports = booking

function genUrlImage(item) {
    const baseUrl = `http://${process.env.SERVER_IP}:9999/uploads`;
    const data = item.toJSON()
    return { ...data, brandImg: [`${baseUrl}/${data.brandImg}`] }
}