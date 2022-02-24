import React from "react";
import { ChatEngine } from "react-chat-engine";
import { createTheme, ThemeProvider } from "@material-ui/core";


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

export default function ReactChatEngine() {
  return (
    <ThemeProvider theme={darkTheme}>
      <ChatEngine
        height={"100vh"}
        publicKey={"e173e9c9-12c1-408e-92dd-68dbd20e2115"}
        userName={"user1"}
        userSecret={"user1"}
      />
    </ThemeProvider>
  );
}
