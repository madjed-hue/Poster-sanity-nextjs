import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { User } from "../typings";
import { createContext } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "stories-react/dist/index.css";

export const UsersContextApi = createContext<User[]>([]);

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
