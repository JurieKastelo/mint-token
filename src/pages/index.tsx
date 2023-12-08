import { Box, Button, Grid, Link, Typography } from "@mui/material";
import React from "react";
import StayInformed from "@/components/StayInformed";
import Image from "next/image";
import BSC from "public/BSC.svg";
import ETH from "public/ETH.svg";
import Terminal from "public/terminal.png";
import Wallet from "public/wallet.png";
import Devices from "public/devices.png";
import MetaMask from "public/metamask.svg";

function CreateCoinHome() {
  return (
    <>
      <Box>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 10,
          }}
        >
          <Typography sx={{ fontSize: 16, color: "white" }}>
            Create your own
          </Typography>
          <Typography sx={{ fontSize: 16, color: "white", mb: 2 }}>
            Meme Coin!
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              color: "white",
              mb: 2,
              textAlign: "center",
              maxWidth: 300,
            }}
          >
            Create your own cryptocurrency token without having to know any code
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography sx={{ fontSize: 7, color: "white" }}>
            Works best with <span style={{ color: "#F5841F" }}>MetaMask</span>
          </Typography>
          <Image
            src={MetaMask}
            alt="MetaMask"
            width={15}
            style={{ marginLeft: 10 }}
          />
        </Box>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Link href="/createToken">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                minWidth: 100,
                minHeight: 30,
                borderRadius: 1.5,
                boxShadow: "none",
                mt: 2,
                fontSize: 8,
                fontWeight: 100,
              }}
            >
              Create Token
            </Button>
          </Link>
          <Link href="/coming-soon">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                minWidth: 100,
                minHeight: 30,
                borderRadius: 1.5,
                boxShadow: "none",
                mt: 2,
                ml: 5,
                fontSize: 8,
                fontWeight: 100,
              }}
            >
              How to use.
            </Button>
          </Link>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: 8, color: "white", mb: 2, ml: 8.5, mt: 3 }}
          >
            Available on&nbsp;&nbsp;&nbsp;
            <Image
              src={BSC}
              alt="BSC"
              width={20}
              style={{
                marginBottom: -3,
              }}
            />
            BSC&nbsp;&nbsp;&nbsp;&nbsp;
            <Image
              src={ETH}
              alt="ETH"
              width={15}
              style={{
                marginBottom: -3,
                marginRight: 4,
              }}
            />
            ETH
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid item xs={2} sx={{ ml: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <Image
                  src={Terminal}
                  alt="Terminal"
                  width={40}
                  style={{
                    marginTop: -3,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Typography sx={{ fontSize: 10, color: "white", mb: 0.5 }}>
                No Coding Needed
              </Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  color: "white",
                  mb: 3,
                  fontFamily: "Kufam, Arial, sans-serif",
                }}
              >
                Generate your token at the click of a button! Just connect your
                wallet, pick your options, and create your token!
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={2} sx={{ ml: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <Image
                  src={Wallet}
                  alt="Wallet"
                  width={40}
                  style={{
                    marginTop: 0,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Typography sx={{ fontSize: 10, color: "white", mb: 0.5 }}>
                Low Gas Fees
              </Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  color: "white",
                  mb: 3,
                  fontFamily: "Kufam, Arial, sans-serif",
                }}
              >
                Creating coins on the Binance Smart Chain lets your users
                transact with optimally low gas fees!
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={2} sx={{ ml: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <Image
                  src={Devices}
                  alt="Devices"
                  width={40}
                  style={{
                    marginTop: 0,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Typography sx={{ fontSize: 10, color: "white", mb: 0.5 }}>
                Fully Compliant & Verified Contracts
              </Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  color: "white",
                  mb: 3,
                  fontFamily: "Kufam, Arial, sans-serif",
                }}
              >
                All contracts are fully compliant to BEP20 contract standards
                and are fully usable on the Binance Smart Chain.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            p: 3,
            mt: 6,
            backgroundImage:
              "linear-gradient(to bottom, rgba(217, 217, 217, 1), rgba(217, 217, 217, 0))",
          }}
        >
          <Typography sx={{ fontSize: 16, mb: 1.7 }}>RoadMap</Typography>
          <Typography
            sx={{
              fontSize: 10,
              mb: 3,
              fontFamily: "Kufam, Arial, Sans-Serif",
              maxWidth: 230,
            }}
          >
            We aim to be the hub for all memecoin creators! Helping people
            easily create the next multi-million dollar memecoin and assisting
            creators in everything from launch to marketing.
          </Typography>
        </Box>
        <Box sx={{ mt: -3 }}>
          <StayInformed />
        </Box>
      </Box>
    </>
  );
}

export default CreateCoinHome;
