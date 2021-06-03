import axios from "utils/axios"

const userEndpoint = "user"

const fetchById = (id: string, type: string) => {
  const url = `/${userEndpoint}/fetchById/${type}/${id}`
  return axios.get(url).then((response) => response)
}

export default { fetchById }
