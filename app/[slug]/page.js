// app/[slug]/page.js
import { use } from 'react';
import { getUserByEOA } from '@/utils/action';
import FirstLogin from '@/components/FirstLogin';

export default function UserWalletPage(props) {
  const { slug } = use(props.params);

  const user = getUserByEOA(slug);
  if (!user) {
    return <FirstLogin eoa={slug} />;
  }

  console.log('User:', user);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">🔐 Your address: {slug}</h1>
      {/* 여기에 사용자 지갑 정보 또는 복구 설정 정보 렌더링 */}
    </div>
  );
}
