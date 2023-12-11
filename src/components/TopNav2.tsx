import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Link } from "@mui/material";
import Image from "next/image";
import MetaMask from "public/metamask.svg";
import { useWeb3 } from "@3rdweb/hooks";

const gradientStyle = {
  background: "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)", // Purple to Pink gradient
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const TopNav: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "transparent", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: 5,
            mr: 5,
          }}
        >
          <Button
            href="/createToken"
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
              Create Token
            </Typography>
          </Button>
          <Button
            href="/send-token"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1.5,
              fontSize: 8,
              fontWeight: 100,
              border: "1px solid #8A2BE2",
              ml: 2,
            }}
          >
            <Typography fontSize={12} style={gradientStyle}>
              Send Token
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
