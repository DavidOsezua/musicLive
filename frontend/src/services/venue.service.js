import { api } from "./api.route"

export const deleteVenue = async (venueId) => {
    const res = await api.delete(`api/v1/venue/${venueId}`)
    console.log(res.data)
}