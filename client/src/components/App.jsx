import React from 'react';
import axios from 'axios';
import FoodTruck from './TruckDisplay/FoodTruck.jsx';

// URL and query parameters for the API with pertinent data
const URL = 'https://data.sfgov.org/resource/jjew-r69b.json?$$app_token=KBlOTi2gKbzyLr40mb0dLT0ND'
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: [],
      filterData: [],
    };
  }
  componentDidMount() {
    // Calls the axios API request
    this.getTruckData()
  }
  getTruckData() {
    let filtered = [];
    axios.get(URL)
      .then(res => {
        // Sorts the API data alphabetically
        const sortedData = res.data.sort((a, b) => {
          let textA = a.applicant.toUpperCase();
          let textB = b.applicant.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        sortedData.filter((foodTruck, i) => {
          // Destructuring so that I don't have to write foodTruck. everytime.
          const { starttime, endtime, dayofweekstr, applicant, location } = foodTruck;
          // Formats start and end times using helper function declared above
          let formatStartTime = formatTime(starttime);
          let formatEndTime = formatTime(endtime);
          // Filter to ensure the food trucks from the proper day and time are displayed
          dayofweekstr === currentDay ?
          filtered.push(foodTruck)
          :
          null;
        })
        this.setState({
          food: res.data,
          filterData: filtered,
        })
      })
  }
  render() {
    return (
      <div className="app-container">
        <h1>CURRENT OPEN FOOD TRUCKS</h1>
        <h2>San Francisco, California</h2>
        <FoodTruck
          filterData={this.state.filterData}
        />
      </div>
    )
  }
}

export default App