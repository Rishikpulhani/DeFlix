import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Assuming you have configured Firebase and exported db
import axios from "axios";
import Web3 from 'web3';

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

const UploadModal = ({ open, handleClose, nftContract, isInitialised, selectedAccount }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [primaryThumbnail, setPrimaryThumbnail] = useState('');
  const [secondaryThumbnail, setSecondaryThumbnail] = useState('');
  const [price, setPrice] = useState('');
  const [label, setLabel] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoHash, setVideoHash] = useState('');

  if (!isInitialised) {
    return <div>Loading...</div>;
  }

  console.log(nftContract);

  const mintToken = (title, description, primaryThumbnail, secondaryThumbnail, price, label, videoHash) => {
    return nftContract.methods.mintNft(title, description, primaryThumbnail, secondaryThumbnail, videoHash, price, label, 0).send({ from: selectedAccount });
  }

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
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
      const ipfsHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      setVideoHash(ipfsHash);
      console.log(ipfsHash);

      await mintToken(title, description, primaryThumbnail, secondaryThumbnail, price, label, ipfsHash);

      const docRef = await addDoc(collection(db, 'videos'), {
        title,
        description,
        primaryThumbnail,
        secondaryThumbnail,
        price: parseFloat(price),
        label,
        hash: ipfsHash // Store the IPFS hash in Firestore
      });

      console.log('Document written with ID: ', docRef.id);
      handleClose();
    } catch (error) {
      console.error('Error adding document: ', error);
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
          <TextField label="Secondary Thumbnail URL" fullWidth value={secondaryThumbnail} onChange={(e) => setSecondaryThumbnail(e.target.value)} required />
          <TextField label="Price" type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} required />
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
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Form>
      </Box>
    </Modal>
  );
};

export default UploadModal;
