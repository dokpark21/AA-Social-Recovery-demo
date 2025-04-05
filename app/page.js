// app/page.tsx or pages/index.tsx
import WalletConnect from '@/components/WalletConnect';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">RecoverMe 🔐</h1>
      <p className="text-lg mb-8">이곳은 RecoverMe의 메인 페이지입니다.</p>
    </main>
  );
}
