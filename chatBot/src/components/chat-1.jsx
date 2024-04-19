import { useEffect, useState } from "react";
import './display-chat.css';
import pic from '../img/bot-regular-240.png';

export default function ChatA({url, id}){

    const [userTextF, setUserTextF] = useState([]);
    const [botTextF, setBotTextF] = useState([]);

    const [inputText, setInputText] = useState("");
    const [newMsg, setNewMsg] = useState([]);

    async function getData(){

        // Getting data from api endpoint:
        const response = await fetch(url);
        const data = await response.json();

        if(data && data.length > 0){

            // Filtering users texts by id:
            const user = data.filter(i=> i.id === id);
            setUserTextF(user);

            // Filtering bot answers by id:
            const bot = data.filter(i=> i.reply_to_id === id && i.platform === 'facebook');
            setBotTextF(bot);
        }
    }

    useEffect(()=>{
        getData();
    },[url]);

    function handleSubmit(){

        if(inputText.trim() !== ''){
            setNewMsg(m => [...m, inputText]);
            setInputText('');
        }
    };

    return <div className="flex flex-col items-center h-screen gap-4 bg-slate-700  relative"> 
        
        <div className="w-full flex flex-col my-[12%] overflow-y-auto">
            {
                userTextF.map( (text, index) => (

                    <div key={index} className="w-full flex flex-col items-end mb-[2%] gap-1">

                        <div className="py-5 px-12 bg-gradient-to-b from-sky-500 to-blue-500 text-white rounded-l-full rounded-tr-full drop-shadow-md mr-[2%] max-w-[90%] h-full text-pretty text-card">

                        <p>{text.message_text}</p>

                        </div>
                    </div>
            
                ))
            }
            {
                botTextF.map( (bot, index) => (

                    <div key={index} className="w-full flex flex-col mb-[2%] gap-1 items-start">

                        <div className="py-5 px-12 bg-gradient-to-b from-sky-500 to-blue-500 text-white rounded-r-full rounded-tl-full drop-shadow-md ml-[2%] max-w-[90%] h-full text-pretty text-card">

                            <p>{bot.message_text}</p>

                        </div>

                        <img src={pic} alt="bot-icon" className="w-10 h-10 rounded-full drop-shadow-md picture" />
    
                    </div>
                    
                ))
            }

            {
                newMsg.length > 0 &&
                newMsg.map((text, index) => (

                    <div key={index} className="w-full flex flex-col items-end mb-[2%] gap-1">

                        <div className="py-5 px-12 bg-gradient-to-b from-sky-500 to-blue-500 text-white rounded-l-full rounded-tr-full drop-shadow-md mr-[2%] max-w-[90%] h-full text-pretty text-card">

                            <p>{text}</p>

                        </div>
                    </div>
                ))

            }
        </div>

        <div className="w-full bg-white fixed bottom-0 py-8 px-5 lg:py-5 flex justify-between items-center gap-2 md:gap-5 drop-shadow-lg">

            <input type="text" placeholder="Write your text here..." className="w-[70%] md:w-full py-3 px-4 focus:outline-[1px] outline-blue-500 border-[1px] border-slate-400 rounded-full" value={inputText} onChange={(e)=>setInputText(e.target.value)} />

            <div>
                <button className="flex justify-center items-center"><span className="material-symbols-outlined w-full h-full lg:text-[60px] md:text[40px] text-slate-500 hover:text-blue-500">sentiment_very_satisfied</span></button>
            </div>

            <button className="flex bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-300 hover:text-slate-600 transition-colors delay-150 duration-300 justify-center items-center" onClick={handleSubmit}>
                <span className="material-symbols-outlined text-2xl">send</span>
            </button>
        </div>
        
    </div>   
}
