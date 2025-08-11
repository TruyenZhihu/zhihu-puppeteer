// index.js
import express from "express";
import fetch from "node-fetch"; // hoặc axios

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/scrape", async (req, res) => {
  try {
    const keyword = req.query.keyword || "truyện";
    const searchUrl = `https://www.zhihu.com/search?q=${encodeURIComponent(keyword)}`;

    // Ví dụ: gọi tới Zhihu (nếu site cho phép) hoặc mock dữ liệu
    const response = await fetch(searchUrl);
    const html = await response.text();

    // Ở đây bạn sẽ parse HTML để lấy link truyện
    // Tạm thời demo trả nguyên HTML về
    res.json({
      keyword,
      data: html.slice(0, 500) // cắt bớt cho nhẹ
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
