/*import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import VideoPage from './components/VideoPage';
import UploadModal from './components/UploadModal';
import Home from './pages/Home';
import styled from 'styled-components';
import {auth, provider, db} from "./firebase";
import { signInWithPopup, signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import DynamicNFT from "./contracts/Web3Contract.json";
import Web3 from 'web3';
//import { init } from "./Web3Client";
//import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react"

// activeChainId = ChainId.BinanceSmartChainTestnet;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${props => (props.isSidebarOpen ? '240px' : '0')};
  transition: margin-left 0.3s ease;
`;

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  
  const [nftContract, setNftContract] = useState(null);
const [isInitialised, setIsInitialised] = useState(false);
const[selectedAccount, setSelectedAccount] = useState("");
let contractAddress = "0xbB937e6e3651b61089DF7713269E3C4df0e59790";

  const user = JSON.parse(localStorage.getItem('user'));
  //const providerUrl = 'https://eth-sepolia.g.alchemy.com/v2/K7lY6Y6eJSvbWdQUnGj78vj3vEbycnA1'
  // use this if not using metamask

  useEffect(async () => {
    //const web3 = new Web3(providerUrl);
    
        init();

    
  }, []);

  const init = async () => {
    let provider = window.ethereum;
  
    if (typeof provider !== 'undefined') {
      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        setSelectedAccount(accounts[0]);
        console.log(`Selected account is ${selectedAccount}`);
  
        window.ethereum.on('accountsChanged', (accounts) => {
          setSelectedAccount(accounts[0]);
          console.log(`Selected account is changed to ${selectedAccount}`);
        });
      } catch (err) {
        console.log(err);
        return;
      }
    }
  
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    const contract = new web3.eth.Contract(DynamicNFT.abi, contractAddress);
    setNftContract(contract);
    setIsInitialised(true);
  };
  


  

  const handleLogin = async() => { 
    try{
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem('user',JSON.stringify(result.user))
      window.location.reload();
      console.log(result.user)
      
    }
    catch(error){
      console.error(error);
    }
  };
  

  const handleLogout = async() => {
    try{
      await signOut(auth);
      localStorage.removeItem('user');
      window.location.reload();
    }
    catch (error){
      console.error(error);
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUploadModal = () => {
    setIsUploadModalOpen(!isUploadModalOpen);
  };

  return (
    //<ThirdwebProvider desiredChainId = {activeChainId}>
    <Router>
      <Navbar toggleSidebar={toggleSidebar} open={isSidebarOpen} toggleUploadModal={toggleUploadModal} user={user} />
      <Sidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn} open={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} handleLogin={handleLogin} handleLogout={handleLogout}/>
      <MainContent isSidebarOpen={isSidebarOpen}>
        <UploadModal open={isUploadModalOpen} handleClose={toggleUploadModal} nftContract={nftContract}
  isInitialised={isInitialised} selectedAccount={selectedAccount} />
        <Routes>
          <Route path="/video/:id" element={<VideoPage nftContract={nftContract}
  isInitialised={isInitialised} selectedAccount={selectedAccount}/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </MainContent>
    </Router>
    //</ThirdwebProvider>
  );
};

export default App;
*/