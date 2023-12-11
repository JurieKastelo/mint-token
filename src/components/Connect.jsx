import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import {
  TextField,
  Button,
  Container,
  Grid,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function ConnectToMetaMask() {
  const [isMetaMaskActive, setIsMetaMaskActive] = useState(false);
  const [er, setEr] = useState(null);

  useEffect(() => {
    const checkMetaMask = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            console.log("MetaMask is active!");
            setIsMetaMaskActive(true);
          } else {
            console.log("MetaMask is not active.");
            setIsMetaMaskActive(false);
          }
        } catch (error) {
          console.log("MetaMask is not active:", error);
          setIsMetaMaskActive(false);
        }
        window.ethereum.on("accountsChanged", handleAccountsChanged);
      } else {
        console.log("MetaMask is not installed.");
        setIsMetaMaskActive(false);
      }
    };

    checkMetaMask();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log("MetaMask disconnected.");
      setIsMetaMaskActive(false);
    } else {
      console.log("MetaMask is active!");
      setIsMetaMaskActive(true);
    }
  };

  const connectToMetaMask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected to MetaMask:", accounts);
      setIsMetaMaskActive(true);
    } catch (error) {
      console.log("Error connecting to MetaMask:", error);
      setIsMetaMaskActive(false);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={connectToMetaMask}
        sx={{
          background: "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 1,
        }}
      >
        Connect Wallet
      </Button>
      <Typography fontSize={12} color="textSecondary" sx={{ mt: 2 }}>
        Please connect your wallet to continue.
      </Typography>
      {er && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography fontSize={12} mt={1} color="error">
            {er}
          </Typography>
          <Button
            href="https://metamask.io/download/"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1.5,
              fontSize: 8,
              fontWeight: 100,
              border: "1px solid #8A2BE2",
              mt: 2,
            }}
          >
            <Typography fontSize={12} color="error" style={gradientStyle}>
              Install MetaMask
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ConnectToMetaMask;
