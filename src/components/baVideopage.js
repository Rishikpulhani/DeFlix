/*
// VideoPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { fetchVideos } from '../data';
import { videoHash } from './UploadModal';
import Web3 from "web3";

const VideoPage = ({nftContract, isInitialised, selectedAccount}) => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videos = await fetchVideos();
        const selectedVideo = videos.find(v => v.id === id);
        setVideo(selectedVideo);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchData();
  }, [id]); // Fetch data whenever id changes

  if (!isInitialised){
    return <div>loading...</div>;
  }
  console.log(nftContract);

  if (!video) {
    return <p>Loading...</p>; // Optional: Handle loading state
  }

  let tid = nftContract.methods.getTokenIdByIpfsHash(videoHash).call();
  let rentingPrice = nftContract.methods.getRentByIpfsHash(videoHash).call();

  const subs = () => {
    return nftContract.methods.subscribe().send({
      from: selectedAccount,
      value: Web3.utils.toWei('0.01', 'ether')
    });
  }
  const renting = (tid, rentingPrice) => {
    return nftContract.methods.rentNft(tid).send({from : selectedAccount, value: Web3.utils.toWei(rentingPrice,'ether')})
  }

  const flip = (tid) => {
    return nftContract.methods.flipMood(tid).send({from : selectedAccount});
  }

  const handleSubscribe = () => {
    subs().then((tx) => {
      console.log(tx);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleRent = () => {
    renting(tid,rentingPrice).then((tx) => {
      console.log(tx);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleFlip = () => {
    flip(tid).then((tx) => {
      console.log(tx);
      console.log(nftContract.methods.getCurrentTokenUri().call(tid));
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <video width="70%" controls>
          <source src={`/path/to/video${id}.mp4`} type="video/mp4" />
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
          flip
        </Button>
      </Container>
    </>
  );
};

export default VideoPage;

*/