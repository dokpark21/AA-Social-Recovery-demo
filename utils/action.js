import sql from 'better-sqlite3';

const db = sql('recovery.db');

export function getUsers() {
  const stmt = db.prepare('SELECT * FROM user_recovery');
  return stmt.all();
}

export function getUserByEOA(eoa) {
  const stmt = db.prepare('SELECT * FROM user_recovery WHERE primary_eoa = ?');
  return stmt.get(eoa);
}

export function registerUser({ email, eoa, walletAddress, guardianList }) {
  const existing = getUserByEOA(eoa);
  if (existing) return existing;

  const smart_wallet_address = walletAddress;
  const guardians = JSON.stringify(guardianList);
  const created_at = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO user_recovery (email, primary_eoa, smart_wallet_address, guardians, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(email, eoa, smart_wallet_address, guardians, created_at);

  return getUserByEOA(eoa);
}
