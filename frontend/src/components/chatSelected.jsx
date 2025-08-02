import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from '../components/ChatHeader';
import MessagesInput from "../components/MessagesInput"
import MessageSkeleton from '../components/sekeletons/MessagesSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import formatMongoDate from '../lib/utils.js';
const chatSelected = () => {
  const {getMessages , messages ,  isLoadingMessages, selectUser , subscribeMessage , unSubscribeMessage}  = useChatStore();  
  const {authUser} = useAuthStore();
  useEffect(()=>{
    getMessages(selectUser._id);
    subscribeMessage();
    return ()=> unSubscribeMessage;
  },[getMessages ,selectUser._id,subscribeMessage , unSubscribeMessage]);
  const refMessage = useRef(null);
  
  useEffect(()=>{
    if(refMessage.current && messages){
      refMessage.current.scrollIntoView({behavior : "smooth"});
    }
  },[messages]);

  




  if(isLoadingMessages) return( 
  <div className='flex flex-col overflow-auto flex-1 '>
    <ChatHeader/>
    <MessageSkeleton/>
    <MessagesInput/>


  </div>

  )
  
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      
      <div className='flex-1 overflow-y-auto p-4 space-y-6'>
        {messages.map((msg,i)=>(
          
            <div key={msg._id} 
            className={`chat ${msg.senderID === authUser._id ? `chat-end` : `chat-start`} `} ref={refMessage}>
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full border'>
                  
                  <img 
                  src={msg.senderID === authUser._id
                   ? authUser.profilPic || "/avatar.png" 
                   : selectUser.profilPic || "/avatar.png"} alt="profile pic"/>
                </div>
              </div>
              <div className='chat-header mb-1'>
                <time className='text-xs opacity-50 ml-1'>
                  {formatMongoDate(msg.createdAt)}
                </time>
              </div>
              <div className='chat-bubble flex flex-col'>
                {msg.image && (
                  <img
                  src={msg.image}
                  alt='attachement'
                  className='sm:max-w-[200px] rounded-md mb-2'
                  
                  />
                )}
                {msg.text && <p>{msg.text}</p>}


              </div>



            </div>
        ))}



      </div>
      <MessagesInput/>
    
    </div>


  )
}

export default chatSelected