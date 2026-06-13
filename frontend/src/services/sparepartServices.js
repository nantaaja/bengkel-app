import api from "../api/axios";

const sparepartService = {

    getAll() {
        return api.get("/spareparts");
    },

    getById(id) {
        return api.get(`/spareparts/${id}`);
    },

    create(data) {
        return api.post("/spareparts", data);
    },

    update(id, data) {
        return api.put(`/spareparts/${id}`, data);
    },

    delete(id) {
        return api.delete(`/spareparts/${id}`);
    }

};

export default sparepartService;