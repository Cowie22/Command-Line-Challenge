const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(cors());


const PORT = process.env.PORT || 2222;



app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});
