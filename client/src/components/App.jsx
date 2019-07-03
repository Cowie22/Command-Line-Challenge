import React from 'react';
import axios from 'axios';
import FoodTruck from './TruckDisplay/FoodTruck.jsx';

const URL = 'https://data.sfgov.org/resource/jjew-r69b.json?$$app_token=KBlOTi2gKbzyLr40mb0dLT0ND'

const newDate = new Date();

const weekday =[
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const currentDay = weekday[newDate.getDay()];

const hours = newDate.getHours();

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
          const { starttime, endtime, dayofweekstr } = foodTruck;
          let formatStartTime = formatTime(starttime);
          let formatEndTime = formatTime(endtime);
          const truckIsOpen = dayofweekstr === currentDay && hours >= formatStartTime && hours < formatEndTime;

          truckIsOpen ? filtered.push(foodTruck) : null;
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