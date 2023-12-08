import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Image from "next/image";
import MetaMask from "public/metamask.svg";
import { useWeb3 } from "@3rdweb/hooks";

const tick = <Image src="/tick.png" alt="tick" width={25} height={25} />;
const copy = <Image src="/copy.png" alt="copy" width={25} height={25} />;

const gradientStyle = {
  background: "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)", // Purple to Pink gradient
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const TopNav: React.FC = () => {
  const { address, chainId, connectWallet, disconnectWallet } = useWeb3();
  const [copied, setCopied] = useState(false);

  const truncateAddress = (address: string) => {
    if (address) {
      const start = address.substring(0, 6);
      const end = address.substring(address.length - 4);
      return `${start}...${end}`;
    }
    return "";
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address as string);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

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
        >
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Typography sx={{ fontSize: 7, color: "white", ml: 4, mt: 1 }}>
              Works best with <span style={{ color: "#F5841F" }}>MetaMask</span>
            </Typography>
            {/* <Image
              src={MetaMask}
              alt="MetaMask"
              width={15}
              style={{ marginTop: 4, marginLeft: 10 }}
            /> */}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Typography sx={{ fontSize: 22, color: "white", ml: 4, mt: 1 }}>
              Works best with <span style={{ color: "#F5841F" }}>MetaMask</span>
            </Typography>
            <Image
              src={MetaMask}
              alt="MetaMask"
              width={35}
              style={{ marginTop: 4, marginLeft: 10 }}
            />
          </Box>
        </Box>

        {address ? (
          <Button
            onClick={handleCopyAddress}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1.5,
              fontSize: 8,
              fontWeight: 100,
              //purple border
              border: "1px solid #8A2BE2",
            }}
          >
            <Typography ml={1.5} fontSize={12} style={gradientStyle}>
              {truncateAddress(address)}
            </Typography>
            <Box sx={{ minWidth: 40, bgcolor: "none" }}>
              {copied ? tick : copy}
            </Box>
          </Button>
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
                //purple border
                border: "1px solid #8A2BE2",
              }}
            >
              <Typography fontSize={12} style={gradientStyle}>
                Connect
              </Typography>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
