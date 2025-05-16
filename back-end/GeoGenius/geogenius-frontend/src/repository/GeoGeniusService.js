import axios from "../custom-axios/axios";

const GeoGeniusService = {
    register: (firstName, lastName, username, email, password) => {
        return axios.post("/auth/register", { firstName, lastName, username, email, password });
    },
    login: (username, password) => {
        return axios.post("/auth/login", { username, password });
    },
    logout: () => {
        return axios.post("/auth/logout", {});
    },
    getApprovedCards: () => axios.get("/cards"),
    getCardById: (id) => axios.get(`/cards/${id}`),
    proposeCard: (title, description) => axios.post("/cards", { title, description }),
    getPendingCards: () => axios.get("/admin/cards/pending"),
    approveCard: (id) => axios.put(`/admin/cards/${id}/approve`, {}),
    rejectCard: (id) => axios.delete(`/admin/cards/${id}/reject`),
    getUserProfile: () => axios.get("/user/me"),
    changePassword: (oldPassword, newPassword) => axios.put("/user/change-password", { oldPassword, newPassword }),
};

export default GeoGeniusService;
