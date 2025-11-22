const { Sequelize } = require("sequelize");
const model = require("../model")
const utility = require("../utility")
const customer = require("./customer.service");

const booking = {

    create: async (req) => {
        const { slip } = req.files;
        let body = { ...req.body }
        let isNewCustomer = body.customerId === ""
        if (isNewCustomer) {
            let newCustomer = await customer.create(req)
            body.customerId = newCustomer.id
        }
        let fileNameSlip = await utility.file.genFileName(slip)
        utility.file.saveFile(fileNameSlip, slip)
        body.slip = fileNameSlip[0]
        return await model.BOOKING.create(body)

    },
    read: async (req) => {
        const bookings = await model.BOOKING.findAll({
            include: [
                {
                    model: model.CAR,
                    include: [{ model: model.BRAND }]
                },
                { model: model.CUSTOMER },
                // { model: model.BRAND },
            ],
            attributes: [
                "id",
                "isDelete",
                "checkInDate",
                "checkOutDate",
                "note",
                "slip",
                [Sequelize.col("car.id"), "carId"],
                [Sequelize.col("car.carName"), "carName"],
                [Sequelize.col("customer.id"), "customerId"],
                [Sequelize.col("customer.customerName"), "customerName"],
                [Sequelize.col("customer.customerLastName"), "customerLastName"],
                "createdAt",
                "updatedAt"
            ],
        }).then(
            (res) => {
                let protocol = req.hostname === "www.carrent88.com" ? "https" : "http"
                const baseUrl = `${protocol}://${req.hostname}/uploads/`;
                return res.length === 0 ? [] : res.map((item) => {
                    const plainItem = item.get({ plain: true });
                    return {
                        ...plainItem,
                        slip: baseUrl + item.slip,
                    };
                });
            }
        )

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
                where: { id: body.id, isDelete: false },
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
        console.log("body  : ", req.body)
        const result = await model.BOOKING.findOne({ where: req.body })
        console.log(result)
        result.isDelete = true
        await result.save()
        // let fileName = result.brandImg
        // utility.file.deleteFile(fileName)
        // await result.destroy()
    }
}

module.exports = booking

function genUrlImage(item) {
    const baseUrl = `http://${process.env.SERVER_IP}/uploads`;
    const data = item.toJSON()
    return { ...data, brandImg: [`${baseUrl}/${data.brandImg}`] }
}