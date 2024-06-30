import Web3 from "web3";
import Web3Contract from "./contracts/Web3Contract.json";

let selectedAccount;
let nftContract;
let isInitialised = false;

export const init = async () => {
    let provider = window.ethereum;
    
    if (typeof provider !=='undefined'){
      //metamask is installed
      provider.request({ method: 'eth_requestAccounts' }).then(accounts => {
        selectedAccount = accounts[0];
        console.log(`selected account is ${selectedAccount}`);
      }).catch(err => {
        console.log(err);
        return;
      });
      window.ethereum.on( 'accountsChanged', function(accounts){
        selectedAccount = accounts[0];
        console.log(`selected account is changed to ${selectedAccount}`);
      });
    }
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    nftContract = new web3.eth.Contract(Web3Contract.abi, Web3Contract.networks[networkId].address // here input the address of the web3Contract 
        );
        isInitialised = true;

};
//export {nftContract};
