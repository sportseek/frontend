import axios from "utils/axios"

const arenaEndpoint = "arena"

const fetchArenaById = async (id: string) => {
  const url = `/${arenaEndpoint}/findById/${id}`
  const response = await axios.get(url)
  return response
}

export default { fetchArenaById }
