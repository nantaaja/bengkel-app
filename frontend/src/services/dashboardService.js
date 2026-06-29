import api from "../api/axios"; // Pastikan import 'api' (yang sudah ada interceptor-nya)

const dashboardService = {
    getDashboard: async () => {
        // Gunakan 'api', bukan 'axios' biasa supaya token otomatis terkirim
        return await api.get("/dashboard"); 
    }
};

export default dashboardService;