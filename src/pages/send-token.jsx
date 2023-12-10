import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import {
  TextField,
  Button,
  Container,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function YourComponent() {
  const gradientStyle = {
    background: "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)", // Purple to Pink gradient
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  const [web3, setWeb3] = useState(null);
  const erc20Abi = [
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ name: "", type: "bool" }],
      type: "function",
    },
  ];

  const [totalAmount, setTotalAmount] = useState("");
  const [recipientInputs, setRecipientInputs] = useState([
    { recipient: "", amount: "" },
  ]);
  const [addressInput, setAddressInput] = useState("");

  const handleAddressChange = (event) => {
    setAddressInput(event.target.value);
  };

  const handleTotalAmountChange = (event) => {
    setTotalAmount(event.target.value);
  };

  const handleRecipientChange = (index, key, value) => {
    const newRecipients = [...recipientInputs];
    newRecipients[index][key] = value;
    setRecipientInputs(newRecipients);
  };

  const handleAddRecipient = () => {
    setRecipientInputs([...recipientInputs, { recipient: "", amount: "" }]);
  };

  const handleRemoveRecipient = (index) => {
    const newRecipients = [...recipientInputs];
    newRecipients.splice(index, 1);
    setRecipientInputs(newRecipients);
  };

  const handleTransfer = () => {
    const totalAmountInWei = web3.utils.toWei(totalAmount, "ether");
    const totalAmountPerRecipient = totalAmountInWei / recipientInputs.length;

    recipientInputs.forEach((recipient) => {
      if (recipient.recipient) {
        transferTokens(recipient.recipient, totalAmountPerRecipient);
      }
    });
  };

  const transferTokens = useCallback(
    async (recipient, amount) => {
      if (!web3) {
        console.error("Web3 not initialized!");
        return;
      }

      const tokenAddress = addressInput; // Replace with your actual token contract address

      const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress);

      const fromAddress = (await web3.eth.getAccounts())[0];

      try {
        const result = await tokenContract.methods
          .transfer(recipient, amount)
          .send({ from: fromAddress });

        console.log(`Transaction hash: ${result.transactionHash}`);
        console.log(`Tokens transferred to ${recipient}`);
      } catch (error) {
        console.error(`Error transferring tokens to ${recipient}:`, error);
      }
    },
    [web3, addressInput]
  );

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Request account access
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
        } catch (error) {
          console.error("Error connecting to Metamask:", error);
        }
      } else {
        console.error("Metamask not detected!");
      }
    };

    initWeb3();
  }, [setWeb3]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        mt: 5,
      }}
    >
      <Box sx={{ maxWidth: 300, textAlign: "center" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Token Address"
              fullWidth
              value={addressInput}
              onChange={handleAddressChange}
              InputProps={{
                sx: {
                  background:
                    "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)", // Apply gradient to input
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Total Amount to Split"
              fullWidth
              value={totalAmount}
              onChange={handleTotalAmountChange}
              InputProps={{
                sx: {
                  background:
                    "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)", // Apply gradient to input
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                },
              }}
            />
          </Grid>
          {recipientInputs.map((recipient, index) => (
            <React.Fragment key={index}>
              <Grid item xs={10}>
                <TextField
                  label={`Recipient ${index + 1}`}
                  fullWidth
                  value={recipient.recipient}
                  onChange={(event) =>
                    handleRecipientChange(
                      index,
                      "recipient",
                      event.target.value
                    )
                  }
                  InputProps={{
                    sx: {
                      background:
                        "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)", // Apply gradient to input
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                {index !== 0 && (
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveRecipient(index)}
                  >
                    <RemoveIcon
                      sx={{
                        background:
                          "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)",
                      }}
                    />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={1}>
                {index === recipientInputs.length - 1 && (
                  <IconButton color="primary" onClick={handleAddRecipient}>
                    <AddIcon
                      sx={{
                        background:
                          "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)",
                      }}
                    />
                  </IconButton>
                )}
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleTransfer}
              sx={{
                background: "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Send Tokens
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default YourComponent;
