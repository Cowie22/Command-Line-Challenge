import React from 'react';

const FoodTruck = (props) => {
  let foodTrucks = props.filterData.map((truck, i) => {
    return (
        <tbody>
          <tr className="food-truck-entry">
            <th className="name">{truck.applicant}</th>
            <th className="location">{truck.location}</th>
          </tr>
        </tbody>
    )
  })
  return (
    <div className="display-container">
      <table>
        <thead className="table-header">
          <tr className="header-row">
            <th className="name">FOOD TRUCK NAME</th>
            <th className="location">FOOD TRUCK LOCATION</th>
          </tr>
        </thead>
        {foodTrucks}
      </table>
    </div>
  )
}

export default FoodTruck