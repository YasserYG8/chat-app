import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const base_url = "http://localhost:5001";
export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isloggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers : [],
    socket : null,
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/checkAuth");

            set({ authUser: response.data });
            get().connectSocket();            
        } catch (error) {
            set({ authUser: null });
            console.log('Error in checkAuth', error);

        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signUp: async (data) => {
        set({ isSigningUp: true });
        try {

            const res = await axiosInstance.post("/auth/signup", data);
            toast.success("Account created successfully ");
            set({ authUser: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isSigningUp: false });
        }
    },
    logout: async () => {

        try {
            await axiosInstance.get("auth/logout");
            set({ authUser: null });
            toast.success("Log out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    login: async (data) => {
        set({ isloggingIn: true });
        try {
            const res = await axiosInstance.post("auth/login", data);
            set({ authUser: res.data });
            
            toast.success("Log in successfully");
            get().connectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isloggingIn: false });
        }
    },
    updateProfile : async (data) => {
        set({isUpdatingProfile : true});
        
        try {
            const res = await axiosInstance.put("auth/updateProfile",data);
            
            set({authUser : res.data});
            toast.success("Image upload successfully");
        } catch (error) {
            console.error("Upload error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Upload failed");
            
        }
        finally{
            set({isUpdatingProfile : false});
        }
    },
    connectSocket : () => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;
        
        const socket = io(base_url,{
            query:{
                userId : authUser._id,
                
            },
        });
        socket.connect();
        set({socket : socket});
        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers : userIds});
        
        
        })

    },
    disconnectSocket : () => {
        if(get().socket?.connected) get().socket.disconnect();
    }
    

}))