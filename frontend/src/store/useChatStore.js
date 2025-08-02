import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userID) => {
    set({ isMessagesLoading: true });
    try {

      const res = await axiosInstance.get(`/message/${userID}`);

      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });

    }
  },
  sendMessage: async (msgData) => {
    const { selectUser, messages } = get();
    try {
      const res = await axiosInstance.post("/message/send/" + selectUser._id, msgData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }


  },
  setSelectedUser: (data) => {
    set({selectUser: data })
  },
  subscribeMessage: () => {
    const { selectUser } = get();
    
    if (!selectUser) return;


    const socket = useAuthStore.getState().socket;


    socket.on("newMessage", (newMessage) => {
      set({ messages: [...get().messages, newMessage] });
    })
  },

  unSubscribeMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");


  }
}))