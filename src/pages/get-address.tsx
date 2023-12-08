import { useWeb3 } from "@3rdweb/hooks";
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";

const tick = <Image src="/tick.png" alt="tick" width={30} height={30} />;
const copy = <Image src="/copy.png" alt="copy" width={30} height={30} />;

export default function Test() {
  const { address, chainId, connectWallet } = useWeb3();
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
    }, 5000);
  };

  if (address) {
    return (
      <>
        <p>Address: {truncateAddress(address)}</p>
        <p>ChainId: {chainId}</p>
        <Button sx={{ bgcolor: "none" }} onClick={handleCopyAddress}>
          {copied ? tick : copy}
        </Button>
      </>
    );
  } else {
    return (
      <>
        <button onClick={() => connectWallet("injected")}>Connect</button>
      </>
    );
  }
}
