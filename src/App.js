import { useState, createContext, useEffect } from "react";
import Header from "./components/header";
import Login from "./components/login";
import Main from "./components/main";
import { ethers } from "ethers";
import wallet from "./wallet/wallet.json"

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState("");
  const [symbol, setSymbol] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("");
  const [ercTokenAddress, setErcTokenAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [walletContractAddress,setWalletContractAddress] = useState(""); 
  const [explorer, setExplorer] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [tokenChanged, setTokenChanged] = useState(false);
  const [showErc, setShowErc] = useState(false);
  const [ercLoading,setErcLoading] = useState(false);
  const [txLoading,setTxLoading] = useState(false);
  const [showRecentTx, setShowRecentTx] = useState(false);
  const [recentTx, setRecentTx] = useState({txhash:'',from:'',to:'',amount:'',symbol:''});
  const [saveTxLoad, setSaveTxLoad] = useState(false);


  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const ERCABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to ,uint amount) returns (bool) ",
    "function symbol() external view returns (string memory)",
    "function name() external view returns (string memory)"
  ]

  const ERCContract = new ethers.Contract(ercTokenAddress,ERCABI,signer);
  const walletContract = new ethers.Contract(walletContractAddress,wallet.output.abi,signer);
 
  const selectToken = async()=>{
    try{
      setErcLoading(true);
      const name = await ERCContract.name();
      const balance = await ERCContract.balanceOf(address);
      const symbol = await ERCContract.symbol();
      setBalance(ethers.utils.formatEther(balance));
      setSymbol(symbol);
      setCurrency(name); 
      setTokenChanged(true);
      setErcLoading(false);
    }
    catch(error){
      setError(error.message);
      setErcLoading(false);
    }

  }

  const removeToken = async()=>{
    try{
      if(chain=="Sepolia"){
        setCurrency("SepoliaEth");
        setSymbol("sEth");
      }
      else if(chain=="Polygon Mumbai"){
        setCurrency("Matic");
        setSymbol("Matic");      
      }
      setErcTokenAddress("");
      setShowErc(false);
      setTokenChanged(false);
      getBal();
    }
    catch{
      setError(error.message);
    }
  }
  
   const transferAmount = async()=>{
    setMessage("");
    setTxLoading(true);
    try {
      if(tokenChanged){
        const tx = await ERCContract.transfer(recipientAddress,ethers.utils.parseEther(amount));
        await tx.wait();
        selectToken();
        setRecentTx({txhash:tx.hash, from:address, to:recipientAddress,amount:amount,symbol:symbol});
        setShowRecentTx(true);
      }
      else{
        const tx = await walletContract._transfer(recipientAddress,symbol,{value:ethers.utils.parseEther(amount)});
        await tx.wait();
        getBal();
      }
      setMessage("Transaction Successful");
      setAmount("");
    } 
    catch (error) {
      setError(error.message);
    } 
    setTxLoading(false);
   }
 
  async function getBal() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const balance = await signer.getBalance();
    setBalance(ethers.utils.formatEther(balance));
  }

  const saveTx = async ()=>{
    setSaveTxLoad(true);
    try{
      const tx = await walletContract.saveTx(recentTx.from,recentTx.to,ethers.utils.parseEther(recentTx.amount),recentTx.symbol);
      await tx.wait();
      setMessage("Transaction Saved Successfully");
    }
    catch(error){
      setError(error.message);
    }
    setShowRecentTx(false);
    setSaveTxLoad(false);
  }

  useEffect(() => {
    const handleChainChanged = (chainId) => {
      if (chainId === "0xaa36a7") {
        setChain("Sepolia");
        setCurrency("SepoliaEth");
        setSymbol("sEth");
        setWalletContractAddress("0xb60b9a34533B9AdB574F580cDaD0715dCCe3290a");
        setExplorer("https://sepolia.etherscan.io/");
      } else if (chainId === "0x13881") {
        setChain("Polygon Mumbai");
        setCurrency("Matic");
        setSymbol("Matic");
        setWalletContractAddress("0x34A90C0b649bBc66C4758C46AdA275bD237D50cC");
        setExplorer("https://mumbai.polygonscan.com/");
      } else {
        setLogin(false);
      }
      getBal();
    };

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setLogin(true);
      } else {
        setAddress("");
        setLogin(false);
      }
      getBal();
    };


    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }


  }, []);

  useEffect(()=>{
    if(tokenChanged){
      selectToken();
    }else{
      getBal();
    }
  },[address])

  useEffect(()=>{
    removeToken();
  },[chain])

  return (
    <Appstate.Provider value={{ login, setLogin, address, setAddress, chain, setChain, symbol, setSymbol, balance, setBalance, currency, setCurrency, getBal,ercTokenAddress, setErcTokenAddress,recipientAddress, setRecipientAddress,amount, setAmount, walletContractAddress, setWalletContractAddress, explorer, setExplorer,error, setError,message, setMessage,tokenChanged, setTokenChanged,showErc, setShowErc,ercLoading,setErcLoading,selectToken,removeToken,transferAmount,txLoading,setTxLoading,  showRecentTx, setShowRecentTx,recentTx, setRecentTx,saveTxLoad, setSaveTxLoad, saveTx, walletContract }} >
      <div className="min-w-full h-screen">
        {login ? (
          <div className="min-w-full min-h-full">
            <Header />
            <Main />
          </div>
        ) : (
          <Login />
        )}
      </div>
    </Appstate.Provider>
  );
}

export default App;
export { Appstate };
