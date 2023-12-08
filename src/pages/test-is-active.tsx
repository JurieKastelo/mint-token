import React, { useEffect, useState } from "react";

const YourComponent = () => {
  const [isMetaMaskActive, setIsMetaMaskActive] = useState(false);

  useEffect(() => {
    const checkMetaMask = async () => {
      if (window.ethereum) {
        try {
          // Check if MetaMask is installed
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

        // Listen for account changes
        window.ethereum.on("accountsChanged", handleAccountsChanged);
      } else {
        console.log("MetaMask is not installed.");
        setIsMetaMaskActive(false);
      }
    };

    checkMetaMask();

    return () => {
      // Cleanup: Remove the event listener when component unmounts
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
      // If accounts array is empty, MetaMask is disconnected
      console.log("MetaMask disconnected.");
      setIsMetaMaskActive(false);
    } else {
      // MetaMask still has active accounts
      console.log("MetaMask is active!");
      setIsMetaMaskActive(true);
    }
  };

  const connectToMetaMask = async () => {
    try {
      // Requesting access to MetaMask accounts
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

  const disconnectFromMetaMask = () => {
    setIsMetaMaskActive(false);
    console.log("Disconnected from MetaMask.");
  };

  return (
    <div>
      {isMetaMaskActive ? (
        <div>
          <p>MetaMask is active!</p>
          <button onClick={disconnectFromMetaMask}>
            Disconnect from MetaMask
          </button>
        </div>
      ) : (
        <button onClick={connectToMetaMask}>Connect to MetaMask</button>
      )}
      {/* Your other JSX */}
    </div>
  );
};

export default YourComponent;
