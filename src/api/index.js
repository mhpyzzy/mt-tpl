import axios from 'axios'
const http = axios.create({
    baseURL: import.meta.env.MODE !== 'production'?'http://129.226.92.106:21333':'https://api.lp-derive.rwas-ve.com',
    headers: { "Content-Type": "application/json;charset=UTF-8" }
})
http.interceptors.request.use(async (config)=>{
    return config;
},error=>{
    console.log('【 Http request Error 】:::::: ',JSON.stringify(error))
    return Promise.reject(error);
});
http.interceptors.response.use((response)=>{
    return response.data;
},error=>{
    console.log('【 Http Response Error 】:::::: ',error)
    return Promise.reject(error);
});

// ---------------------------------------------------------------------------------------------------
export const getSignText = (addr) => {
    return http.post('/rwas-lp-rewards/api/sign/code',{addr})
}