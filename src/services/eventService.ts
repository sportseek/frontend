import axios from "utils/axios"

const eventEndPoint = "event"

const findEventById = async (id: string) => {
  const url = `/${eventEndPoint}/findById/${id}`

  const response = await axios
    .get(url)
    .then((res) => res)
    .catch((err) => ({ data: { success: false, error: err } }))

  return response.data
}

const getEventDetails = (
  idList: string[] | undefined,
  color: React.CSSProperties["color"]
) => {
  if (idList === undefined) return []

  return idList.map((id) => ({ _id: id, color }))
}
export { findEventById, getEventDetails }
