import React from 'react'
import { useChatStore } from '../store/useChatStore'
import SideBar from '../components/SideBar.jsx';
import ChatSelected from '../components/chatSelected';
import NoChatSelected from '../components/noChatSelected';

const HomePage = () => {
  const {selectUser} = useChatStore();
  
  return (
    <div className='h-screen bg-base-200 '>
      <div className='flex items-center justify-center pt-20 px-4 ' >
        <div className='bg-base-100 rounded-lg shadow-cl w-full maw-w-6xl h-[calc(100vh-8rem)] '>
          <div className='flex h-full rounded-lg overflow-hidden' >
            <SideBar/>
            {!selectUser ? <NoChatSelected/> : <ChatSelected/>}
          
          
          </div>

        </div>

      </div>

    </div>
  )
}

export default HomePage