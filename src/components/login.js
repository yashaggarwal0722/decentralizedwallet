import React, { useContext } from 'react'
import { useState } from 'react'
import { Appstate } from '../App'

const Login = () => {
    const AppState = useContext(Appstate);
    const [error, setError] = useState('');
    const loginWallet = async () => {
        try {
            await window.ethereum.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] })
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            AppState.setAddress(accounts[0]);
            const chainId = await window.ethereum.request({ method: "eth_chainId" });
            AppState.getBal();
            if (chainId === "0xaa36a7") {
                AppState.setChain("Sepolia");
                AppState.setCurrency("SepoliaEth");
                AppState.setSymbol("sEth");
                AppState.setWalletContractAddress("0xb60b9a34533B9AdB574F580cDaD0715dCCe3290a");
                AppState.setExplorer("https://sepolia.etherscan.io/");
                AppState.setLogin(true);
            }
            else if (chainId === "0x13881") {
                AppState.setChain("Polygon Mumbai");
                AppState.setCurrency("Matic");
                AppState.setSymbol("Matic");
                AppState.setWalletContractAddress("0x34A90C0b649bBc66C4758C46AdA275bD237D50cC");
                AppState.setExplorer("https://mumbai.polygonscan.com/");
                AppState.setLogin(true);

            }
            else {
                setError("Only Sepolia and Polygon testnet are supported!");
                AppState.setLogin(false);
            }

        }
        catch (error) {
            setError(`"${error.message}"`)
        }

    }

    return (
        <div className='min-w-full h-4/5 flex justify-center flex-col items-center'>
            <img className='h-24' src='wallet.png' alt='' />
                <h1 className='text-white text-2xl font-medium text-center'>Decentralised Wallet</h1>
            <div className='w-1/3 h-40 mt-4 bg-black bg-opacity-70 rounded-full shadow-lg flex flex-col justify-center items-center '>
                <h1 className='text-white text-2xl font-medium text-center'>Login</h1>
                {typeof window.ethereum !== 'undefined' ?
                    <div className='flex text-lg font-medium cursor-pointer bg-green-800 text-whi
             mt-4 rounded-full justify-center items-center py-1 px-2' onClick={loginWallet}>Connect With Metamask
                        <img className="h-10 " src='metamask.png' alt='' />       </div>
                    :
                    <div className='flex flex-col'>
                        <a target="_blank" href='https://metamask.io/download/' rel="noreferrer">
                            <div className='flex text-lg font-medium cursor-pointer bg-red-800 text-whi
             mt-4 rounded-full justify-center items-center py-1 px-2'>Install Metamask
                                <img className="h-10 " src='metamask.png' alt='' />
                            </div>
                        </a>
                        <p className='text-red-600 text-sm' > * Login requires metamask extension</p>
                    </div>
                }
                <p className='text-red-600 text-sm mt-2'>{error}</p>
            </div>
        </div>
    )
}

export default Login
