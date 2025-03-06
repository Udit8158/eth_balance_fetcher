"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function WalletConnector() {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const prevAddress = localStorage.getItem("connectedAddress");
    setAddress(prevAddress);
  });

  const connect = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const connectedAddress = (await provider.getSigner()).address;

    setAddress(connectedAddress);
    localStorage.setItem("connectedAddress", connectedAddress);
    console.log("connected", connectedAddress);
  };

  const disconnect = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("wallet_revokePermissions", [{ eth_accounts: {} }]); // Removes session
    localStorage.removeItem("connectedAddress");
    setAddress(null);
  };
  return (
    <div>
      {!address && <button onClick={connect}>Connect</button>}
      {address && <button onClick={disconnect}>Disconnect</button>}
      {address && <p>Connected to {address}</p>}
    </div>
  );
}
