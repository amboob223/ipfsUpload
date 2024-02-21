import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);

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

      // Get the IPFS hash for the file
      const fileIpfsHash = fileResponse.data.value.cid;
      setIpfsHash(fileIpfsHash);

      // Prepare JSON metadata
      const metadata = {
        name: 'Snatch',
        description: 'This is an NFT with file and metadata uploaded from my app.',
        image: `https://ipfs.io/ipfs/${fileIpfsHash}`,
      };

      // Convert metadata to JSON and upload to IPFS
      const metadataFormData = new FormData();
      metadataFormData.append('file', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));

      const metadataResponse = await axios.post('https://api.nft.storage/upload', metadataFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ0MDhGYzI5NDc4RGM4OEFkYUE0NzdGNzE3NGFFNmQ5RWZEMzZiYTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwODQ4NDU4Nzk5MywibmFtZSI6Impzb24ifQ.AgDqsUvPNhKnKrlKjdkvMYhJNXzsCXoBTVQTSp2xxnk',
        },
      });

      // Get the IPFS hash for the metadata
      const metadataIpfsHash = metadataResponse.data.value.cid;
      console.log('Metadata IPFS Hash:', metadataIpfsHash);

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
      {ipfsHash && <img src={`https://ipfs.io/ipfs/${ipfsHash}`} alt={`IPFSimage: ${ipfsHash}`} />}
    </div>
  );
}

export default App;
