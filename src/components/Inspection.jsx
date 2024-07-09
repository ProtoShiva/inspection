import React, { useState, useRef, useEffect } from "react"
import { format } from "date-fns"

const Inspection = ({ setOpen, open, setInspections, inspections }) => {
  const [formData, setFormData] = useState({
    status: "",
    id: "",
    lot: "",
    ic: "",
    supplier: "",
    quantity: "",
    size: "",
    ok: "",
    nok: "",
    created: ""
  })

  const modalRef = useRef()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "created") {
      const date = new Date(value)
      const formattedDate = format(date, "h:mm aa, dd-MM-yyyy")
      setFormData({
        ...formData,
        [name]: formattedDate
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = () => {
    setInspections([...inspections, formData])
    setFormData({
      status: "",
      id: "",
      lot: "",
      ic: "",
      supplier: "",
      quantity: "",
      size: "",
      ok: "",
      nok: "",
      created: ""
    })
    setOpen(!open)
  }

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick)
    } else {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [open])

  return open ? (
    <>
      <div className="fixed inset-0 bg-gray-300 opacity-75"></div>
      <section
        ref={modalRef}
        className="bg-white w-[50%] p-3 rounded-xl absolute top-[10%] left-[24%] z-10 flex flex-col gap-6"
      >
        <div className="flex justify-end mb-3">
          <button
            className="bg-red-500 px-4 py-1 rounded-lg font-semibold text-white"
            onClick={() => setOpen(!open)}
          >
            close
          </button>
        </div>

        <div>
          <label htmlFor="status">Inspection status: </label>
          <input
            className="border-2 border-solid border-gray-300"
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="id">Inspection ID: </label>
          <input
            className="border-2 border-solid border-gray-300"
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lot">Lot Status/Verdict: </label>
          <input
            className="border-2 border-solid border-gray-300"
            type="text"
            id="lot"
            name="lot"
            value={formData.lot}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ic"> IC Part Name: </label>
          <input
            className="border-2 border-solid border-gray-300"
            type="text"
            id="ic"
            name="ic"
            value={formData.ic}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="supplier"> Supplier Name: </label>
          <input
            className="border-2 border-solid border-gray-300"
            type="text"
            id="supplier"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="quantity">Total Order Quantity: </label>
          <input
            className="border-2 border-solid border-gray-300"
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="size">Sampling Size: </label>
          <input
            className="border-2 border-solid border-gray-300"
            type="text"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ok">Total OK: </label>
          <input
            className="border-2 border-solid border-gray-300"
            type="text"
            id="ok"
            name="ok"
            value={formData.ok}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nok">Total NOK: </label>
          <input
            className="border-2 border-solid border-gray-300"
            type="text"
            id="nok"
            name="nok"
            value={formData.nok}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="created">Created At: </label>
          <input
            className="border-2 border-solid border-gray-300"
            type="datetime-local"
            id="created"
            name="created"
            value={formData.created}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 px-8 py-1 rounded-lg text-white"
          >
            Add
          </button>
        </div>
      </section>
    </>
  ) : null
}

export default Inspection
