import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  Box,
  Button,
  Input,
  TextField,
  Typography,
  Container,
} from "@mui/material";

import Image from "next/image";
import { useWeb3 } from "@3rdweb/hooks";

// const privateKey =
//   "5c7eb5b502a73015f7c3edd5649b8087731b172cc96c061dda722f2e76151421";
// const provider = new ethers.providers.JsonRpcProvider(
//   "https://eth-sepolia.g.alchemy.com/v2/v0Ypfp-GJE_nXvPWeyqkA5FFW_Da-4Io"
// );
// const wallet = new ethers.Wallet(privateKey, provider);

const bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001a9338038062001a93833981810160405281019062000037919062000538565b828281600390816200004a919062000813565b5080600490816200005c919062000813565b5050506200009b3362000074620000a460201b60201c565b600a62000082919062000a8a565b836200008f919062000adb565b620000ad60201b60201c565b50505062000c2e565b60006012905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620001225760006040517fec442f0500000000000000000000000000000000000000000000000000000000815260040162000119919062000b6b565b60405180910390fd5b62000136600083836200013a60201b60201c565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036200019057806002600082825462000183919062000b88565b9250508190555062000266565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156200021f578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401620002169392919062000bd4565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620002b15780600260008282540392505081905550620002fe565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516200035d919062000c11565b60405180910390a3505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620003d38262000388565b810181811067ffffffffffffffff82111715620003f557620003f462000399565b5b80604052505050565b60006200040a6200036a565b9050620004188282620003c8565b919050565b600067ffffffffffffffff8211156200043b576200043a62000399565b5b620004468262000388565b9050602081019050919050565b60005b838110156200047357808201518184015260208101905062000456565b60008484015250505050565b60006200049662000490846200041d565b620003fe565b905082815260208101848484011115620004b557620004b462000383565b5b620004c284828562000453565b509392505050565b600082601f830112620004e257620004e16200037e565b5b8151620004f48482602086016200047f565b91505092915050565b6000819050919050565b6200051281620004fd565b81146200051e57600080fd5b50565b600081519050620005328162000507565b92915050565b60008060006060848603121562000554576200055362000374565b5b600084015167ffffffffffffffff81111562000575576200057462000379565b5b6200058386828701620004ca565b935050602084015167ffffffffffffffff811115620005a757620005a662000379565b5b620005b586828701620004ca565b9250506040620005c88682870162000521565b9150509250925092565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200062557607f821691505b6020821081036200063b576200063a620005dd565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620006a57fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000666565b620006b1868362000666565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620006f4620006ee620006e884620004fd565b620006c9565b620004fd565b9050919050565b6000819050919050565b6200071083620006d3565b620007286200071f82620006fb565b84845462000673565b825550505050565b600090565b6200073f62000730565b6200074c81848462000705565b505050565b5b8181101562000774576200076860008262000735565b60018101905062000752565b5050565b601f821115620007c3576200078d8162000641565b620007988462000656565b81016020851015620007a8578190505b620007c0620007b78562000656565b83018262000751565b50505b505050565b600082821c905092915050565b6000620007e860001984600802620007c8565b1980831691505092915050565b6000620008038383620007d5565b9150826002028217905092915050565b6200081e82620005d2565b67ffffffffffffffff8111156200083a576200083962000399565b5b6200084682546200060c565b6200085382828562000778565b600060209050601f8311600181146200088b576000841562000876578287015190505b620008828582620007f5565b865550620008f2565b601f1984166200089b8662000641565b60005b82811015620008c5578489015182556001820191506020850194506020810190506200089e565b86831015620008e55784890151620008e1601f891682620007d5565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b6001851115620009885780860481111562000960576200095f620008fa565b5b6001851615620009705780820291505b8081029050620009808562000929565b945062000940565b94509492505050565b600082620009a3576001905062000a76565b81620009b3576000905062000a76565b8160018114620009cc5760028114620009d75762000a0d565b600191505062000a76565b60ff841115620009ec57620009eb620008fa565b5b8360020a91508482111562000a065762000a05620008fa565b5b5062000a76565b5060208310610133831016604e8410600b841016171562000a475782820a90508381111562000a415762000a40620008fa565b5b62000a76565b62000a56848484600162000936565b9250905081840481111562000a705762000a6f620008fa565b5b81810290505b9392505050565b600060ff82169050919050565b600062000a9782620004fd565b915062000aa48362000a7d565b925062000ad37fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff848462000991565b905092915050565b600062000ae882620004fd565b915062000af583620004fd565b925082820262000b0581620004fd565b9150828204841483151762000b1f5762000b1e620008fa565b5b5092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000b538262000b26565b9050919050565b62000b658162000b46565b82525050565b600060208201905062000b82600083018462000b5a565b92915050565b600062000b9582620004fd565b915062000ba283620004fd565b925082820190508082111562000bbd5762000bbc620008fa565b5b92915050565b62000bce81620004fd565b82525050565b600060608201905062000beb600083018662000b5a565b62000bfa602083018562000bc3565b62000c09604083018462000bc3565b949350505050565b600060208201905062000c28600083018462000bc3565b92915050565b610e558062000c3e6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce5671461013457806370a082311461015257806395d89b4114610182578063a9059cbb146101a0578063dd62ed3e146101d057610093565b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100e657806323b872dd14610104575b600080fd5b6100a0610200565b6040516100ad9190610aa9565b60405180910390f35b6100d060048036038101906100cb9190610b64565b610292565b6040516100dd9190610bbf565b60405180910390f35b6100ee6102b5565b6040516100fb9190610be9565b60405180910390f35b61011e60048036038101906101199190610c04565b6102bf565b60405161012b9190610bbf565b60405180910390f35b61013c6102ee565b6040516101499190610c73565b60405180910390f35b61016c60048036038101906101679190610c8e565b6102f7565b6040516101799190610be9565b60405180910390f35b61018a61033f565b6040516101979190610aa9565b60405180910390f35b6101ba60048036038101906101b59190610b64565b6103d1565b6040516101c79190610bbf565b60405180910390f35b6101ea60048036038101906101e59190610cbb565b6103f4565b6040516101f79190610be9565b60405180910390f35b60606003805461020f90610d2a565b80601f016020809104026020016040519081016040528092919081815260200182805461023b90610d2a565b80156102885780601f1061025d57610100808354040283529160200191610288565b820191906000526020600020905b81548152906001019060200180831161026b57829003601f168201915b5050505050905090565b60008061029d61047b565b90506102aa818585610483565b600191505092915050565b6000600254905090565b6000806102ca61047b565b90506102d7858285610495565b6102e2858585610529565b60019150509392505050565b60006012905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606004805461034e90610d2a565b80601f016020809104026020016040519081016040528092919081815260200182805461037a90610d2a565b80156103c75780601f1061039c576101008083540402835291602001916103c7565b820191906000526020600020905b8154815290600101906020018083116103aa57829003601f168201915b5050505050905090565b6000806103dc61047b565b90506103e9818585610529565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b610490838383600161061d565b505050565b60006104a184846103f4565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146105235781811015610513578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161050a93929190610d6a565b60405180910390fd5b6105228484848403600061061d565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361059b5760006040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016105929190610da1565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361060d5760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016106049190610da1565b60405180910390fd5b6106188383836107f4565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff160361068f5760006040517fe602df050000000000000000000000000000000000000000000000000000000081526004016106869190610da1565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107015760006040517f94280d620000000000000000000000000000000000000000000000000000000081526004016106f89190610da1565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080156107ee578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516107e59190610be9565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361084657806002600082825461083a9190610deb565b92505081905550610919565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156108d2578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016108c993929190610d6a565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361096257806002600082825403925050819055506109af565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610a0c9190610be9565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610a53578082015181840152602081019050610a38565b60008484015250505050565b6000601f19601f8301169050919050565b6000610a7b82610a19565b610a858185610a24565b9350610a95818560208601610a35565b610a9e81610a5f565b840191505092915050565b60006020820190508181036000830152610ac38184610a70565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610afb82610ad0565b9050919050565b610b0b81610af0565b8114610b1657600080fd5b50565b600081359050610b2881610b02565b92915050565b6000819050919050565b610b4181610b2e565b8114610b4c57600080fd5b50565b600081359050610b5e81610b38565b92915050565b60008060408385031215610b7b57610b7a610acb565b5b6000610b8985828601610b19565b9250506020610b9a85828601610b4f565b9150509250929050565b60008115159050919050565b610bb981610ba4565b82525050565b6000602082019050610bd46000830184610bb0565b92915050565b610be381610b2e565b82525050565b6000602082019050610bfe6000830184610bda565b92915050565b600080600060608486031215610c1d57610c1c610acb565b5b6000610c2b86828701610b19565b9350506020610c3c86828701610b19565b9250506040610c4d86828701610b4f565b9150509250925092565b600060ff82169050919050565b610c6d81610c57565b82525050565b6000602082019050610c886000830184610c64565b92915050565b600060208284031215610ca457610ca3610acb565b5b6000610cb284828501610b19565b91505092915050565b60008060408385031215610cd257610cd1610acb565b5b6000610ce085828601610b19565b9250506020610cf185828601610b19565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610d4257607f821691505b602082108103610d5557610d54610cfb565b5b50919050565b610d6481610af0565b82525050565b6000606082019050610d7f6000830186610d5b565b610d8c6020830185610bda565b610d996040830184610bda565b949350505050565b6000602082019050610db66000830184610d5b565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610df682610b2e565b9150610e0183610b2e565b9250828201905080821115610e1957610e18610dbc565b5b9291505056fea26469706673582212201535a411484f38d61ec320bddbfa4765337cb4b8a63eb0beda19ac7e7b8766ba64736f6c63430008170033";

const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const tick = <Image src="/tick.png" alt="tick" width={25} height={25} />;
const copy = <Image src="/copy.png" alt="copy" width={25} height={25} />;

const gradientStyle = {
  background: "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)", // Purple to Pink gradient
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

function CreateToken() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [deploying, setDeploying] = useState(false); // Add deploying state
  const [deployedAddress, setDeployedAddress] = useState("");

  const { address, chainId, connectWallet, disconnectWallet } = useWeb3();
  const [copied, setCopied] = useState(false);

  const truncateAddress = (deployedAddress) => {
    if (deployedAddress) {
      const start = deployedAddress.substring(0, 6);
      const end = deployedAddress.substring(deployedAddress.length - 4);
      return `${start}...${end}`;
    }
    return "";
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(deployedAddress);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const [provider, setProvider] = useState(null);

  useEffect(() => {
    async function setupProvider() {
      if (window.ethereum) {
        const injectedProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        setProvider(injectedProvider);
      }
    }

    setupProvider();
  }, []);

  const [er, setEr] = useState(null);

  async function createToken() {
    if (!provider) {
      setEr(
        "Ethereum provider not detected. Make sure you have metamask installed and try again."
      );
      return;
    }
    setDeploying(true);

    try {
      const signer = provider.getSigner();
      const contractFactory = new ethers.ContractFactory(abi, bytecode, signer);

      const contract = await contractFactory.deploy(
        tokenName,
        tokenSymbol,
        tokenAmount
      );
      await contract.deployed();
      console.log("Token deployed at address:", contract.address);
      setDeployedAddress(contract.address);
      setDeploying(false);
      // ... (rest of your logic)
    } catch (error) {
      console.error("Error deploying contract:", error);
      // Handle error
    } finally {
      setDeploying(false);
    }
  }

  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

  // useEffect(() => {
  //   // Function to check MetaMask connection
  //   const checkConnection = async () => {
  //     if (typeof window.ethereum !== "undefined") {
  //       try {
  //         // Request accounts access if not already authorized
  //         const accounts = await window.ethereum.request({
  //           method: "eth_requestAccounts",
  //         });
  //         if (accounts.length > 0) {
  //           setIsMetaMaskConnected(true);
  //         } else {
  //           setIsMetaMaskConnected(false);
  //         }
  //       } catch (error) {
  //         setIsMetaMaskConnected(false);
  //       }
  //     } else {
  //       setIsMetaMaskConnected(false);
  //     }
  //   };

  //   checkConnection();
  // }, []);

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request accounts access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsMetaMaskConnected(true);
      } catch (error) {
        console.error("Error connecting MetaMask:", error);
      }
    } else {
      console.error("MetaMask extension not detected");
    }
  };

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
      {isMetaMaskConnected ? (
        <>
          <Typography variant="h6" color="primary" style={gradientStyle}>
            Create Your Custom Token
          </Typography>
          <Box sx={{ maxWidth: 300, textAlign: "center" }}>
            <TextField
              label="Token Name"
              id="tokenName"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                sx: {
                  background:
                    "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)", // Apply gradient to input
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                },
              }}
            />
            <TextField
              label="Token Symbol"
              id="tokenSymbol"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                sx: {
                  background:
                    "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)", // Apply gradient to input
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                },
              }}
            />
            <TextField
              label="Initial Supply"
              id="tokenAmount"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
              sx={{ mb: 3 }}
              InputProps={{
                sx: {
                  background:
                    "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)", // Apply gradient to input
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={createToken}
              disabled={deploying} // Disable button when deploying
              sx={{
                background: "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              {deploying ? "Deploying..." : "Deploy Token"}
            </Button>

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

            <Typography fontSize={12} color="textSecondary" sx={{ mt: 2 }}>
              Your token address will be displayed below once the deployment is
              complete.
            </Typography>
            {deployedAddress ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
                    border: "1px solid #8A2BE2",
                    mt: 2,
                  }}
                >
                  <Typography ml={1.5} fontSize={12} style={gradientStyle}>
                    {truncateAddress(deployedAddress)}
                  </Typography>
                  <Box sx={{ minWidth: 40, bgcolor: "none" }}>
                    {copied ? tick : copy}
                  </Box>
                </Button>
              </Box>
            ) : (
              <>
                <Box
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
                  <Typography fontSize={12} style={gradientStyle}>
                    .Contract Address.
                  </Typography>
                </Box>
              </>
            )}
            <Typography fontSize={12} color="textSecondary" sx={{ mt: 2 }}>
              You can copy the address and paste it in your metamask.
            </Typography>
          </Box>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={connectMetaMask}
          sx={{
            background: "-webkit-linear-gradient(45deg, #8A2BE2, #FF69B4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Connect Wallet
        </Button>
      )}
      {/* {deployedAddress && ( // Render only if deployedAddress exists
        <Typography fontSize={9} color="textSecondary" sx={{ mt: 2 }}>
          Token deployed at address:
          <br />
          {deployedAddress}
        </Typography>
      )} */}
    </Container>
  );
}

export default CreateToken;
