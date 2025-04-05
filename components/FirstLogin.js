'use client';

import { useState } from 'react';
import registerUser from '@/utils/register';

export default function FirstLogin({ eoa }) {
  const [email, setEmail] = useState('');
  const [guardian1, setGuardian1] = useState('');
  const [guardian2, setGuardian2] = useState('');
  const [guardian3, setGuardian3] = useState('');

  const handleCreateSmartWallet = async () => {
    const guardians = [guardian1, guardian2, guardian3];

    try {
      const { scw, message } = await registerUser(email, eoa, guardians);
      alert(`SCW 생성 완료! 주소: ${scw}\n메시지: ${message}`);
    } catch (error) {
      console.error('Error creating SCW:', error);
      alert('SCW 생성 중 오류 발생');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">🛡️ RecoverMe 첫 로그인 설정</h2>
      <div className="mb-4">
        <label className="block mb-1">📮 이메일</label>
        <input
          type="email"
          className="w-full px-3 py-2 text-white rounded border border-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">🔑 내 지갑 주소 (EOA)</label>
        <input
          type="text"
          className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-400"
          value={eoa}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">🧍‍♂️ Guardian 1</label>
        <input
          type="text"
          className="w-full px-3 py-2 text-black rounded border border-gray-400"
          value={guardian1}
          onChange={(e) => setGuardian1(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">🧍‍♂️ Guardian 2</label>
        <input
          type="text"
          className="w-full px-3 py-2 text-black rounded border border-gray-400"
          value={guardian2}
          onChange={(e) => setGuardian2(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">🧍‍♂️ Guardian 3</label>
        <input
          type="text"
          className="w-full px-3 py-2 text-black rounded border border-gray-400"
          value={guardian3}
          onChange={(e) => setGuardian3(e.target.value)}
        />
      </div>
      <button
        onClick={handleCreateSmartWallet}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
      >
        🚀 SCW 생성
      </button>
    </div>
  );
}
