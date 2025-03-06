import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getTenants = () => axios.get(`${API_URL}/tenants`);
export const addTenant = (tenant) => axios.post(`${API_URL}/tenants`, tenant);
