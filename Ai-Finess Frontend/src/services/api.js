import axios from "axios";
const Api_URL="http://localhost:8777/api"
const api=axios.create({
    baseURL:Api_URL,
})
api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");
    const userId=localStorage.getItem("userId");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    if(userId){
        config.headers["X-User-ID"] = userId;

    }
    return config;
});

export const addActivity=(activity)=>api.post(`/activities/track`,activity);
export const getActivities=()=>api.get(`/activities/getActivities`);
export const getActivityDetails=(activityId)=>api.get(`/recommendations/activity/${activityId}`);

