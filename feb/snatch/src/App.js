import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const connectMetamask = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setConnectedAddress(account);
      }
    } catch (error) {
      console.error(error);
    }
  }; 
  // this is a button that connect a userwallet by seing if the window.ethereuum which is metamask on the browser ezist
  //if it does then we make a varible called accounts which awaits ifi ts clicked it request the eth accounts using the
  // .request from metamask and the method eth_request accounts this produces an array of accounts
  //we get the first account and then change the state of the connected account to that 

  const fileChange = async (event) => {
    const selectedFile = event.target.files[0];

    try {
      // Upload the file to NFT.storage
      const fileFormData = new FormData();
      fileFormData.append('file', selectedFile);

      const fileResponse = await axios.post('https://api.nft.storage/upload', fileFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ0MDhGYzI5NDc4RGM4OEFkYUE0NzdGNzE3NGFFNmQ5RWZEMzZiYTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwODQ4MDk0ODUwOCwibmFtZSI6InNuYXRjaCJ9.jsK4LWYwQrAp3wiGtke4e2yul2nT7dufyZnyRHa3ad8',
        },
      });

      //this method is when a file is uploaded it goes from null sending the file to the ipfs
      //it does this on the event of an upload
      //it makes a variable called selectedFile which takes the target of the event which is an object then we get the files property which is an arrray
      //we get the first file from that array
      //then we try and catch the form when we make a formdata instance and append the key 
      //file to the value of the selected file we got from our variable 
      //we then make the post response with axios in teh authorization key according to api form ipfs you do the bear apikey like that 


      // Get the IPFS hash for the file
      const fileIpfsHash = fileResponse.data.value.cid;
      setIpfsHash(fileIpfsHash);

      // Prepare JSON metadata
      const newMetadata = {
        name: 'Snatch',
        description: 'This is an NFT with file and metadata uploaded from my app.',
        image: `https://ipfs.io/ipfs/${fileIpfsHash}`,
      };

      // Set metadata in the state
      setMetadata(newMetadata);

      console.log('File IPFS Hash:', fileIpfsHash);
      // console.log('Filecoin Deal Status:', fileResponse.data.value.deals[0].status);

    } catch (error) {
      console.error('Error uploading to NFT.storage:', error);
    }
  };

  return (
    <div>
      <button onClick={connectMetamask}>Connect Wallet</button>
      <p>{connectedAddress}</p>

      <input
        type="file"
        onChange={fileChange}
      />
      {metadata && <img src={metadata.image} alt={`IPFSimage: ${ipfsHash}`} />}
    </div>
  );
}

export default App;