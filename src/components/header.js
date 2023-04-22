import React, { useContext, useState } from 'react'
import { Appstate } from '../App'



const Header = () => {
  const appstate = useContext(Appstate);
  const [showChains, setshowchains] = useState(false);

  const changeToSepolia = async ()=>{
    await window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0xaa36a7"}]});
    setshowchains(false);
  }

  const changeToPolygon = async ()=>{
    await window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x13881"}]});
    setshowchains(false);
  }

  return (
    <div className='w-full h-1/4 pt-2 mt-2 flex justify-between items-start'>

      <div className='flex justify-between items-start'>
        <div className=' border-2 border-purple-900 text-xl ml-2 font-sans font-medium cursor-pointer px-4 py-2 bg-black text-white rounded-full flex justify-between items-center'>
          Decentralised Wallet
          <img src='Bitcoin.png' alt='' className='h-8 ml-2' />
        </div>
      </div>
      <div className='flex justify-between items-start' >
        <div className='text-xl mr-2 font-sans font-medium cursor-pointer px-4 py-2 bg-black text-white rounded-full flex justify-between items-center border-2 border-purple-900'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mr-2 bi bi-wallet2" viewBox="0 0 16 16">
            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
          </svg>
          {appstate.address.slice(0, 8) + "..." + appstate.address.slice(38)}
        </div>

        <div onClick={()=>setshowchains(true)} className='border-2 border-purple-900 text-xl py-2 px-4 mr-2 hover:bg-gray-600 font-sans font-medium cursor-pointer bg-black text-white rounded-full flex justify-center items-center'>
          {appstate.chain == "Sepolia" ? <img src='etherlogo.png' alt='' className='h-6 mr-2' /> : <img src='polygon.png' alt='' className='h-6 mr-2' />}
          {appstate.chain}
        </div>

        <div  className={`${showChains ? '' : "hidden"} absolute right-0 z-50}`}>
          <div onClick={changeToSepolia} className='text-xl py-2 px-4 mr-2 border-2 border-purple-900 hover:bg-gray-700 font-sans font-medium cursor-pointer bg-black text-white rounded-full flex justify-center items-center'>
            <img src='etherlogo.png' alt='' className='h-6 mr-2'/>
            Sepolia
          </div>
          <div onClick={changeToPolygon} className='text-xl mt-1 py-2 border-2 border-purple-900 hover:bg-gray-700 px-4 mr-2 font-sans font-medium cursor-pointer bg-black text-white rounded-full flex justify-center items-center'>
            <img src='polygon.png' alt='' className='h-6 mr-2'/>
            Polygon Mumbai
          </div>
          <div onClick={()=>setshowchains(false)} className='text-xl mt-1 py-2 hover:bg-red-900 px-4 mr-2 font-sans font-medium cursor-pointer bg-red-600 text-white rounded-full flex justify-center items-center'>
            close
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
