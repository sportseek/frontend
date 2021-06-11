import axios from "utils/axios"
import { IUser } from "types"

const userEndpoint = "user"

const fetchById = (id: string, type: string) => {
  const url = `/${userEndpoint}/fetchById/${type}/${id}`
  return axios.get(url).then((response) => response)
}

const update = (user: IUser) => {
  const url = `/${userEndpoint}/update/${user._id}`
  return axios.put(url, user).then((response) => response)
}

export default { fetchById, update }
