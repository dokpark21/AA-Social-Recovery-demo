import WalletConnect from './WalletConnect';
import Image from 'next/image';
import logo from '../public/logo.png';

export default function MainHeader() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        borderBottom: '1px solid #ddd',
        position: 'sticky',
        top: 0,
        backgroundColor: '#black',
        zIndex: 1000,
      }}
    >
      <h2>
        <Image
          src={logo}
          alt="RecoverMe Logo"
          width={100}
          height={100}
          style={{ marginRight: '10px' }}
        />
      </h2>
      <WalletConnect />
    </header>
  );
}
