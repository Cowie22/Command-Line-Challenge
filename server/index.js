const path = require('path');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(cors());


const PORT = process.env.PORT || 2222;

// const getFoodData = () => {
//   axios.get('https://data.sfgov.org/Economy-and-Community/Mobile-Food-Schedule/jjew-r69b?$select=displayName$$app_token=KBlOTi2gKbzyLr40mb0dLT0ND')
//     .then(res => {
//       console.log('get', res.data)
//       return res.data
//     })
// }

// app.get('/food', async function(req, res) {
//   const data = await getFoodData();
//   console.log(data)
//   res.send(data);
// });


app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});

// id awmznjcwrc5vkwe98k7yoniui
// secret 14nxg2hfrxmwl69bvvtz0q7wrl1pvtubhcmbeuikiy5wtohi77

//https://data.sfgov.org/Economy-and-Community/Mobile-Food-Schedule/jjew-r69b?$$app_token=KBlOTi2gKbzyLr40mb0dLT0ND