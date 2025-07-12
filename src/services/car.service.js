const model = require("../model");
const utility = require("../utility");
const dayjs = require('dayjs');

let car = {
    create: async (req) => {
        let { carName, brandId, carDescription, offer } = { ...req.body };
        let { carImage, carThumbnail } = req.files;
        let fileThumbnail = carThumbnail
        carThumbnail = await utility.file.genFileName(carThumbnail)
        utility.file.saveFile(carThumbnail, fileThumbnail)
        let car = { carName, brandId, carDescription, carThumbnail: carThumbnail[0] }
        return await
            model.CAR.create(car)
                .then(
                    async (_res) => {
                        let carId = _res.id
                        let images = await utility.file.genFileName(carImage)
                        let arrImage = mapForeignKeyImage(images, carId)
                        let arrOffer = mapForeignKey(JSON.parse(offer), carId)
                        await model.IMG.bulkCreate(arrImage)
                        await model.OFFER.bulkCreate(arrOffer)
                        utility.file.saveFile(images, carImage)
                    })
    },
    read: async (req) => {
        let car = await model.CAR.findAll({
            order: [["carName", "ASC"]],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: model.IMG,
                    attributes: ["name"]
                },
                {
                    model: model.OFFER,
                    attributes: ["id", "offerPrice", "offerAmountDay"],
                    separate: true,
                    order: [["offerAmountDay", "ASC"]]
                },
                {
                    model: model.BRAND,
                    right: true
                },
                {
                    model: model.BOOKING,
                    attributes: ["checkInDate", "checkOutDate"]
                }
            ]
        })
            .then((res) => {
                const baseUrl = `http://${process.env.SERVER_IP}:9999/uploads/`;
                return res.map((item) => {
                    const plainItem = item.get({ plain: true });
                    return {
                        ...plainItem,
                        carThumbnail: baseUrl + item.carThumbnail,
                        Imgs: item.Imgs.map((res) => baseUrl + res.name)
                    };
                });
            });

        car.forEach((res) => {
            let arrayBooking = [];
            res.bookings.forEach(({ checkInDate, checkOutDate }) => {
                const checkIn = dayjs(checkInDate);
                const checkOut = dayjs(checkOutDate);
                let day = checkIn;
                while (day.isBefore(checkOut) || day.isSame(checkOut)) {
                    arrayBooking.push(day.format("YYYY-MM-DD"));
                    day = day.add(1, "day");
                }
            });

            res.bookedDates = arrayBooking;
        });

        return car;
    },

    update: async (req) => {
        let { carName, brandId, carDescription, offer, id } = { ...req.body };
        let { carThumbnail, carImage } = { ...req.files }
        let car = { carName, brandId, carDescription, }
        console.log("file : ", carThumbnail, carImage)

        let isUpdateCarImage = carImage !== undefined
        let isUpdateCarThumbnail = carThumbnail !== undefined


        if (isUpdateCarImage) {
            await deleteOldCarImage(id)
            await saveNewCarImage(id, carImage)
        }

        if (isUpdateCarThumbnail) {
            let fileName = await utility.file.genFileName(carThumbnail)
            car.carThumbnail = fileName[0]
            await deleteOldCarThumbnail(id)
            await saveNewCarThumbnail(fileName, carThumbnail)

        }

        await model.CAR.update(car, { where: { id: id } })
        await updateOffer(id, offer)
    },

    delete: async (req) => {
        await model.CAR.findOne(
            { where: req.body, },
        )
            .then(async (res) => {
                await res.destroy()
            })
    },
}
module.exports = car

function mapForeignKey(array, key) {
    return array.map(item => ({ ...item, "carId": key }))
}

function mapForeignKeyImage(array, key) {
    return array.map(item => ({ "name": item, "carId": key }))
}

async function deleteOldCarImage(id) {
    let oldImage = await model.IMG.findAll({ where: { carId: id } })
    for (obj in oldImage) { utility.file.deleteFile(obj.name) }
    await model.IMG.destroy({ where: { carId: id } })
}

async function saveNewCarImage(_idCar, _carImage) {
    let fileName = await utility.file.genFileName(_carImage)
    utility.file.saveFile(fileName, _carImage)
    let newImg = fileName.map((img) => { return { name: img, carId: _idCar } })
    await model.IMG.bulkCreate(newImg)
}

function saveNewCarThumbnail(_filename, _filesCarThumbnail) {
    utility.file.saveFile(_filename, _filesCarThumbnail)
}

async function deleteOldCarThumbnail(_idCar) {
    let car = await model.CAR.findByPk(_idCar)
    utility.file.deleteFile(car.carThumbnail)
}

async function updateOffer(_idCar, _offer) {
    offer = JSON.parse(_offer)
    let newOffer = offer.map((res) => { return { ...res, carId: _idCar } })
    await model.OFFER.destroy({ where: { carId: _idCar } })
    await model.OFFER.bulkCreate(newOffer)
}