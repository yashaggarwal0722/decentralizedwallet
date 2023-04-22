import { useState } from "react"
import RecentTx from "./recentTx"
import Send from "./send"
import Recipients from "./recipients"
import GlobalTx from "./globalTx"

const Main = () => {
  const [route, setRoute] = useState('send');
  return (
    <div className="w-full mt-12 flex flex-col justify-center  items-center ">
        <div className="flex justify-around text-lg font-medium py-1 items-center  rounded-t-lg border-purple-900 border-2 border-b-0  bg-purple-900 text-white   w-1/2 ">
          <li onClick={()=>setRoute('send')} className={`list-none cursor-pointer py-2 w-1/5 ${route=='send'? "bg-black" :"bg-purple-900"} text-center rounded-full hover:bg-black `}>
            Send
          </li>
          <li onClick={()=>setRoute('recipients')} className={`list-none cursor-pointer py-2 w-1/5  ${route=='recipients'? "bg-black" :"bg-purple-900"} text-center rounded-full hover:bg-black `}>
            Recipients
          </li>
          <li onClick={()=>setRoute('recentTx')} className={`list-none cursor-pointer py-2 w-1/5  ${route=='recentTx'? "bg-black" :"bg-purple-900"} text-center rounded-full hover:bg-black `}>
            Recent-TX
          </li>
          <li onClick={()=>setRoute('globalTx')} className={`list-none cursor-pointer py-2 w-1/5  ${route=='globalTx'? "bg-black" :"bg-purple-900"} text-center rounded-full hover:bg-black `}>
            Global-TX
          </li>
        </div>
      <div className="bg-black pb-5 overflow-y-auto shadow-lg rounded-b-lg border-4 border-purple-900 border-t-0 w-1/2">
        {(() => {
        if (route == 'send'){
          return <Send/>
        }
        else if(route=='recipients'){
          return <Recipients/>
        }
        else if(route=='recentTx'){
          return <RecentTx/>
        }
        else if(route=='globalTx'){
          return <GlobalTx/>
        }
        })()}
      </div>
    </div>
  )
}

export default Main
