import bcrypt from 'bcryptjs';
import { openDb, run, get } from './src/db.js';
import { uid } from './src/utils.js';

async function seed() {
  const db = openDb('./db/taskflow.sqlite');

  console.log('Seeding Jan 2026 data...');

  // 1. Get or Create User
  let user = await get(db, 'SELECT id, email FROM users LIMIT 1');
  if (!user) {
    console.log('Creating demo user...');
    const userId = uid('u');
    const hash = await bcrypt.hash('password', 10);
    await run(db, 'INSERT INTO users(id,email,password_hash,name) VALUES (?,?,?,?)', [userId, 'demo@example.com', hash, 'Demo User']);
    user = { id: userId, email: 'demo@example.com' };
    console.log('Created user: demo@example.com / password');
  } else {
    console.log(`Using existing user: ${user.email}`);
  }

  // 2. Get or Create Workspace
  let mid = await get(db, 'SELECT workspace_id FROM memberships WHERE user_id = ? LIMIT 1', [user.id]);
  let wsId;

  if (!mid) {
    wsId = uid('w');
    await run(db, 'INSERT INTO workspaces(id,name) VALUES (?,?)', [wsId, 'Demo Workspace']);
    await run(db, 'INSERT INTO memberships(id,workspace_id,user_id,role) VALUES (?,?,?,?)', [uid('m'), wsId, user.id, 'owner']);
    console.log('Created workspace.');
  } else {
    wsId = mid.workspace_id;
  }

  // 3. Get or Create Project
  let proj = await get(db, 'SELECT id FROM projects WHERE workspace_id = ? LIMIT 1', [wsId]);
  if (!proj) {
    const pId = uid('p');
    await run(db, 'INSERT INTO projects(id,workspace_id,name,description,created_by) VALUES (?,?,?,?,?)',
      [pId, wsId, 'Demo Project', 'Created by seed', user.id]
    );
    // Default columns
    const cols = [{ name: 'Todo', ord: 1 }, { name: 'Doing', ord: 2 }, { name: 'Done', ord: 3 }];
    for (const c of cols) {
      await run(db, 'INSERT INTO columns(id,project_id,name,ord) VALUES (?,?,?,?)', [uid('c'), pId, c.name, c.ord]);
    }
    proj = { id: pId };
    console.log('Created project.');
  }

  // 4. Get Columns
  const allCols = await new Promise((resolve, reject) => {
    db.all('SELECT id, name FROM columns WHERE project_id = ? ORDER BY ord ASC', [proj.id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    })
  });

  const todoCol = allCols.find(c => c.name === 'Todo') || allCols[0];
  const doingCol = allCols.find(c => c.name === 'Doing') || allCols[1] || allCols[0];
  const doneCol = allCols.find(c => c.name === 'Done') || allCols[2] || allCols[0];

  // 5. Create Tasks in Jan 2026
  const tasks = [
    { title: 'Kickoff Meeting', start: '2026-01-02', end: '2026-01-02', col: doneCol },
    { title: 'Requirement Analysis', start: '2026-01-05', end: '2026-01-09', col: doneCol },
    { title: 'Design Database', start: '2026-01-07', end: '2026-01-15', col: doingCol },
    { title: 'API Implementation', start: '2026-01-12', end: '2026-01-23', col: todoCol },
    { title: 'Frontend integration', start: '2026-01-26', end: '2026-01-30', col: todoCol },
  ];

  for (const t of tasks) {
    const id = uid('t');
    const ord = 1;
    await run(db, `
      INSERT INTO tasks(id, project_id, column_id, title, description, start_date, end_date, priority, status, ord, created_by)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)
    `, [
      id, proj.id, t.col.id, t.title, 'Sample task via seed',
      t.start, t.end, 'medium', 'open', ord, user.id
    ]);
    console.log(`Created: ${t.title} (${t.start} ~ ${t.end})`);
  }

  console.log('Done.');
}

seed();
