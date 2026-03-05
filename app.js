const express = require('express');
const app = express();
const port = 8080;

const envName = process.env.ENV_NAME || "unknown";
const imageInfo = process.env.IMAGE_INFO || "local";

app.get('/', (req, res) => {
  res.json({
    message: `hello - i am ${envName}`,
    image: imageInfo,
    deployed_at: new Date().toISOString()
  });
});

app.listen(port, () => console.log(`API on port ${port}`));