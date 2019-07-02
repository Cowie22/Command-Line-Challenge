const axios = require('axios');
// Sets up readline for input and output based on user input
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colors the food truck results in the terminal so that they are easily identified
const colors = require('colors/safe');
colors.setTheme({
  title: ['cyan', 'underline', 'bold'],
  value: 'green',
});

// URL and query parameters for the API with pertinent data
const URL = 'https://data.sfgov.org/resource/jjew-r69b.json?$$app_token=KBlOTi2gKbzyLr40mb0dLT0ND';
// Creates new date in order to get the proper data on program run
const newDate = new Date();
// Formats the data into an array so that real day names can be compared to the API data
const weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
// Defines the current day so that it can be compared with API data
const currentDay = weekday[newDate.getDay()];

// Gets the current time and formats to military time just grabbing the hours
const hours = newDate.getHours();
// const formattedHours = hours < 12 ? `${hours}AM` : hours === 12 ? `${hours}PM` : `${hours - 12}PM`;

// Helper function used to format the API starttime and endtime, so that it can
// Be compared to const hours above
const formatTime = (timeStr) => {
  return timeStr.includes('12PM') ? parseInt(timeStr.slice(0, 2)) :
  timeStr.includes('PM') && timeStr.length === 3 ? parseInt(timeStr.slice(0, 1)) + 12 :
  timeStr.includes('PM') && timeStr.length === 4 ? parseInt(timeStr.slice(0, 2)) + 12 :
  timeStr.includes('12AM') ? parseInt(timeStr.slice(0, 2)) - 12 :
  timeStr.includes('AM') && timeStr.length === 3 ? parseInt(timeStr.slice(0, 1)) :
  parseInt(timeStr.slice(0, 2));
}

// Holds all of the food trucks that match the proper date and time (Open food trucks)
let displayArr = [];
// Main function for the entire program.  Handles which food trucks are displayed in the terminal
getTruckData = () => {
  axios.get(URL)
    .then(res => {
      // Sorts the API data alphabetically
      const sortedData = res.data.sort((a, b) => {
        let textA = a.applicant.toUpperCase();
        let textB = b.applicant.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      sortedData.filter((foodTruck, i) => {
        // Destructuring so that I don't have to write 'foodTruck.' every time it needs to be used.
        const { starttime, endtime, dayofweekstr, applicant, location } = foodTruck;
        // Formats start and end times using helper function declared above
        let formatStartTime = formatTime(starttime);
        let formatEndTime = formatTime(endtime);
        // Filter to ensure the food trucks from the proper day and time are displayed
        dayofweekstr === currentDay ?
        displayArr.push(`${colors.title('NAME:')} ${colors.value(applicant)}, ${colors.title('LOCATION:')} ${colors.value(location)}`)
        :
        null;
      });
      // for (let i = 0; i < 10; i++) {
      //   console.log(displayArr[i]);
      // }
    });
}

// Keeps track of how many times the user asks for more food trucks to be displayed
// Every time the user answers 'Y' to the question in the command line
// The callCount will increase and the next 10 alphabetical food trucks will be displayed
// Resets the callCount when the user answers 'N' or anything besides 'Y' as the readline will close
let callCount = 0;

// Function that determines which food trucks will be displayed, based on the callCount
// Increments of 10 will be displayed

// IMPORTANT OPTIMIZATION - Although this may seem like an obvious Optimization, it does make the code 'bulkier'...
// This display function is not included within the getTruckData function above because if it is then a new API
// Request would have to be made every time 10 new food trucks are displayed.  This way all of the food trucks are
// Retrieved and pushed into displayArr, and then this function simply displays 10 food trucks at a time
const displayTenFoodTrucks = () => {
  for (let i = 10 * callCount; i < 10 * callCount + 10; i++) {
    console.log(displayArr[i]);
  }
  // Increases callCount with each consecutive call
  // First 10 food trucks will be displayed, then this question is asked in the terminal
  // If 'Y' is inputted by the user, displayTenFoodTrucks is called again and the next 10 open food
  // Trucks are displayed.  Otherwise, the readline is closed, and the process can start over
  // By calling node command.js in the terminal
  callCount++;
  readline.question(`Show More Food Trucks? Y or N : `, (answer) => {
    answer === 'Y' ? displayTenFoodTrucks() : readline.close();
  });
}

// Promise set up so that the data is retrieved from the API before anything is displayed
// Long set timeout used because initial request and filtering takes a little while
const startCommandLine = new Promise((resolve, reject) => {
  getTruckData();
  setTimeout(() => {
    resolve('SUCCESS')
  }, 7000)
})
startCommandLine
  .then(() => {
  displayTenFoodTrucks()
});
