export interface IAddress {
  careof?: string
  street: string
  streetAddtional: string
  postcode: string
  district?: string
  city: string
  state?: string
  country: string
}

export const InitialAddress = {
  street: "",
  streetAddtional: "",
  postcode: "",
  district: "",
  city: "",
  state: "",
  country: "",
}
