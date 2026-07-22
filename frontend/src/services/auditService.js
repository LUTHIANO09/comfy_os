import api from "./api";

// export const getAuditLogs = async (params = {}) => {
//     const response = await api.get("audit/", {
//         params,
//     });

//      console.log(response.data);

//     return response.data;
// };


export const getAuditLogs = async (params = {}) => {
    const response = await api.get("audit/", {
        params,
    });

    return response.data;
};