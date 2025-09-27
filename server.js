// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const BAKONG_TOKEN =
  process.env.bakong_token_key ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMDdkZDY4N2QzZGJmNDcwMSJ9LCJpYXQiOjE3NTg4NTUzNTQsImV4cCI6MTc2NjYzMTM1NH0.2Kok3ZF_jP4BuOBBAVm5fESY8RIoa7Pp7uxUNkJiTBI";

app.post("/api/check-transaction", async (req, res) => {
  const { md5 } = req.body;
  if (!md5) return res.status(400).json({ error: "MD5 required" });

  try {
    const response = await axios.post(
      "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5",
      { md5 },
      {
        headers: {
          Authorization: `Bearer ${BAKONG_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message, data: err.response?.data });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
