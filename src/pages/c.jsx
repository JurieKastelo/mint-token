import { ethers } from "ethers";

function MetaMaskConnectButton() {
  async function ConnectButton() {
    if (
      typeof window.ethereum !== "undefined" ||
      typeof window.web3 !== "undefined"
    ) {
      // Web3 browser user detected. You can now use the provider.
      const accounts = await window.ethereum.enable();
      // const curProvider = window['ethereum'] || window.web3.currentProvider

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      console.log("accounts: ", accounts);
      console.log("provider: ", provider);

      const signer = provider.getSigner();
    }
  }
  const handlePrint = async () => {
    ConnectButton();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log("address: ", address);
    console.log("signer: ", signer);
    console.log("provider: ", provider);
  };

  return (
    <div>
      <button onClick={handlePrint}>signer</button>
    </div>
  );
}

export default MetaMaskConnectButton;
