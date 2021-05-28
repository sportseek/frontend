import axios from "utils/axios"

const userEndpoint = "user"

const fetchById = (id: string) => {
  const url = `/${userEndpoint}/fetchById/${id}`
  return axios.get(url).then((response) => response)
}

export default { fetchById }
