const model = require("../model")
const utility = require("../utility")
const dayjs = require('dayjs');

const booking = {

    create: async (req) => {
        console.log("POST", req.body)

        const files = req.files

        let body = { ...req.body }
        let isOldCustomer = body.customerId === undefined
        console.log(isOldCustomer)
        // let filenames = await utility.file.genFileName(files)
        // body.brandImg = filenames[0]
        // return await model.BRAND.create(body).then((_res) => { utility.file.saveFile(filenames, files) })
        await model.BOOKING.create(body)
        // await model.

        return ""
    },
    read: async (req) => {
        const carId = req.query.car;
        let arrayBooking = [];

        const bookings = await model.BOOKING.findAll({
            where: {
                isDelete: false,
                carId,
            },
            attributes: ["checkInDate", "checkOutDate"]
        });

        bookings.forEach(({ checkInDate, checkOutDate }) => {
            const checkIn = dayjs(checkInDate);
            const checkOut = dayjs(checkOutDate);

            let d = checkIn;

            while (d.isBefore(checkOut) || d.isSame(checkOut)) {
                arrayBooking.push(d.format("YYYY-MM-DD"));
                d = d.add(1, "day");
            }
        });

        // unique
        arrayBooking = [...new Set(arrayBooking)];

        return { booking: arrayBooking };
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