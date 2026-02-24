```mermaid
erDiagram

offer{
    offerId string pk
    carId string fk
    price int
    day  int
}

customer {
    customerId  uuid pk
    name string
    lastName string
    drivingLicense string
    idCard string
    phone number
    facebook string
}

paymentType {
    paymentType sting pk
    description string
}

payment{
    paymentId string pk
    paymentTypeId sting fk
    bookingId uuid fk
    date date
    slip string
}

booking{
    bookingId uuid pk
    carId uuid fk
    customerId uuid fk
    checkInDate date
    checkOutDate date
}

model {
    id uuid pk
    brandId uuid fk
    type  string
}

car{
    carId uuid pk
    modal string fk
    name string
    description string
}

img{
    imgId uuid pk
    carId uuid fk
    img string
}
brand{
    brandId uuid pk
    brandName string
    brandImg string
}

infoWeb{
}


car ||--|{ booking : has
customer ||--|{ booking: has
model ||--|{ img : has
infoWeb ||--|{ blog :has
brand ||--|{ model:has
booking ||--|{ payment : has
paymentType ||--|{ payment: has
car||--|{ offer:has
model||--|{ car:has
```
