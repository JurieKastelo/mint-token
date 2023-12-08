import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../theme";
import TopNav from "@/components/TopNav";
import { ThirdwebWeb3Provider, ThirdwebWeb3ProviderProps } from "@3rdweb/hooks";
import "regenerator-runtime/runtime";

const supportedChainIds = [1, 3, 4, 5, 42, 56, 97, 128, 137, 80001, 11155111];
const connectors = {
  injected: {},
};

export default function App({ Component, pageProps }: AppProps) {
  // Define the props expected by ThirdwebWeb3Provider
  const web3ProviderProps: ThirdwebWeb3ProviderProps = {
    // Pass supportedChainIds and connectors within the props
    supportedChainIds,
    connectors,
  };

  return (
    <ThirdwebWeb3Provider {...web3ProviderProps}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ThirdwebWeb3Provider>
  );
}
