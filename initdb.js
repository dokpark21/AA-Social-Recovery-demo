const sql = require('better-sqlite3');
const db = sql('recovery.db');

const dummyUsers = [
  {
    email: 'user@email.com',
    primary_eoa: '0xAbc123...',
    smart_wallet_address: '0xSmartAcc...',
    guardians: JSON.stringify(['0xG1...', '0xG2...', '0xG3...']),
    created_at: new Date('2025-04-01T12:00:00Z').toISOString(),
  },
];

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS user_recovery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    primary_eoa TEXT NOT NULL,
    smart_wallet_address TEXT NOT NULL,
    guardians TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`
).run();

async function initData() {
  const stmt = db.prepare(`
    INSERT INTO user_recovery (
      email,
      primary_eoa,
      smart_wallet_address,
      guardians,
      created_at
    ) VALUES (
      @email,
      @primary_eoa,
      @smart_wallet_address,
      @guardians,
      @created_at
    )
  `);

  for (const user of dummyUsers) {
    stmt.run(user);
  }
}

initData();
