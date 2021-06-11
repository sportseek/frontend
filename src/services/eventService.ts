import axios from "utils/axios"

const eventEndPoint = "event"

// eslint-disable-next-line import/prefer-default-export
export const findEventById = async (id: string) => {
  const url = `/${eventEndPoint}/findById/${id}`

  const response = await axios
    .get(url)
    .then((res) => res)
    .catch((err) => ({ data: { success: false, error: err } }))

  return response.data
}
