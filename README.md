'About the Project'
A decentralized content-sharing platform named "DeFlix" where users can create dynamic video NFTs and upload them on the platform for subscription and renting purposes of NFTs. So, Users have the option to either take subscription of the platform or rent a particular video to watch it . Leverages blockchain technology to provide a secure, transparent, and user-centric environment for sharing and consuming digital content.

'Individual Contributions'
Utsav: Writing the SmartContract Handled Account Abstraction using ThirdWeb, Handled frontend together with Rishik, handled Firebase integration for backend with rishik

Rishik: Handled IPFS integration using pinata, Handled frontend together with Utsav, handled integration of smart contracts with the front end using Web3js, handled backend integration using FireBase with Utsav

'Challenges Faced'
Problems with react framework : Things took a lot longer to do than it should have been due to lack of familiarity with react

Account Abstraction: Using api calls and sdks to integrate waller took us a lot of time due to very less familiarity with jsx

Integrating smart contract with frontend : this was quite a time taking task as we did this for the first time and we are new to using web3js and ethers.js

IPFS integration : we spent 2 days trying to integrate IPFS with our project. it took so long as there were problems with the sdk's of Lighthouse and Thirdweb, then finally we tried using Pinata and it worked out well. once we saw that there were problems with the Thirdweb sdk's so we tried to avoid using them anywhere in our project like in case of account abstraction and Smart Contract Integration with the frontend

Using Firebase : using firebase as a database to store metadata of nft (other than ipfs url of video) was a tideous task for us as we are using it for the first time 

'Learning From the hackathon'
Overall a lot of things were new for us and we couldn't do everything that we had planned to do in this hackathon mainly because we spent too much time on the ideation phase of the project (almost 1.5 days as initially we were planning to do a project on undercollateralised loans). We lernt a lot about IPFS and its integration , account abstraction and using it as smart wallets, dynamic nfts implementation, got exposure to new technologies like firebase and web3js, we also gained a lot of using experience in how to debug errors and gained some insights on faulty sdk's, we also learnt how to use AI tools efficiently in making such projects and much more important things like networking with teammates One of the first things to do next would be to gain fluency in using react framework and start learning some more advanced skills so that next time we can make and implement a better project and also perform better in future hackathons

'Video Preview'


'Technical Documentation '
front end --> this is completely made in react js
backend --> for this we have used firebase, we used a web2 centralised solution as the data which we have stored on it only for displaying the data on the website, also the data entered in the UploadModal is sent to the smart contract which mints an nft out of it and also stores its meta data on chain
ipfs integration --> we used pinata here
smart contract integration --> for this we have used web3js 
account abstraction --> for this we were using Thirdweb

'Install Dependencies: '
npm install react-scripts --save

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
