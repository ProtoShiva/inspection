// components/Dropdown.js
import React from "react"

const Tab = ({ id, options, onChange, selectedOption }) => {
  return (
    <select
      value={selectedOption}
      onChange={(e) => onChange(id, e.target.value)}
      className=" border-solid border-2 border-gray-300 px-5 py-2  rounded-lg w-[200px] text-gray-400"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default Tab
