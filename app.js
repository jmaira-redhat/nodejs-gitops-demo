const express = require('express');
const app = express();
const port = 8080;

const envName = process.env.ENV_NAME || "unknown";
const imageInfo = process.env.IMAGE_INFO || "local";

// ... existing setup code
app.get('/', (req, res) => {
  res.json({
    // CHANGE THIS LINE:
    message: `Greetings! I am ${envName} - V2 is here!`, 
    image: imageInfo,
    deployed_at: new Date().toISOString()
  });
});
// ... rest of the file
app.listen(port, () => console.log(`API on port ${port}`));