// VideoPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { fetchVideos } from '../data';
import Web3 from "web3";

const VideoPage = ({ nftContract, isInitialised, selectedAccount }) => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [videoHash, setVideoHash] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [rentingPrice, setRentingPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videos = await fetchVideos();
        const selectedVideo = videos.find(v => v.id === id);
        console.log('Selected video:', selectedVideo);
        if (selectedVideo) {
          setVideo(selectedVideo);
          if (selectedVideo.hash) {
            setVideoHash(selectedVideo.hash); // Assuming `hash` is the IPFS hash field
            console.log(`Video hash set: ${selectedVideo.hash}`);
          } else {
            console.error(`Hash property is missing for video with ID ${id}.`);
          }
        } else {
          console.error(`Video with ID ${id} not found.`);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (nftContract && videoHash) {
        try {
          console.log(`Fetching token data for hash: ${videoHash}`);
          const tid = await nftContract.methods.getTokenIdByIpfsHash(videoHash).call();
          const price = await nftContract.methods.getRentByIpfsHash(videoHash).call();
          setTokenId(tid);
          setRentingPrice(price);
          console.log(`Token ID set: ${tid}`);
          console.log(`Renting price set: ${price}`);
        } catch (error) {
          console.error('Error fetching token data:', error);
        }
      }
    };

    fetchTokenData();
  }, [nftContract, videoHash]);

  if (!isInitialised) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <p>Loading...</p>;
  }

  const handleSubscribe = async () => {
    try {
      const tx = await nftContract.methods.subscribe().send({
        from: selectedAccount,
        value: Web3.utils.toWei('0.01', 'ether')
      });
      console.log(tx);
    } catch (err) {
      console.error(err);
    }
  }

  const handleRent = async () => {
    try {
      const tx = await nftContract.methods.rentNft(tokenId).send({
        from: selectedAccount,
        value: Web3.utils.toWei(rentingPrice, 'ether')
      });
      console.log(tx);
    } catch (err) {
      console.error(err);
    }
  }

  const handleFlip = async () => {
    if (!tokenId) {
      console.error('Token ID is not set');
      return;
    }
    try {
      const tx = await nftContract.methods.flipMood(tokenId).send({
        from: selectedAccount
      });
      console.log(tx);
      console.log(await nftContract.methods.getCurrentTokenUri(tokenId).call());
    } catch (err) {
      console.error('Error in flipping mood:', err);
    }
  }

  return (
    <>
      <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <video width="70%" controls>
          <source src={`/path/to/video/${id}.mp4`} type="video/mp4" />
        </video>
      </Container>
      <Container style={{ margin: "1rem" }}>
        <Typography variant="h4">{video.title}</Typography>
        <Typography variant="body1">{video.description}</Typography>
        <Button style={{ margin: "4px" }} variant="contained" color="primary" onClick={handleSubscribe}>
          Take a Subscription
        </Button>
        <Button variant="contained" color="secondary" onClick={handleRent}>
          Rent - {video.price}
        </Button>
        <Button style={{ margin: "4px" }} variant="contained" onClick={handleFlip}>
          Flip
        </Button>
      </Container>
    </>
  );
};

export default VideoPage;
