import React, { useState,useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Assuming you have configured Firebase and exported db
//import { useStorageUpload } from '@thirdweb-dev/react';
import axios from "axios";
import Web3Contract from "../contracts/Web3Contract.json";
import Web3 from 'web3';
//import { init } from "../Web3Client";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
let videoHash;
const UploadModal = ({ open, handleClose, nftContract, isInitialised, selectedAccount }) => {
  

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [primaryThumbnail, setPrimaryThumbnail] = useState('');
  const [secondaryThumbnail, setSecondaryThumbnail] = useState('');
  const [price, setPrice] = useState('');
  const [label, setLabel] = useState('');
  const [videoFile, setVideoFile] = useState(null);


  if (!isInitialised){
    return <div>loading...</div>;
  }
  console.log(nftContract);
  

  //let tid = nftContract.methods.getTokenIdByIpfsHash(videoHash).call();

  const mintToken = (title,description,primaryThumbnail,secondaryThumbnail,price,label,videoHash) =>{
    return nftContract.methods.mintNft(title, description,primaryThumbnail,secondaryThumbnail,videoHash,price,label,0).send({ from : selectedAccount});
  }
  /*const subs = () => {
    return nftContract.methods.subscribe().send({
      from: selectedAccount,
      value: Web3.utils.toWei('0.01', 'ether')
    });
  }
  const renting = () => {
    return nftContract.methods.
  }

  const flip = () => {
    return nftContract.methods.flipMood().send({from : selectedAccount});
  }*/

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  /*const { mutateAsync: upload} = useStorageUpload();

     const uploadToIpfs = async(file) => {
        const uploadUrl = await upload({
          data: [file],
          options: {
            uploadWithGatewayUrl: true,
            uploadWithoutDirectory: true
          }
        })
        console.log('upload url', uploadUrl);
      };*/
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Upload video file to storage (assuming you have storage logic)
      // For simplicity, I'm focusing on Firestore data upload
     
      //uploadToIpfs(videoFile);
      const formData = new FormData();
      formData.append("file", videoFile);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `78c217bf156c25cc277b`,
          pinata_secret_api_key: `edf43e9afa143cdef94485c36497bb8479e0c477fdde0e6e1974b5845c2e6e58`,
          "Content-Type": "multipart/form-data",
        },
      });
      videoHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      console.log(videoHash);

      mintToken(title,description,primaryThumbnail,secondaryThumbnail,0,label,videoHash).then((tx) => {
        console.log(tx);
      }).catch((err) => {
        console.log(err);
      });

      // Add video data to Firestore
      const docRef = await addDoc(collection(db, 'videos'), {
        title,
        description,
        primaryThumbnail,
        secondaryThumbnail,
        price: parseFloat(price), // Convert price to number (if necessary)
        label,
        // Add more fields as needed
      });

      console.log('Document written with ID: ', docRef.id);
      handleClose(); // Close modal on success
    } catch (error) {
      console.error('Error adding document: ', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Header>
          <Typography variant="h6" component="h2">
            Upload Video
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Header>
        <Form onSubmit={handleSubmit}>
          <TextField label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} required />
          <TextField label="Description" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} required />
          <TextField label="Primary Thumbnail URL" fullWidth value={primaryThumbnail} onChange={(e) => setPrimaryThumbnail(e.target.value)} required />
          <TextField label="Secondary Thumbnail URL" fullWidth value={secondaryThumbnail} onChange={(e) => setSecondaryThumbnail(e.target.value)} />
          <TextField label="Rent Price" type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} required />
          <Select
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            fullWidth
            required
            displayEmpty
            inputProps={{ 'aria-label': 'Label' }}
          >
            <MenuItem value="" disabled>
              Select Label
            </MenuItem>
            <MenuItem value="Movie">Movie</MenuItem>
            <MenuItem value="TV Show">TV Show</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Anime">Anime</MenuItem>
            <MenuItem value="Kids">Kids</MenuItem>
          </Select>
          <input type="file" accept="video/*" onChange={handleFileChange} required />
          <Button type="submit" variant="contained" color="primary">
            Upload
          </Button>
        </Form>
      </Box>
    </Modal>
  );
};

export default UploadModal;
export {videoHash};
