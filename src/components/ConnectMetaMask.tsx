import React, { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import Image from "next/image";
import { useWeb3 } from "@3rdweb/hooks";

const gradientStyle = {
  background: "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

function ConnectMetaMask() {
  const { address, connectWallet } = useWeb3();

  const truncateAddress = (address: string) => {
    if (address) {
      const start = address.substring(0, 6);
      const end = address.substring(address.length - 4);
      return `${start}...${end}`;
    }
    return "";
  };

  return (
    <>
      {address ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 8,
            fontWeight: 100,
          }}
        >
          <Typography ml={1.5} mt={2} fontSize={12} style={gradientStyle}>
            Connected Address : {truncateAddress(address)}
          </Typography>
        </Box>
      ) : (
        <>
          <Button
            onClick={() => connectWallet("injected")}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1.5,
              fontSize: 8,
              fontWeight: 100,
              border: "1px solid #8A2BE2",
            }}
          >
            <Typography fontSize={12} style={gradientStyle}>
              Connect
            </Typography>
          </Button>
        </>
      )}
    </>
  );
}

export default ConnectMetaMask;
