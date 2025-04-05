const sql = require('better-sqlite3');
const db = sql('recovery.db');

export default function registerUser(email, eoa, guardians) {
  if (!email || !eoa || !Array.isArray(guardians) || guardians.length !== 3) {
    throw new Error('Invalid input');
  }

  const checkStmt = db.prepare(
    'SELECT * FROM user_recovery WHERE primary_eoa = ?'
  );
  const existing = checkStmt.get(eoa);

  if (existing) {
    return {
      scw: existing.smart_wallet_address,
      message: 'User already exists',
    };
  }

  const scw = `0xSmartWalletFor_${eoa.slice(2, 8)}`;
  const insertStmt = db.prepare(`
    INSERT INTO user_recovery (email, primary_eoa, smart_wallet_address, guardians, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertStmt.run(
    email,
    eoa,
    scw,
    JSON.stringify(guardians),
    new Date().toISOString()
  );

  return { scw, message: 'User registered and SCW created' };
}
