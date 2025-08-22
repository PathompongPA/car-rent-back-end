const fs = require('fs');
const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser')
const cors = require('cors');
const router = require('./routers');
const middleware = require('./middlewares');
const { getFacebookReviews } = require('./utility');

const uploadsPath = path.resolve(__dirname, '../uploads');
const wwwPath = path.resolve(__dirname, '../src/www/car-rent-front-end');

const app = express();
app.use(cookieParser())
app.use(middleware.logging)
app.use(middleware.responseHelper)
app.use(cors({
    origin: true,
    credentials: true
}))
app.get('/api/reviews', async (req, res) => {
    const filePath = path.join(__dirname, 'reviews_formatted_date.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('API Error:', err);
            return res.status(500).json({ message: 'ไม่สามารถอ่านไฟล์ข้อมูลได้' });
        }
        const reviews = JSON.parse(data);
        res.json(reviews);
    });
});

app.post('/api/reviews', async (req, res) => {
    console.log('ได้รับ Request จาก Frontend, เริ่มทำการ Scrape...');
    try {
        // ดึง URL จาก query string ถ้ามี (เผื่ออนาคต) เช่น /api/scrape-reviews?url=...
        const urlToScrape = req.query.url || 'https://web.facebook.com/profile.php?id=61563865480190&sk=reviews';
        const reviews = await getFacebookReviews(urlToScrape);
        fs.writeFileSync('reviews_formatted_date.json', JSON.stringify(reviews, null, 2), 'utf-8');
        res.json(reviews); // ส่งข้อมูลกลับไปให้ React ในรูปแบบ JSON
    } catch (error) {
        console.error('เกิดข้อผิดพลาดใน API:', error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดฝั่งเซิร์ฟเวอร์', error: error.message });
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(wwwPath));
app.use("/api", router.v1)
app.use('/uploads', express.static(uploadsPath));

module.exports = { app }