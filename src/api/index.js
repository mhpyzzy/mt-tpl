import axios from 'axios'
const instance = axios.create({
    headers: { "Content-Type": "application/json;charset=UTF-8" }
})
instance.interceptors.request.use(async (config)=>{
    return config;
},error=>{
    console.log('【 Http request Error 】:::::: ',JSON.stringify(error))
    return Promise.reject(error);
});
instance.interceptors.response.use((response)=>{
    return response.data;
},error=>{
    console.log('【 Http Response Error 】:::::: ',error)
    return Promise.reject(error);
});

// console.log('import.meta.env--',import.meta.env.MODE)
