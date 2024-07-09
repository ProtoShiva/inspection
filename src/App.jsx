import React, { useEffect, useState } from "react"
import Table from "./components/Table"
import Inspection from "./components/Inspection"
import data from "./components/data.js"

import Filter from "./components/Filter"
const App = () => {
  const [open, setOpen] = useState(false)
  const [inspections, setInspections] = useState([])
  const [filteredInspections, setFilteredInspections] = useState([])

  useEffect(() => {
    const savedData = localStorage.getItem("inspections")
    const parsedData = savedData ? JSON.parse(savedData) : data
    setInspections(parsedData)
  }, [])

  useEffect(() => {
    if (inspections.length > 0) {
      localStorage.setItem("inspections", JSON.stringify(inspections))
    }
  }, [inspections])

  return (
    <div>
      <Filter
        setOpen={setOpen}
        open={open}
        inspections={inspections}
        setFilteredInspections={setFilteredInspections}
      />

      <Table
        inspections={inspections}
        filteredInspections={filteredInspections}
      />
      {open && (
        <Inspection
          setOpen={setOpen}
          open={open}
          setInspections={setInspections}
          inspections={inspections}
        />
      )}
    </div>
  )
}

export default App
