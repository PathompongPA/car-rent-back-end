// const puppeteer = require('puppeteer');
// const fs = require('fs')
// async function getFacebookReviews(pageUrl) {
//     console.log("🚀 ภารกิจสุดท้ายที่สมบูรณ์แบบ: แปลงวันที่ และรักษาความเป็นส่วนตัว");
//     const browser = await puppeteer.launch({
//         executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
//         headless: false,
//         args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-notifications'],
//     });

//     const page = await browser.newPage();
//     await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

//     const cookiesPath = './cookies.json';
//     if (fs.existsSync(cookiesPath)) {
//         console.log("🍪 พบไฟล์ cookies, กำลังโหลด...");
//         const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf8'));
//         await page.setCookie(...cookies);
//     }

//     try {
//         if (!pageUrl) throw new Error("❗ กรุณาระบุ URL ของเพจ");

//         console.log("🔄 กำลังโหลดหน้าเพจ:", pageUrl);
//         await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 0 });

//         try {
//             await page.waitForSelector('div[aria-label="Close"]', { timeout: 5000 });
//             await page.click('div[aria-label="Close"]');
//             console.log("✔️ ปิด Popup เรียบร้อย");
//         } catch (e) {
//             console.log("ℹ️ ไม่พบ Popup ให้ปิด");
//         }

//         console.log("⏳ เริ่มการ scroll และเก็บข้อมูล...");

//         const allReviews = new Map();
//         let sameCount = 0;
//         const maxSameCount = 5;

//         for (let i = 0; i < 100; i++) {
//             const previousSize = allReviews.size;

//             // ✨ ส่วนที่อัปเดต: เพิ่มฟังก์ชันแปลงวันที่ภายใน page.evaluate ✨
//             const currentReviewsOnPage = await page.evaluate(() => {
//                 // ฟังก์ชันสำหรับแปลงชื่อเดือนไทยเป็นเลขเดือน
//                 const thaiMonthToNumber = (month) => {
//                     const months = {
//                         'มกราคม': '01', 'กุมภาพันธ์': '02', 'มีนาคม': '03',
//                         'เมษายน': '04', 'พฤษภาคม': '05', 'มิถุนายน': '06',
//                         'กรกฎาคม': '07', 'สิงหาคม': '08', 'กันยายน': '09',
//                         'ตุลาคม': '10', 'พฤศจิกายน': '11', 'ธันวาคม': '12'
//                     };
//                     return months[month] || null;
//                 };

//                 const results = [];
//                 const articles = document.querySelectorAll('[role="article"]');
//                 for (const article of articles) {
//                     const textEl = article.querySelector('[data-ad-preview="message"] div[dir="auto"]');
//                     const text = textEl?.innerText?.trim();
//                     if (!text || text.length < 5) continue;

//                     const nameEl = article.querySelector('h2 a[role="link"]');
//                     const name = nameEl?.innerText?.trim() || 'ไม่ทราบชื่อ';

//                     const timeEl = article.querySelector('a[href*="permalink.php"], a[href*="/posts/"]');
//                     const originalTime = timeEl?.innerText?.trim() || 'ไม่ทราบเวลา';

//                     // --- ส่วนการแปลงวันที่ ---
//                     let formattedTime = originalTime;
//                     const timeParts = originalTime.split(' ');
//                     if (timeParts.length === 3) {
//                         const day = timeParts[0].padStart(2, '0');
//                         const month = thaiMonthToNumber(timeParts[1]);
//                         const year = timeParts[2];
//                         if (day && month && year) {
//                             formattedTime = `${day}/${month}/${year}`;
//                         }
//                     }
//                     // --------------------------

//                     const picEl = article.querySelector('svg image');
//                     const profilePicUrl = picEl?.getAttribute('xlink:href') || null;

//                     const key = `${name}-${originalTime}-${text.slice(0, 30)}`;
//                     // ส่ง `formattedTime` ที่แปลงแล้วเข้าไปแทน
//                     results.push({ key, name, time: formattedTime, text, profilePicUrl });
//                 }
//                 return results;
//             });

//             for (const review of currentReviewsOnPage) {
//                 if (!allReviews.has(review.key)) {
//                     allReviews.set(review.key, {
//                         name: review.name,
//                         time: review.time, // เก็บเวลาที่แปลง format แล้ว
//                         text: review.text,
//                         profilePicUrl: review.profilePicUrl
//                     });
//                 }
//             }

//             if (allReviews.size > previousSize) {
//                 sameCount = 0;
//                 console.log(`...✅ เก็บรีวิวได้ ${allReviews.size} รายการแล้ว, scroll ต่อ...`);
//             } else {
//                 sameCount++;
//                 console.log(`...รอบที่ ${i + 1}: ไม่มีรีวิวใหม่เพิ่ม (ครั้งที่ ${sameCount})`);
//             }

//             if (sameCount >= maxSameCount) {
//                 console.log("⏹️ หยุด scroll: ไม่มีรีวิวใหม่ๆ เพิ่มขึ้นแล้ว");
//                 break;
//             }

//             await page.evaluate('window.scrollBy(0, window.innerHeight)');
//             await new Promise(resolve => setTimeout(resolve, 2000));
//         }

//         const finalReviews = Array.from(allReviews.values());
//         return finalReviews;

//     } catch (err) {
//         console.error("❌ เกิดข้อผิดพลาด:", err);
//         await page.screenshot({ path: 'error_screenshot.png' });
//         console.log("📸 บันทึกภาพหน้าจอที่ error_screenshot.png");
//         return [];
//     } finally {
//         await browser.close();
//         console.log("✅ ปิดเบราว์เซอร์เรียบร้อย");
//     }
// }

// module.exports = getFacebookReviews;
// // export default async function getReview() {
// //     const url = 'https://web.facebook.com/profile.php?id=61563865480190&sk=reviews';
// //     const reviews = await getFacebookReviews(url);

// //     console.log(`\n🎉🎉🎉 ภารกิจสำเร็จ! ดึงรีวิว (พร้อมแปลงวันที่) ได้ทั้งหมด: ${reviews.length} รายการ 🎉🎉🎉`);
// //     console.dir(reviews, { depth: null });

// //     return reviews;
// // fs.writeFileSync('reviews_formatted_date.json', JSON.stringify(reviews, null, 2), 'utf-8');
// // console.log("💾 บันทึกผลลัพธ์ลงในไฟล์ reviews_formatted_date.json สำเร็จ!");

// // }

const puppeteer = require('puppeteer');
const fs = require('fs')
// *** ไม่ต้อง require axios แล้ว ***

async function getFacebookReviews(pageUrl) {
    console.log("🚀 ภารกิจสุดท้ายที่สมบูรณ์แบบ: แปลงวันที่ และโหลดรูปเป็น Base64 (ด้วย Fetch API)");

    // ฟังก์ชันที่ใช้ในฝั่ง Node.js
    const urlToBase64InBrowser = (url) => {
        if (!url) return null;
        return `
            (async () => {
                try {
                    const response = await fetch('${url}');
                    // ตรวจสอบสถานะการตอบกลับ
                    if (!response.ok) {
                        return null;
                    }
                    
                    // แปลง Response Stream เป็น ArrayBuffer
                    const buffer = await response.arrayBuffer(); 

                    // แปลง ArrayBuffer เป็น Base64 
                    // (ทำได้ง่ายใน Node.js แต่ในเบราว์เซอร์ต้องใช้ FileReader)
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result); // ผลลัพธ์คือ Base64 string
                        reader.readAsDataURL(new Blob([buffer])); // สร้าง Blob จาก ArrayBuffer
                    });

                } catch (error) {
                    return null;
                }
            })()
        `;
    };

    // ตั้งค่า Puppeteer
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-notifications'],
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // โหลด Cookies
    const cookiesPath = './cookies.json';
    if (fs.existsSync(cookiesPath)) {
        console.log("🍪 พบไฟล์ cookies, กำลังโหลด...");
        const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf8'));
        await page.setCookie(...cookies);
    }

    try {
        if (!pageUrl) throw new Error("❗ กรุณาระบุ URL ของเพจ");

        console.log("🔄 กำลังโหลดหน้าเพจ:", pageUrl);
        await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 0 });

        // ปิด Popup
        try {
            await page.waitForSelector('div[aria-label="Close"]', { timeout: 5000 });
            await page.click('div[aria-label="Close"]');
            console.log("✔️ ปิด Popup เรียบร้อย");
        } catch (e) {
            console.log("ℹ️ ไม่พบ Popup ให้ปิด");
        }

        console.log("⏳ เริ่มการ scroll และเก็บข้อมูล...");

        const allReviews = new Map();
        let sameCount = 0;
        const maxSameCount = 5;
        let lastProfilePicUrl = null; // สำหรับติดตาม URL รูปโปรไฟล์ล่าสุด

        for (let i = 0; i < 100; i++) {
            const previousSize = allReviews.size;

            // ✨ ส่วนที่อัปเดต: ใช้ page.evaluate ดึงข้อมูลและแปลงรูปเป็น Base64 ภายในเบราว์เซอร์
            const reviewsOnPage = await page.evaluate(async () => { // **ต้องใช้ async function**

                // ฟังก์ชันสำหรับแปลงชื่อเดือนไทยเป็นเลขเดือน
                const thaiMonthToNumber = (month) => {
                    // ... (ฟังก์ชันเดิม) ...
                    const months = {
                        'มกราคม': '01', 'กุมภาพันธ์': '02', 'มีนาคม': '03',
                        'เมษายน': '04', 'พฤษภาคม': '05', 'มิถุนายน': '06',
                        'กรกฎาคม': '07', 'สิงหาคม': '08', 'กันยายน': '09',
                        'ตุลาคม': '10', 'พฤศจิกายน': '11', 'ธันวาคม': '12'
                    };
                    return months[month] || null;
                };

                // **ฟังก์ชันโหลดและแปลง URL เป็น Base64 ภายในเบราว์เซอร์**
                const urlToBase64 = async (url) => {
                    if (!url) return null;
                    try {
                        const response = await fetch(url);
                        if (!response.ok) {
                            // console.log(`Fetch Error: ${response.status} for ${url}`);
                            return null;
                        }

                        const buffer = await response.arrayBuffer();
                        return new Promise((resolve) => {
                            const reader = new FileReader();
                            // reader.result จะอยู่ในรูปแบบ data:image/...;base64,...
                            reader.onloadend = () => resolve(reader.result);
                            reader.readAsDataURL(new Blob([buffer]));
                        });
                    } catch (error) {
                        // console.error("URL to Base64 failed:", error);
                        return null;
                    }
                };

                const results = [];
                const articles = document.querySelectorAll('[role="article"]');
                // ใช้ Promise.all เพื่อทำการ fetch รูปภาพพร้อมกันทั้งหมด
                const reviewPromises = Array.from(articles).map(async (article) => {
                    const textEl = article.querySelector('[data-ad-preview="message"] div[dir="auto"]');
                    const text = textEl?.innerText?.trim();
                    if (!text || text.length < 5) return null;

                    const nameEl = article.querySelector('h2 a[role="link"]');
                    const name = nameEl?.innerText?.trim() || 'ไม่ทราบชื่อ';

                    const timeEl = article.querySelector('a[href*="permalink.php"], a[href*="/posts/"]');
                    const originalTime = timeEl?.innerText?.trim() || 'ไม่ทราบเวลา';

                    // ส่วนการแปลงวันที่
                    let formattedTime = originalTime;
                    const timeParts = originalTime.split(' ');
                    if (timeParts.length === 3) {
                        const day = timeParts[0].padStart(2, '0');
                        const month = thaiMonthToNumber(timeParts[1]);
                        const year = timeParts[2];
                        if (day && month && year) {
                            formattedTime = `${day}/${month}/${year}`;
                        }
                    }

                    // ดึง URL รูปภาพ
                    const picEl = article.querySelector('svg image');
                    const profilePicUrl = picEl?.getAttribute('xlink:href') || null;

                    // ✨ ส่วนที่สำคัญ: แปลงรูปภาพเป็น Base64 ในตอนนี้เลย
                    const profilePicBase64 = await urlToBase64(profilePicUrl);

                    const key = `${name}-${originalTime}-${text.slice(0, 30)}`;

                    return { key, name, time: formattedTime, text, profilePicBase64 };
                });

                // รอให้ Promise ทั้งหมดเสร็จสิ้น
                const reviews = await Promise.all(reviewPromises);
                return reviews.filter(r => r !== null); // กรองเอาเฉพาะรีวิวที่สำเร็จ
            });


            for (const review of reviewsOnPage) {
                if (!allReviews.has(review.key)) {
                    allReviews.set(review.key, {
                        name: review.name,
                        time: review.time,
                        text: review.text,
                        // profilePicBase64 ถูกแปลงมาแล้วจาก page.evaluate
                        profilePicBase64: review.profilePicBase64
                    });
                }
            }

            if (allReviews.size > previousSize) {
                sameCount = 0;
                console.log(`...✅ เก็บรีวิวได้ ${allReviews.size} รายการแล้ว (รอบที่ ${i + 1}), scroll ต่อ...`);
            } else {
                sameCount++;
                console.log(`...รอบที่ ${i + 1}: ไม่มีรีวิวใหม่เพิ่ม (ครั้งที่ ${sameCount})`);
            }

            if (sameCount >= maxSameCount) {
                console.log("⏹️ หยุด scroll: ไม่มีรีวิวใหม่ๆ เพิ่มขึ้นแล้ว");
                break;
            }

            await page.evaluate('window.scrollBy(0, window.innerHeight)');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        const finalReviews = Array.from(allReviews.values());
        return finalReviews;

    } catch (err) {
        console.error("❌ เกิดข้อผิดพลาด:", err);
        await page.screenshot({ path: 'error_screenshot.png' });
        console.log("📸 บันทึกภาพหน้าจอที่ error_screenshot.png");
        return [];
    } finally {
        await browser.close();
        console.log("✅ ปิดเบราว์เซอร์เรียบร้อย");
    }
}

module.exports = getFacebookReviews;