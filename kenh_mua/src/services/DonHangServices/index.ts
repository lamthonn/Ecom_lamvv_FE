import axios, { AxiosResponse } from "axios";
import { axiosConfig, axiosCustom, BASE_URL } from "../../config/configApi";

export const GetAllDonHangByUser: (pageNumber: number, pageSize: number) => Promise<AxiosResponse<any>> = (pageNumber: number, pageSize: number) => {
    return axiosConfig.get(`/api/don-hang/get-don-hang-by-user?pageNumber=${pageNumber}&pageSize=${pageSize}`);
};
export const GetDonHangById: (id: string) => Promise<AxiosResponse<any>> = (id: string) => {
    return axiosConfig.get(`/api/don-hang/get-don-hang-by-user?id=${id}`);
};