import { useEffect, useState } from "react";
import './display-chat.css';
import pic from '../img/bot-regular-240.png';

export default function ChatB({url, id}){

    const [userTextW, setUserTextW] = useState([]);
    const [botTextW, setBotTextW] = useState([]);

    const [inputText, setInputText] = useState("");
    const [newMsg, setNewMsg] = useState([]);

    async function getData(){

        // Getting data from api endpoint:
        const response = await fetch(url);
        const data = await response.json();

        if(data && data.length > 0){

        // Filtering users texts by id:
        const user = data.filter(i => i.id === id);
        setUserTextW(user);

        // Filtering bot answers by id:
        const bot = data.filter(i=> i.reply_to_id === id);
        setBotTextW(bot);
        }
    };

    useEffect(()=>{
        getData();
    },[url]);

    function handleSubmit(){

        if(inputText.trim() !== ''){
            setNewMsg(m => [...m, inputText]);
            setInputText('');
        }
    };

    return <div className="flex flex-col items-center h-screen gap-4 bg-black relative"> 

        <div className="mt-5 flex flex-col justify-center items-center gap-4">
            <img src={pic} alt="bot-icon" className="w-10 h-10 rounded-full drop-shadow-md" />
            <h1 className="text-white text-xl">Chat with Bot</h1>
        </div>
        
        <div className="w-full flex flex-col my-[12%] overflow-y-auto">
            {
                userTextW.map( (text, index) => (

                    <div key={index} className="w-full flex flex-col items-end mb-[5%] gap-1">

                        <div className="py-3 px-10 bg-white text-slate-800 rounded-full drop-shadow-md mr-[3%] max-w-[90%] h-full text-pretty font-bold text-card">

                            <p>{text.message_text}</p>

                        </div>
                    </div>
            
                ))
            }
            {
                botTextW.map( (bot, index) => (

                    <div key={index} className="w-full flex flex-col mb-[5%] gap-1 items-start">

                        <div className="py-3 px-10 bg-white text-slate-800 rounded-full drop-shadow-md ml-[3%] max-w-[90%] h-full text-pretty font-bold text-card">

                            <p>{bot.message_text}</p>

                        </div>
    
                    </div>
                    
                ))
            }

            {
                newMsg.length > 0 &&
                newMsg.map((text, index) => (

                    <div key={index} className="w-full flex flex-col items-end mb-[5%] gap-1">

                        <div className="py-3 px-10 bg-white text-slate-800 rounded-full drop-shadow-md mr-[3%] max-w-[90%] h-full text-pretty font-bold text-card">

                            <p>{text}</p>

                        </div>
                    </div>
                ))

            }
        </div>

        <div className="w-[90%] border-2 border-white rounded-full fixed bottom-0 py-3 px-5 lg:py-5 flex justify-between items-center gap-2 md:gap-5 mx-5 mb-5">

            <button className="flex justify-center items-center"><span className="material-symbols-outlined w-full h-full md:text-[50px] text-slate-500 hover:text-blue-500">sentiment_very_satisfied</span></button>

            <input type="text" placeholder="Enter your message..." className="w-[70%] md:w-full bg-transparent focus:outline-none text-white" value={inputText} onChange={(e)=>setInputText(e.target.value)} />

            <button className="flex bg-transparent text-slate-500 p-2 rounded-full hover:bg-blue-300 hover:text-slate-600 transition-colors delay-150 duration-300 justify-center items-center" onClick={handleSubmit}>
                <span className="material-symbols-outlined md:text-[50px]">send</span>
            </button>
        </div>
        
    </div>   
}