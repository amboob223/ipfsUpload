import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [fileName, setFilename] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    console.log("updated:", metadata);
  }, [metadata]);

  const connectMetamask = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setConnectedAddress(account);
        setIsWalletConnected(true);
      }
    } catch (error) {
      console.error(error);
    }
  }; 

  const fileChange = async (event) => {
    if (!isWalletConnected) {
      alert("Please connect your wallet first");
      return;
    }

    const selectedFile = event.target.files[0];

    console.log(selectedFile.name);
    setFilename(selectedFile.name);

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
        disabled={!isWalletConnected}
      />
      
      {metadata && <img style={{width:"100px"}} src={`https://${ipfsHash}.ipfs.nftstorage.link/${fileName}`} alt={`IPFSimage: ${ipfsHash}`} />}
    </div>
  );
}

export default App;
 