'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';

export default function WalletConnect() {
  const [address, setAddress] = useState(null);
  const router = useRouter();

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const addr = await signer.getAddress();

        setAddress(addr);
        router.push(`/${addr}`);
      } catch (err) {
        console.error('지갑 연결 오류:', err);
      }
    } else {
      alert('MetaMask가 필요합니다!');
    }
  };

  const disconnectWalletHandler = async () => {
    setAddress(null);
    router.push('/');
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress(null);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged
        );
      };
    }
  }, []);

  return (
    <div
      style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}
    >
      {address ? (
        <>
          <button onClick={disconnectWalletHandler}>
            🦊 Connected: {address.slice(0, 6)}...{address.slice(-4)}
          </button>
        </>
      ) : (
        <button onClick={connectWalletHandler}>🦊 Connect Wallet</button>
      )}
    </div>
  );
}
