import { useRef, useState } from "react"
import { useChatStore } from "../store/useChatStore";
import {  Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
const MessagesInput = () => {
  const [text,setText] = useState("");
  const [imgPreview  , setImgPreview] = useState(null);
  const fileInputRef = useRef(null);
  const {sendMessage } = useChatStore();
  

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")){
      toast.error("Please select image file");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgPreview(reader.result);
    }
    

  }
  const removeImg = ()=>{
    setImgPreview(null);
    if(fileInputRef.current) fileInputRef.current.value ="";
  }
  const handleSendMessage  = async (e) =>{
    e.preventDefault();
    if(!text.trim() && !imgPreview) return;
    try {
      await sendMessage({
        text : text.trim(),
        image : imgPreview
      });
      setText("");
      setImgPreview(null);
      if(fileInputRef.current)    fileInputRef.current.value='';
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }

  }
  return (
    <div className="p-4 w-full">
      {imgPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img src={imgPreview} alt="Previesw" className="w-20 h-20 object-cover rounded-lg border-zinc-700" />
            <button onClick={removeImg} className="absolute -top-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center" type="button">
              <X className="size-3"/>
            </button>
          </div>

        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input 
          type="text"
          className="w-full input input-bordered rounded-lg input-sm sm:input-sm"
          placeholder="Type Message ..."
          value={text}
          onChange={(e)=>setText(e.target.value)}
          
          />
          <input type="file" 
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImgChange}
          />
        <button className={`sm:flex btn btn-circle ${imgPreview ? "text-emeraled-500" : "text-zinc-400"}`} 
        type="button" onClick={()=>fileInputRef.current?.click()}>
          <Image size={20}/>
        </button>
        <button className={`sm:flex btn btn-circle`} type="submit" disabled={!text.trim()}>
          <Send size={20}/>

        </button>
        
        </div>


      </form>




    </div>
  )
}

export default MessagesInput