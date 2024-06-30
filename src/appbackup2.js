/*import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import VideoPage from './components/VideoPage';
import UploadModal from './components/UploadModal';
import Home from './pages/Home';
import styled from 'styled-components';
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from 'firebase/auth';
import DynamicNFT from "./contracts/Web3Contract.json";
import Web3 from 'web3';

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
  const [selectedAccount, setSelectedAccount] = useState("");

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const init = async () => {
      let provider = window.ethereum;

      if (typeof provider !== 'undefined') {
        try {
          const accounts = await provider.request({ method: 'eth_requestAccounts' });
          setSelectedAccount(accounts[0]);
          console.log(`Selected account is ${accounts[0]}`);

          window.ethereum.on('accountsChanged', (accounts) => {
            setSelectedAccount(accounts[0]);
            console.log(`Selected account is changed to ${accounts[0]}`);
          });
        } catch (err) {
          console.log(err);
          return;
        }
      }

      const web3 = new Web3(provider);
      //const networkId = await web3.eth.net.getId();
      const contract = new web3.eth.Contract(DynamicNFT.abi, "0xbB937e6e3651b61089DF7713269E3C4df0e59790");
      setNftContract(contract);
      setIsInitialised(true);
    };

    init();
  }, []);

  const handleLogin = async () => { 
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem('user', JSON.stringify(result.user));
      window.location.reload();
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUploadModal = () => {
    setIsUploadModalOpen(!isUploadModalOpen);
  };

  return (
    <Router>
      <Navbar toggleSidebar={toggleSidebar} open={isSidebarOpen} toggleUploadModal={toggleUploadModal} user={user} />
      <Sidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn} open={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} handleLogin={handleLogin} handleLogout={handleLogout}/>
      <MainContent isSidebarOpen={isSidebarOpen}>
        <UploadModal open={isUploadModalOpen} handleClose={toggleUploadModal} nftContract={nftContract} isInitialised={isInitialised} selectedAccount={selectedAccount} />
        <Routes>
          <Route path="/video/:id" element={<VideoPage nftContract={nftContract} isInitialised={isInitialised} selectedAccount={selectedAccount} />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </MainContent>
    </Router>
  );
};

export default App;*/
