import React from "react"
import { RxDownload } from "react-icons/rx"
import { TbRefresh } from "react-icons/tb"
import jsPDF from "jspdf"
import "jspdf-autotable"

const Table = ({ inspections, filteredInspections }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-gray-400"
      case "SUBMITTED":
        return "bg-blue-400"
      case "ONGOING":
        return "bg-orange-400"
        return ""
    }
  }

  const downloadPDF = () => {
    const data =
      filteredInspections.length > 0 ? filteredInspections : inspections
    const doc = new jsPDF()

    const tableColumn = [
      "Inspection Status",
      "Inspection ID",
      "Lot Status/Verdict",
      "IC Part Name",
      "Supplier Name",
      "Total Order Quantity",
      "Sampling Size",
      "Total OK",
      "Total NOK",
      "Created At"
    ]
    const tableRows = []

    data.forEach((inspection) => {
      const inspectionData = [
        inspection.status,
        inspection.id,
        inspection.lot,
        inspection.ic,
        inspection.supplier,
        inspection.quantity,
        inspection.size,
        inspection.ok,
        inspection.nok,
        inspection.created
      ]
      tableRows.push(inspectionData)
    })

    doc.autoTable(tableColumn, tableRows, { startY: 20 })
    doc.text("Inspections Report", 14, 15)
    doc.save("inspections_report.pdf")
  }

  return (
    <>
      <div className="flex justify-between p-3">
        <p>
          Inspections{" "}
          {filteredInspections.length > 0
            ? filteredInspections.length
            : inspections.length}
        </p>
        <div className="flex gap-3">
          <TbRefresh
            className="cursor-pointer text-xl"
            onClick={() => window.location.reload()}
          />
          <RxDownload
            className="cursor-pointer text-xl"
            onClick={downloadPDF}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Inspection Status
              </th>
              <th scope="col" className="px-6 py-3">
                Inspection ID
              </th>
              <th scope="col" className="px-6 py-3">
                Lot Status/Verdict
              </th>
              <th scope="col" className="px-6 py-3">
                IC Part Name
              </th>
              <th scope="col" className="px-6 py-3">
                Supplier Name
              </th>
              <th scope="col" className="px-6 py-3">
                Total Order Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Sampling Size
              </th>
              <th scope="col" className="px-6 py-3">
                Total OK
              </th>
              <th scope="col" className="px-6 py-3">
                Total NOK
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredInspections.length > 0
              ? filteredInspections.reverse().map((inspection, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div
                        className={`text-center w-fit rounded-md text-white px-2 ${getStatusColor(
                          inspection.status
                        )}`}
                      >
                        {inspection.status}
                      </div>
                    </th>
                    <td className="px-6 py-4">{inspection.id}</td>
                    <td className="px-6 py-4">{inspection.lot}</td>
                    <td className="px-6 py-4">{inspection.ic}</td>
                    <td className="px-6 py-4">{inspection.supplier}</td>
                    <td className="px-6 py-4">{inspection.quantity}</td>
                    <td className="px-6 py-4">{inspection.size}</td>
                    <td className="px-6 py-4">{inspection.ok}</td>
                    <td className="px-6 py-4">{inspection.nok}</td>
                    <td className="px-6 py-4">{inspection.created}</td>
                  </tr>
                ))
              : inspections.reverse().map((inspection, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                    >
                      <div
                        className={`text-center w-fit rounded-md text-white px-2 ${getStatusColor(
                          inspection.status
                        )}`}
                      >
                        {inspection.status}
                      </div>
                    </th>
                    <td className="px-6 py-4">{inspection.id}</td>
                    <td className="px-6 py-4">{inspection.lot}</td>
                    <td className="px-6 py-4">{inspection.ic}</td>
                    <td className="px-6 py-4">{inspection.supplier}</td>
                    <td className="px-6 py-4">{inspection.quantity}</td>
                    <td className="px-6 py-4">{inspection.size}</td>
                    <td className="px-6 py-4">{inspection.ok}</td>
                    <td className="px-6 py-4">{inspection.nok}</td>
                    <td className="px-6 py-4">{inspection.created}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table
