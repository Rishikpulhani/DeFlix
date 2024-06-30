// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

contract DynamicNFT is ERC721{

    error CantFlipIfNotOwner();
    error NFTNotForSale();
    error InsufficientFunds();
    error CannotBuyOwnNFT();

    event ListedNFT(uint256 indexed tokenId, uint256 price);
    event BoughtNFT(uint256 indexed tokenId,address indexed buyer,uint256 price);
    event PriceUpdated(uint256 indexed tokenId, uint256 newPrice);
    event NFTDelisted(uint256 indexed tokenId);
    event CreatedNFT(uint256 indexed tokenId);
    event Subscribed(address indexed subscriber);
    
    struct Listing{
        address seller;
        uint256 price;
    }
    struct Rental {
        address renter;
        uint256 expiry;
    }

    mapping(uint256=>Listing) public listings;
    mapping(uint256 => uint256) public s_tokenIdToPrice;//keeps account for price of each minted nft
    mapping(uint256 => bool) public s_tokenIdForSale;
    mapping(uint256 => string) public s_tokenIdToState;
    mapping(uint256 => mapping(uint256=>string)) public s_tokenIdToTokenUri;
    mapping (address =>bool) public subscribers ;
    mapping(uint256 => Rental) public rentals;
    mapping(string=>uint256) public ipfsHashToTokenId;//mapping to get Token ID 
    mapping (string=>uint256)public ipfsHashToRentPrice;
    mapping (uint256=>uint256)public tokenIdToRentPrice;
    uint256 public s_tokenCounter;
    address public owner;

    constructor() ERC721("Create NFT", "CNFT") {
        owner = msg.sender;
        s_tokenCounter = 0;  
    }

    function convertToTokenUri (string memory _name,string memory _description,string memory _imageURI , string memory _ipfsHash,uint256 _rent,string memory _genre) public returns (  string memory ){
        return(string(
            abi.encodePacked(
                _baseURI(),
                Base64.encode(
                    bytes( 
                        abi.encodePacked(
                            '{"name":"', _name,
                            '", "description":"', _description,
                            '", "imageURI":"', _imageURI,
                            '", "ipfsHash":"', _ipfsHash,
                            '", "rent":"', _rent,
                            '", "genre":"', _genre,
                            '", "attributes":[{"trait_type":"moodiness", "value":100}]}'
                        )
                    )
                )
            )));
    }

    function mintNft(string memory _name,string memory _description,string memory _imageURI1 ,string memory _imageURI2, string memory _ipfsHash,uint256 _rent,string memory _genre ,uint256 _price) public {
        
        s_tokenIdToTokenUri[s_tokenCounter][0]=convertToTokenUri(_name,_description,_imageURI1,_ipfsHash,_rent,_genre);
        s_tokenIdToTokenUri[s_tokenCounter][1]=convertToTokenUri(_name,_description,_imageURI2,_ipfsHash,_rent,_genre);
        s_tokenIdToState[s_tokenCounter] = s_tokenIdToTokenUri[s_tokenCounter][0];//By Default in state1
        uint256 tokenCounter = s_tokenCounter;
        _safeMint(msg.sender, tokenCounter);//mints nft with owner as caller of the function
        s_tokenCounter = s_tokenCounter + 1;
        ipfsHashToTokenId[_ipfsHash] = tokenCounter;
        ipfsHashToRentPrice[_ipfsHash] = _rent;
        tokenIdToRentPrice[tokenCounter] = _rent;
        emit CreatedNFT(tokenCounter);
        s_tokenIdToPrice[tokenCounter] = _price;
        s_tokenIdForSale[tokenCounter] = true;
        emit ListedNFT(tokenCounter, _price);
    }
     function buyNft(uint256 tokenId) public payable {
        if (!s_tokenIdForSale[tokenId]) {
            revert NFTNotForSale();
        }
        uint256 price = s_tokenIdToPrice[tokenId];
        if (msg.value < price) {
            revert InsufficientFunds();
        }
        address ownerN = ownerOf(tokenId);
        if (ownerN == msg.sender) {
            revert CannotBuyOwnNFT();
        }

        s_tokenIdForSale[tokenId] = false;
        s_tokenIdToPrice[tokenId] = 0;

        _transfer(ownerN, msg.sender, tokenId);
        payable(ownerN).transfer(msg.value);

        emit BoughtNFT(tokenId, msg.sender, price);
    }
    function updatePrice(uint256 tokenId, uint256 newPrice) public {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can update the price");
        s_tokenIdToPrice[tokenId] = newPrice;
        emit PriceUpdated(tokenId, newPrice);
    }
    function delistNFT(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can delist the NFT");
        s_tokenIdForSale[tokenId] = false;
        s_tokenIdToPrice[tokenId] = 0;
        emit NFTDelisted(tokenId);
    }
    function flipMood(uint256 tokenId) public {
        if (getApproved(tokenId) != msg.sender && ownerOf(tokenId) != msg.sender) {
            revert CantFlipIfNotOwner();
        }
    
        bytes32 stateHash = keccak256(bytes(s_tokenIdToState[tokenId]));
        bytes32 tokenUriHash = keccak256(bytes(s_tokenIdToTokenUri[tokenId][0]));
    
        if (stateHash == tokenUriHash) {
            s_tokenIdToState[tokenId] = s_tokenIdToTokenUri[tokenId][1];
        } else {
            s_tokenIdToState[tokenId] = s_tokenIdToTokenUri[tokenId][0];
        }
    }
    function getCurrentTokenUri(uint256 tokenId) public view returns (string memory) {
        return s_tokenIdToState[tokenId];
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    function subscribe() payable external {
        require(msg.value==0.01 ether, "Subscription fee is 0.01 ether");
        subscribers[msg.sender] = true;
        emit Subscribed(msg.sender);
    }

    function isSubscribed(address subscriber) public view returns (bool) {
        return subscribers[subscriber];
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        payable(owner).transfer(address(this).balance);
    }
    event RentedNFT(uint256 indexed tokenId, address indexed renter);

    function hasAccess(uint256 tokenId, address user) public view returns (bool) {
        return subscribers[user] || (rentals[tokenId].renter == user && rentals[tokenId].expiry > block.timestamp);
    }
    function rentNft(uint256 tokenId) public payable {
        require(s_tokenIdForSale[tokenId], "NFT not available for rent");
       

        uint256 rentPrice = s_tokenIdToPrice[tokenId] / 10; // Assuming rent price is 10% of the sale price
        if (msg.value < rentPrice) {
            revert InsufficientFunds();
        }

        rentals[tokenId] = Rental({ renter: msg.sender, expiry: block.timestamp + 1000});

        emit RentedNFT(tokenId, msg.sender);
    }
    function getTokenIdByIpfsHash(string memory ipfsHash) public view returns (uint256) {
        return ipfsHashToTokenId[ipfsHash];
    }
    function getRentByIpfsHash(string memory ipfsHash) public view returns (uint256) {
        return ipfsHashToRentPrice[ipfsHash];
    }
    function getRentByTokenId(uint256 tokenId) public view returns (uint256) {
        return tokenIdToRentPrice[tokenId];
    }






    
    
    
}
