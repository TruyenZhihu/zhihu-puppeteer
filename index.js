import express from "express";
import puppeteer from "puppeteer";

const app = express();

app.get("/zhihu", async (req, res) => {
  try {
    const query = req.query.q || "末世 重生 复仇";
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(`https://www.zhihu.com/search?q=${encodeURIComponent(query)}`, {
      waitUntil: "networkidle2"
    });

    const data = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".List-item"))
        .map(el => el.innerText.trim())
        .filter(Boolean);
    });

    await browser.close();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy ở cổng ${PORT}`));
