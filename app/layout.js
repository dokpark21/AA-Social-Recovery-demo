import './globals.css';
import MainHeader from '@/components/MainHeader';

export const metadata = {
  title: 'RecoverMe',
  description: 'Recover your lost assets with RecoverMe',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="Main Header">
        <MainHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
