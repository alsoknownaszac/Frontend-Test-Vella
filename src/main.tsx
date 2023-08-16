import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "../src/app/store";
import { Provider } from "react-redux";
import { CgCloseR } from "react-icons/cg";
import { SnackbarProvider, closeSnackbar } from "notistack";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <SnackbarProvider
    maxSnack={1}
    action={(snackbarId) => (
      <button onClick={() => closeSnackbar(snackbarId)}>
        <CgCloseR size={16} />
      </button>
    )}
    autoHideDuration={2000}
    preventDuplicate
    dense
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
  >
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </SnackbarProvider>
);
