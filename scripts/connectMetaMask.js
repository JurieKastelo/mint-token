function connectMetaMask() {
  // Check if MetaMask is installed

  const { Web3 } = require("web3");

  // Now you can create a Web3 instance and use it to interact with Ethereum
  const web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/v0Ypfp-GJE_nXvPWeyqkA5FFW_Da-4Io"
  );

  // Example: Get the current Ethereum network ID
  web3.eth.net
    .getId()
    .then((networkId) => {
      console.log("Network ID:", networkId);
    })
    .catch((err) => {
      console.error("Error getting network ID:", err);
    });

  // Check if MetaMask is installeds
  if (typeof window.ethereum !== "undefined") {
    // MetaMask is available
    const web3 = new Web3(window.ethereum);

    // Request user permission to access their MetaMask account
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        // Access the user's Ethereum address
        const userAddress = accounts[0];
        console.log("Connected to MetaMask. User Address:", userAddress);

        // Now you can use web3 to interact with Ethereum
        // Example: Get user's ETH balance
        web3.eth.getBalance(userAddress, (error, balance) => {
          if (!error) {
            console.log(
              "ETH Balance:",
              web3.utils.fromWei(balance, "ether"),
              "ETH"
            );
          } else {
            console.error("Error fetching balance:", error);
          }
        });
      })
      .catch((error) => {
        console.error("Error connecting to MetaMask:", error);
      });
  } else {
    // MetaMask is not installed
    console.error("MetaMask is not installed");
  }
}

export default connectMetaMask;
