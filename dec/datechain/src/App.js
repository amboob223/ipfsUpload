import React, {useState} from "react";
import {ethers} from "ethers";
import { Button } from 'react-bootstrap';
function App() {
const [connectedAddress, setConnectedAddress] = useState(null)

const [review,setReview] = useState("")
const [disp, setDisp] = useState("")
  // ok with this app i want to be able to wirte to block chain we writiing a review or grade
  // and I want a button to read to the chain 
  // and render the data the revie data for the given address
const connectMetamask = async() =>{
  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await window.ethereum.request({method:"eth_requestAccounts"}); // we gott to put await so it dont be undefined
  const account = (accounts[0]);
    setConnectedAddress(account);
    console.log(provider)

 

}
const read =async() =>{
  const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/ab449feacf2f498f9bea2740f9c55840")
  const ERC20_abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_review",
				"type": "string"
			}
		],
		"name": "addReview",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "reviewId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "reviewer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "review",
				"type": "string"
			}
		],
		"name": "ReviewAdded",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getReview",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "latestReviewId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "review",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "reviews",
		"outputs": [
			{
				"internalType": "address",
				"name": "reviewer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "review",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
  const contractAddress = "0x49f9cA6a70Eb1B2483E660A105c8b5c991CD09a6"
     const contract =  new ethers.Contract(contractAddress,ERC20_abi,provider)
    const newReview = await contract.getReview() 

     const br = newReview[newReview.length -1]
	setDisp(br)

}

  const write = async()=>{
	  try {
			 const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/ab449feacf2f498f9bea2740f9c55840")
			 const ERC20_abi = [
		   {
			   "inputs": [
				   {
					   "internalType": "string",
					   "name": "_review",
					   "type": "string"
				   }
			   ],
			   "name": "addReview",
			   "outputs": [],
			   "stateMutability": "nonpayable",
			   "type": "function"
		   },
		   {
			   "inputs": [],
			   "stateMutability": "nonpayable",
			   "type": "constructor"
		   },
		   {
			   "anonymous": false,
			   "inputs": [
				   {
					   "indexed": false,
					   "internalType": "uint256",
					   "name": "reviewId",
					   "type": "uint256"
				   },
				   {
					   "indexed": false,
					   "internalType": "address",
					   "name": "reviewer",
					   "type": "address"
				   },
				   {
					   "indexed": false,
					   "internalType": "string",
					   "name": "review",
					   "type": "string"
				   }
			   ],
			   "name": "ReviewAdded",
			   "type": "event"
		   },
		   {
			   "inputs": [],
			   "name": "getReview",
			   "outputs": [
				   {
					   "internalType": "address",
					   "name": "",
					   "type": "address"
				   },
				   {
					   "internalType": "string",
					   "name": "",
					   "type": "string"
				   }
			   ],
			   "stateMutability": "view",
			   "type": "function"
		   },
		   {
			   "inputs": [],
			   "name": "latestReviewId",
			   "outputs": [
				   {
					   "internalType": "uint256",
					   "name": "",
					   "type": "uint256"
				   }
			   ],
			   "stateMutability": "view",
			   "type": "function"
		   },
		   {
			   "inputs": [],
			   "name": "owner",
			   "outputs": [
				   {
					   "internalType": "address",
					   "name": "",
					   "type": "address"
				   }
			   ],
			   "stateMutability": "view",
			   "type": "function"
		   },
		   {
			   "inputs": [],
			   "name": "review",
			   "outputs": [
				   {
					   "internalType": "string",
					   "name": "",
					   "type": "string"
				   }
			   ],
			   "stateMutability": "view",
			   "type": "function"
		   },
		   {
			   "inputs": [
				   {
					   "internalType": "uint256",
					   "name": "",
					   "type": "uint256"
				   }
			   ],
			   "name": "reviews",
			   "outputs": [
				   {
					   "internalType": "address",
					   "name": "reviewer",
					   "type": "address"
				   },
				   {
					   "internalType": "string",
					   "name": "review",
					   "type": "string"
				   }
			   ],
			   "stateMutability": "view",
			   "type": "function"
		   }
	   ]
	   
			 const contractAddress = "0x49f9cA6a70Eb1B2483E660A105c8b5c991CD09a6"
			 const privateKey = "5ccb69e0e14929628bdbdd4fbb1159f730f55c26eea04f8f370e6664546a5786";
			 const wallet = new ethers.Wallet(privateKey,provider)
			 const contract =  new ethers.Contract(contractAddress,ERC20_abi,wallet)
	   
			 
			  const tx =  await contract.addReview(review) // we got to make this function in smart contract 
				await tx.wait()
				console.log(tx)
			
		 } catch (error) {
			console.error(error)
		 }

  }// we will use this method to write to the contracvt by calling the function we put in the contract to leave a rating 
  
 

  return (
    <div className="App" style={{display:"flex", justifyContent:"center", alignItems:"center",height:"100vh", background:"#B76E79"}} >
		<div style={{textAlign:"center"}}>
	<div style={{marginBottom:"10px"}}>
	 <Button
	   variant="danger"
       onClick={connectMetamask}>connect Wallet</Button>
           
  </div>
	 <p>{connectedAddress}</p>
	 <div style={{marginBottom:"10px"}}>
		<input
          type="text"
          placeholder="leaveReview"
          value={review}
          onChange={(e)=>setReview(e.target.value)}
        /> 
	 </div>
        <div style={{marginBottom:"10px"}}>
			<Button variant="secondary" onClick={write}>write Contract</Button>	
		</div>
		
		<div style={{marginBotton:"10px"}}>
			       <Button  variant="success" onClick={read}>read contract</Button>
		</div>
 
		{disp}
				
       
			

		</div>
      
          
    </div>
  );
  
}

export default App;
