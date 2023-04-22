import { useContext } from "react"
import { TailSpin } from "react-loader-spinner";
import { Appstate } from "../App";

const Send = () => {
  const AppState = useContext(Appstate);



  return (
    <div className='flex flex-col justify-center items-center text-white'>
      <div className='flex w-4/5 justify-around items-center mt-7 '>
        <div onClick={() => AppState.setShowErc(AppState.showErc ? false : true)} className=' hover:bg-gray-600 flex cursor-pointer justify-center items-center border-2 border-purple-900 p-3 bg-black rounded-full'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
          <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
          <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
          <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
        </svg>
          <h1 className="ml-2 text-lg font-medium ">{AppState.currency}</h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="ml-2 bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </div>
        <div className="flex items-center border-2 border-purple-900 p-3 bg-black rounded-full ">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mr-2 bi bi-wallet2" viewBox="0 0 16 16">
            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
          </svg>
          <h1 className="ml-2 text-lg font-medium">Balance:</h1>
          <h1 className="ml-2 text-lg font-medium">{AppState.balance.slice(0, 5)} {AppState.symbol}</h1>
        </div>
      </div>
      <div className={`${AppState.showErc ? '' : "hidden"} flex w-4/5 justify-around items-center mt-5`}>
        <input onChange={(e) => AppState.setErcTokenAddress(e.target.value)} value={AppState.ercTokenAddress} className="w-3/4 p-3 bg-black border-2 border-purple-900 rounded-full" placeholder="ERC20 Token Address" />
        {
          AppState.ercLoading ?
            <div className="flex p-2 cursor-pointer justify-around items-center w-1/4 ml-4 bg-purple-900 border-2 border-purple-900 text-lg font-medium rounded-full">
              <TailSpin width={28} height={28} color={"white"} />
            </div>
            :
            (AppState.tokenChanged ?
              <div onClick={AppState.removeToken} className="flex cursor-pointer justify-around items-center w-1/4 p-2 ml-4 hover:bg-red-300 bg-red-600  text-lg font-medium rounded-full">Remove</div>
              :
              <div onClick={AppState.selectToken} className="flex cursor-pointer justify-around items-center w-1/4 p-2 ml-4 bg-red-600 hover:bg-red-300  text-lg font-medium rounded-full">Select</div>
            )

        }

      </div>
      <div className="flex w-4/5 justify-between items-center mt-5 ">
        <input onChange={(e) => AppState.setRecipientAddress(e.target.value)} value={AppState.recepientAddress} className="w-3/4 p-3 bg-black border-2 border-purple-900 rounded-full" placeholder="Receiver's address">

        </input> 
        <input onChange={(e) => AppState.setAmount(e.target.value)} value={AppState.amount} type="number" className="w-1/4 ml-4 p-3 bg-black border-2 border-purple-900 rounded-full" placeholder="Amount">

        </input>
      </div>

      {
        AppState.txLoading?
        <div className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 hover:bg-green-500 bg-green-700 text-xl font-medium rounded-full">
          <TailSpin width={30} height={46} color="white"/>
        </div>
        :
        <div onClick={AppState.transferAmount} className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 hover:bg-green-500 bg-green-700 text-xl font-medium rounded-full">
          Transfer
        </div>
      }

      <div className={`${AppState.showRecentTx  ? '' : 'hidden'} flex flex-col justify-center items-center  bg-black rounded-full border-2 border-purple-900 w-4/5 mt-2`}>
        <div className="flex w-full items-center justify-center rounded-t-lg">
          <div className="w-4/6 py-2 px-2">
            <p className="text-xl font-mono">Amount:{AppState.recentTx.amount} {AppState.recentTx.symbol}</p>
            <p className="text-xs font-mono">To:{AppState.recentTx.to}</p>
          </div>
          {AppState.saveTxLoad ?
          <div className=" flex justify-center bg-green-700 font-medium font-mono h-full w-1/6 py-1 mr-2 rounded-full">
            <TailSpin height={24} width={24} color="white"/>
          </div>
          :
          <button onClick={AppState.saveTx} className="bg-green-700 hover:bg-green-500 font-medium font-mono h-full w-1/6 py-1 mr-2 rounded-full">
            Save
          </button>
          }
          <button onClick={()=>AppState.setShowRecentTx(false)} className="bg-red-700 hover:bg-red-500 font-medium font-mono h-full w-1/6 py-1 mr-2 rounded-full">
            Ignore
          </button>
        </div>
        <a  className="font-mono w-1/2 rounded-full hover:bg-gray-500 bg-gray-900 text-center cursor-pointer" target={'_blank'} href={`${AppState.explorer}/tx/${AppState.recentTx.txhash}`} >
          <div >
            View Transaction
          </div>
        </a>
      </div>

      <p className="text-red-600 text-lg mt-2 px-3">{AppState.error}</p>
      <p className="text-green-600 text-lg mt-2 px-1">{AppState.message}</p>
    </div>

  )
}

export default Send
