
import { useEffect, useState } from "react";
import ChatA from "./components/chat-1";
import ChatB from "./components/chat-2";
import ChatC from "./components/chat-3";


function App() {

  const url = 'http://www.test.readychatai.coM/data';

  const [id, setId] = useState([]);

  async function getData(){

    try {

      const response = await fetch(url);
      const result = await response.json();

      const ids = result.filter(i => i.sender_name !== 'bot' && i.sender_name !== 'J').map(i => i.id);

      if(ids.length > 0){

        setId(ids);
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {

    getData();
  }, []);

  return <>
    <ChatA url={url} id={id[0]} />;
    {/* <ChatB url={url} id={id[2]} />; */}
    {/* <ChatC url={url} id={id[1]} /> */}
  </>
}

export default App
