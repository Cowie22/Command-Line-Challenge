import React from 'react';

const FoodTruck = (props) => {
  // Maps the open food trucks given from props and displays the proper result for the table
  let foodTrucks = props.filterData.map((truck, i) => {
    return (
      // Creates the body of the table with all open food trucks Name, Location and Closing Time
        <tbody>
          <tr className="food-truck-entry">
            <th className="name">{truck.applicant}</th>
            <th className="location">{truck.location}</th>
            <th className="location">{truck.endtime}</th>
          </tr>
        </tbody>
    )
  })
  return (
    // Creates a container for the table and the headers for the table
    <div className="display-container">
      <table>
        <thead className="table-header">
          <tr className="header-row">
            <th className="name">FOOD TRUCK NAME</th>
            <th className="location">FOOD TRUCK LOCATION</th>
            <th className="closes">CLOSES</th>
          </tr>
        </thead>
        {foodTrucks}
      </table>
    </div>
  )
}

export default FoodTruck