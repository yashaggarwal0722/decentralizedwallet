import { useContext, useEffect, useState } from 'react'
import { Appstate } from '../App'
import { ethers } from 'ethers';

const RecentTx = () => {
  const appState = useContext(Appstate);
  const[data,setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const tx = await appState.walletContract.filters.transactions(appState.address);
      const txData = await appState.walletContract.queryFilter(tx);
      setData(txData);
    }
    getData();

  })

  return (
    <div className='flex flex-col justify-center p-3 text-white'>
    {data.map((e)=>{
        return(

      <div className={`flex flex-col justify-center items-center  bg-black rounded-full border-2 border-purple-900 w-full px-4 mt-2`}>
        <div className="flex w-full items-center justify-center rounded-t-lg">
          <div className="w-full py-2 px-2">
            <p className="text-xl font-mono">Amount:{ethers.utils.formatEther(e.args.amount)}{e.args.symbol}</p>
            <p className="text-xs font-mono">To:{e.args.to}</p>
          </div>


        </div>
        <a className="font-mono w-1/2 rounded-full hover:bg-gray-500 bg-gray-900 text-center cursor-pointer" target={'_blank'} href={`${appState.explorer}/tx/${e.transactionHash}`} >
          <div >
            View Transaction
          </div>
        </a>
      </div>   
        )
    })
    }
       </div>
  )
}

export default RecentTx
