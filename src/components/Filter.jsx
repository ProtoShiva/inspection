import React, { useState } from "react"
import { FaPlus } from "react-icons/fa6"
import Tab from "./Tab.jsx"
import { MdDateRange } from "react-icons/md"

const Filter = ({ open, setOpen, inspections, setFilteredInspections }) => {
  const [dropdownValues, setDropdownValues] = useState({
    supplier: "",
    ic: "",
    status: "",
    lot: ""
  })

  const supplierOptions = [
    "Supplier",
    ...new Set(inspections.map((ele) => ele.supplier))
  ]
  const icOptions = ["IC Part(s)", ...new Set(inspections.map((ele) => ele.ic))]
  const inspectOptions = [
    "Inspection Status",
    ...new Set(inspections.map((ele) => ele.status))
  ]
  const lotOptions = [
    "Lot Status",
    ...new Set(inspections.map((ele) => ele.lot).filter((lot) => lot))
  ]
  const dateOptions = [
    "Start Date -> End Date",
    ...new Set(inspections.map((ele) => ele.created).filter((lot) => lot))
  ]

  const handleDropdownChange = (id, option) => {
    setDropdownValues((prevValues) => ({
      ...prevValues,
      [id]: option
    }))
    const filterData = inspections.filter((data) => data[id] === option)
    setFilteredInspections(filterData)
  }

  return (
    <div className="flex gap-4 items-center p-4 overflow-scroll">
      <Tab
        id="supplier"
        options={supplierOptions}
        selectedOption={dropdownValues.supplier}
        onChange={handleDropdownChange}
      />
      <Tab
        id="ic"
        options={icOptions}
        selectedOption={dropdownValues.ic}
        onChange={handleDropdownChange}
      />
      <Tab
        id="status"
        options={inspectOptions}
        selectedOption={dropdownValues.status}
        onChange={handleDropdownChange}
      />

      <Tab
        id="lot"
        options={lotOptions}
        selectedOption={dropdownValues.lot}
        onChange={handleDropdownChange}
      />

      <select
        className="flex items-center justify-between gap-4 w-[250px] px-4 py-2 rounded-lg text-gray-400 border-2 border-gray-300"
        onChange={(e) => handleDropdownChange("created", e.target.value)}
      >
        {" "}
        {dateOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div
        className="flex items-center justify-center gap-2 w-[180px] px-4 py-2 font-semibold  rounded-lg text-white bg-blue-600 ml-32 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <FaPlus />
        <p>New Inspection</p>
      </div>
    </div>
  )
}

export default Filter
