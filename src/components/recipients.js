import { useState, useContext, useEffect } from 'react';
import { Appstate } from '../App';
import { ethers } from 'ethers';
import { TailSpin } from 'react-loader-spinner';

const Recipients = () => {
  const appState = useContext(Appstate);

  const [recipientAddress, setRecipientAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  const handleCopy = (address, name) => {
    // setCopyText(address);
    navigator.clipboard.writeText(address);
    setMessage("Copied " + name + "'s address to clipboard.");
  }

  const addRecipient = async () => {
    try {
      if (!recipientAddress || !recipientName) {
        setError('Please enter recipient address and name');
        return;
      }
      const tx = await appState.walletContract.addRecepient(
        recipientAddress,
        recipientName
      );
      await tx.wait();
      setMessage('Recipient saved successfully');
      setRecipientAddress("");
      setRecipientName("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {

    const getData = async () => {
      const recipients = await appState.walletContract.filters.recepients(appState.address);
      const recipientsData = await appState.walletContract.queryFilter(recipients);
      setData(recipientsData);
    }
    getData();

  }, [])

  // const setRecipient = async (address,name)=>{
  //   appState.setRecipientAddress(`${address}`);
  //   setMessage("Selected "+name)
  // }

  return (
    <div className='p-2 text-white flex flex-col items-center justify-center'>
      <input
        onChange={(e) => setRecipientAddress(e.target.value)}
        value={recipientAddress}
        className='w-full p-4 border-2 mt-4 bg-black border-purple-900 rounded-full'
        placeholder="Receiver's address"
      />
      <input
        onChange={(e) => setRecipientName(e.target.value)}
        value={recipientName}
        className='w-full p-4 border-2 mt-4 bg-black border-purple-900 rounded-full'
        placeholder="Receiver's name"
      />
      <button
        onClick={addRecipient}
        className='bg-green-700 hover:bg-green-500 font-md font-mono h-full w-full py-3 mt-4 rounded-full'
      >
        Add Recipient
      </button>
      <p className='text-red-600 text-lg mt-2 px-3'>{error}</p>
      <p className='text-green-600 text-lg mt-2 px-1'>{message}</p>


      {data.map((e) => {
        return (
          <div onClick={() => handleCopy(e.args.recepient, e.args.recepientName)} className={`cursor-pointer p-2 w-full flex flex-col bg-black rounded-full border-2 border-purple-900 w-4/5 mt-2`}>
            <div className="flex w-full rounded-t-lg items-center justify-center">
              <div className="w-4/6 py-2 px-2">
                <p className="text-xl font-mono">Name: {e.args.recepientName}</p>
                <p className="text-xs font-mono">Address: {e.args.recepient}</p>
              </div>
              <button onClick={() => handleCopy(e.args.recepient, e.args.recepientName)} className='bg-green-700 hover:bg-green-500 font-medium font-mono h-full w-1/4 py-1  rounded-full'>
                Copy Address
              </button>
            </div>
          </div>
        )
      })}

    </div>
  );
};
export default Recipients;
