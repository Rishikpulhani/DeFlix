### About the Project
A decentralized content-sharing platform where users can create dynamic video NFTs and upload them on the platform for buying and selling of NFTs
Users have the option to either take subscription of the platform or rent a particular video to watch it .
Leverages blockchain technology to provide a secure, transparent, and user-centric environment for sharing and consuming digital content. 

### Individual Contributions
Utsav:
Handled writing the SmartContract
Handled Account Abstraction with thirdweb
Handled frontend together with Rishik
Handled firebase integration for backend together with Rishik

Rishik:
Handled integration of smart contracts with the frontend using web3js
Handled IPFS integration using pinata
Handled frontend together with Utsav
Handled backend integration using FireBase with Utsav

### Challenges Faced

Problems with react framework : Things took a lot longer to do than it should have been due to lack of familiarity with react

Account Abstraction: Using api calls and sdks to integrate waller took us a lot of time due to very less familiarity with jsx

Integrating smart contract with frontend : this was quite a time taking task as we did this for the first time and we are new to using web3js and ethers.js

IPFS integration : we spent an entire day trying to integrate IPFS with our project. it took so long as there were problems with the sdk's of Lighthouse and Thirdweb, then finally we tried using Pinata and it worked out well. once we saw that there were problems with the Thirdweb sdk's so we tried to avoid using them anywhere in our project like in case of account abstraction and Smart Contract Integration with the frontend

Using Firebase : using firebase as a database to store metadata of nft (other than ipfs url of video) was a tideous task for us as we are using it for the first time 

### Learning From the hackathon
Overall a lot of things were new for us and we couldn't do everything that we had planned to do in this hackathon mainly because we spent too much time on the ideation phase of the project (almost 1.5 days as initially we were planning to do a project on undercollateralised loans). We lernt a lot about IPFS and its integration , account abstraction and using it as smart wallets, dynamic nfts implementation, got exposure to new technologies like firebase and web3js, we also gained a lot of using experience in how to debug errors and gained some insights on faulty sdk's, we also learnt how to use AI tools efficiently in making such projects and much more important things like networking with teammates One of the first things to do next would be to gain fluency in using react framework and start learning some more advanced skills so that next time we can make and implement a better project and also perform better in future hackathons

### Video Preview


# Technical Documentation 
front end --> this is completely made in react js
backend --> for this we have used firebase, we used a web2 centralised solution as the data which we have stored on it only for displaying the data on the website, also the data entered in the UploadModal is sent to the smart contract which mints an nft out of it and also stores its meta data on chain
ipfs integration --> we used pinata here
smart contract integration --> for this we have used web3js 
account abstraction --> for this we were using Thirdweb
wallet --> metamask

video link : https://drive.google.com/uc?id=1aLPVuViRoTcvgrYKVI0su7OJ_BqIC_xR&export=download

NOTE: PLEASE DONT USE THE EXISTING VIDEO CARDS TO TEST THE PROJECT AS THOSE ARE PUT BY US JUST FOR TESTING AND FRONT END DISPLAY AND SOME OF THEM DONT HAVE AN NFT BACKING THEM UP, SO PLEASE WHILE TESTING UPLOAD YOUR OWN DATA AS A CREATOR AND AND AFTER PRESSING THE UPLOAD BUTTON PLEASE REFRESH THE PAGE TO UPDATE THE FRONT END. YOU WILL BE ABLE TO SEE THE TRANSACTION OF MINTING NFT IN YOUR METAMASK AND CAN ALSO CHECK IN ETHERSCAN. 
NOTE: WHILE TESTING THE FLIP BUTTON FOR DYNAMIC NFT IMPLEMENTATION WE HAVE BASICALLY IMPLEMENTED IT BY CHANGING THE IMAGE URI. TO SEE THE CHANGES META DATA PLEASE OPEN THE CONSOLE. THE IMAGE WILL NOT CHANGE IN THE FRONT END AS IT IS DISPLAYED VIA FIREBASE. ALL DATA EXCEPT VIDEO, HICH IS STORED AT IPFS, IS STORED AT FIREBASE 

'Install Dependencies: '
npm install react-scripts --save

