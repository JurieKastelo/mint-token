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
import ConnectToMetaMask from "../components/Connect";

function YourComponent() {
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

  const gradientStyle = {
    background: "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)",
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

      const tokenAddress = addressInput;

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

  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
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

  const fetchAccounts = async () => {
    if (web3) {
      try {
        const accounts = await web3.eth.getAccounts();
        setConnectedAccounts(accounts);
        setCurrentAccount(accounts[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    }
  };

  useEffect(() => {
    fetchAccounts();

    if (web3) {
      window.ethereum.on("accountsChanged", fetchAccounts);
    }

    return () => {
      if (web3) {
        window.ethereum.removeListener("accountsChanged", fetchAccounts);
      }
    };
  }, [web3]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        mt: "10%",
      }}
    >
      {isMetaMaskActive ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              style={gradientStyle}
              textAlign="center"
              mb={5}
            >
              Send your tokens to your friends
              <br />
              with one click!
            </Typography>
            <Box sx={{ maxWidth: 400, textAlign: "center" }}>
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
                          "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)",
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
                          "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" style={gradientStyle}>
                      Add Recipient Address
                    </Typography>
                    <IconButton color="primary" onClick={handleAddRecipient}>
                      <AddIcon
                        sx={{
                          background:
                            "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)",
                        }}
                      />
                    </IconButton>
                  </Box>
                </Grid>
                {recipientInputs.map((recipient, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
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
                                "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            },
                          }}
                        />
                        <IconButton
                          color="secondary"
                          onClick={() => handleRemoveRecipient(index)}
                        >
                          <RemoveIcon
                            sx={{
                              ml: 2,
                              background:
                                "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)",
                            }}
                          />
                        </IconButton>
                      </Box>
                    </Grid>
                  </React.Fragment>
                ))}

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTransfer}
                    sx={{
                      background:
                        "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mt: 3,
                    }}
                  >
                    Send Tokens
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 10,
            }}
          >
            <Box>
              {connectedAccounts.map((account, index) => (
                <div key={index}>
                  {account === currentAccount ? (
                    <Typography key={index} mt={1}>
                      <Typography
                        variant="h6"
                        color="primary"
                        style={gradientStyle}
                        mb={1}
                      >
                        Current account:
                      </Typography>
                      <Typography fontSize={12} color="primary" mb={4} ml={2}>
                        {account}
                      </Typography>
                    </Typography>
                  ) : null}
                </div>
              ))}
              {connectedAccounts.length > 1 && (
                <Typography
                  variant="h6"
                  color="primary"
                  style={gradientStyle}
                  mb={1}
                >
                  Other connected accounts:
                </Typography>
              )}
              {connectedAccounts
                .filter((account) => account !== currentAccount)
                .map((account, index) => (
                  <div key={index}>
                    <Typography fontSize={12} mt={1} ml={2} color="primary">
                      {account}
                    </Typography>
                  </div>
                ))}
            </Box>
          </Container>
        </Box>
      ) : (
        <Box sx={{ mt: -20 }}>
          <ConnectToMetaMask />
        </Box>
      )}
    </Box>
  );
}

export default YourComponent;
