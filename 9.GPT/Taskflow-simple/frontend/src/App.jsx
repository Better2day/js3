import { useEffect, useState } from 'react';
import { api, setToken, getToken } from './api.js';
import './styles.css';
import Gantt from './components/Gantt';
import Modal from './components/Modal';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// ------- Colors -------
const COLUMN_STYLES = {
  'todo': { header: 'bg-gray-200 text-gray-700', border: 'border-t-4 border-gray-400' },
  'doing': { header: 'bg-blue-100 text-blue-700', border: 'border-t-4 border-blue-400' },
  'done': { header: 'bg-green-100 text-green-700', border: 'border-t-4 border-green-400' },
  'default': { header: 'bg-gray-100 text-gray-700', border: 'border-t-4 border-gray-300' }
};

function Field({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <label className="block mb-3">
      <span className="text-xs font-medium text-gray-500 mb-1 block">{label}</span>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function AuthCard({ onAuthed }) {
  const [mode, setMode] = useState('login'); // login | signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    setMsg('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        await api.signup({ email, password, name });
        setMsg('✅ 가입 완료! 이제 로그인 해주세요.');
        setMode('login');
      } else {
        const data = await api.login({ email, password });
        setToken(data.accessToken);
        onAuthed();
      }
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">TaskFlow</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          {mode === 'login' ? '로그인 후 워크스페이스/보드를 확인합니다.' : '간단 가입 후 바로 사용 가능합니다.'}
        </p>

        <div className="flex bg-gray-100 p-1 rounded mb-6">
          <button
            className={`flex-1 py-1.5 text-sm font-medium rounded ${mode === 'login' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setMode('login')}
          >
            로그인
          </button>
          <button
            className={`flex-1 py-1.5 text-sm font-medium rounded ${mode === 'signup' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setMode('signup')}
          >
            회원가입
          </button>
        </div>

        <div>
          {mode === 'signup' && <Field label="이름" value={name} onChange={setName} />}
          <Field label="이메일" value={email} onChange={setEmail} />
          <Field label="비밀번호" value={password} onChange={setPassword} type="password" />

          <button
            className="w-full bg-blue-600 text-white py-2.5 rounded font-medium hover:bg-blue-700 transition-colors mt-2 disabled:opacity-50"
            onClick={submit}
            disabled={loading}
          >
            {loading ? '처리중...' : (mode === 'login' ? '로그인' : '가입하기')}
          </button>

          {msg && <div className="mt-4 text-sm text-center text-red-500 bg-red-50 p-2 rounded" role="alert">{msg}</div>}
        </div>
      </div>
    </div>
  );
}

function TaskEditModal({ isOpen, onClose, task, onSave }) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStartDate(task.startDate || '');
      setEndDate(task.endDate || '');
    }
  }, [task]);

  const handleSave = () => {
    onSave(task.id, { title, description, startDate, endDate });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="태스크 수정">
      <Field label="제목" value={title} onChange={setTitle} />
      <div className="grid grid-cols-2 gap-3">
        <Field label="시작일" type="date" value={startDate} onChange={setStartDate} />
        <Field label="종료일" type="date" value={endDate} onChange={setEndDate} />
      </div>
      <label className="block mb-3">
        <span className="text-xs font-medium text-gray-500 mb-1 block">설명</span>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-24"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>
      <div className="flex justify-end gap-2 mt-4">
        <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded" onClick={onClose}>취소</button>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded" onClick={handleSave}>저장</button>
      </div>
    </Modal>
  );
}

function Board({ projectId, onBack }) {
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState(null);
  const [err, setErr] = useState('');
  const [newTitleByCol, setNewTitleByCol] = useState({}); // Optimistic UI could be added but let's stick to simple
  const [view, setView] = useState('board');

  const [editingTask, setEditingTask] = useState(null);

  async function load() {
    setLoading(true);
    setErr('');
    try {
      const data = await api.board(projectId);
      setBoard(data);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function reload() {
    try {
      const data = await api.board(projectId);
      setBoard(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => { load(); }, [projectId]);

  async function addTask(columnId) {
    const title = (newTitleByCol[columnId] || '').trim();
    if (!title) return;
    await api.createTask(columnId, { title, description: '' });
    setNewTitleByCol((p) => ({ ...p, [columnId]: '' }));
    reload();
  }

  async function remove(taskId) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await api.deleteTask(taskId);
    reload();
  }

  async function updateTask(taskId, changes) {
    await api.updateTask(taskId, changes);
    reload();
  }

  async function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Optimistic update locally
    const newBoard = { ...board };

    // Remove from source
    const sourceColId = source.droppableId;
    const sourceTasks = [...(newBoard.tasksByColumn[sourceColId] || [])];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    // Add to destination
    const destColId = destination.droppableId;
    const destTasks = sourceColId === destColId ? sourceTasks : [...(newBoard.tasksByColumn[destColId] || [])];

    // Update movedTask columnId if needed
    movedTask.columnId = destColId;
    destTasks.splice(destination.index, 0, movedTask);

    newBoard.tasksByColumn = {
      ...newBoard.tasksByColumn,
      [sourceColId]: sourceColId === destColId ? destTasks : sourceTasks,
      [destColId]: destTasks
    };

    setBoard(newBoard);

    // API Call
    try {
      // backend 'toOrder' is 1-based index roughly. 
      // In our simple backend, we just need to say which column and approx order.
      // But our backend reorder logic is "put at X order, shift others down".
      // Let's use index + 1
      await api.moveTask(draggableId, {
        toColumnId: destColId,
        toOrder: destination.index + 1
      });
      // We reload to confirm consistency
      reload();
    } catch (e) {
      console.error("Move failed", e);
      alert("이동에 실패했습니다.");
      load(); // Revert
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-500">불러오는 중...</div>;
  if (err) return <div className="p-8 text-center text-red-500">오류: {err}</div>;
  if (!board) return null;

  // Flatten tasks for Gantt
  const allTasks = Object.values(board.tasksByColumn).flat();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h2 className="text-xl font-bold text-gray-800">Kanban Board</h2>
        </div>
        <div className="flex bg-gray-100 p-1 rounded">
          <button
            className={`px-4 py-1.5 text-sm font-medium rounded ${view === 'board' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setView('board')}
          >
            보드
          </button>
          <button
            className={`px-4 py-1.5 text-sm font-medium rounded ${view === 'gantt' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setView('gantt')}
          >
            간트
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto bg-gray-50 p-6">
        {view === 'gantt' ? (
          <div className="max-w-6xl mx-auto">
            <Gantt tasks={allTasks} columns={board.columns} />
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-6 h-full items-start overflow-x-auto pb-4">
              {board.columns.map((col) => {
                const lowerName = col.name.toLowerCase();
                const styles = COLUMN_STYLES[lowerName] || COLUMN_STYLES['default'];

                return (
                  <div className={`flex-shrink-0 w-80 bg-gray-100 rounded-lg flex flex-col max-h-full border border-gray-200 ${styles.border}`} key={col.id}>
                    <div className={`p-3 font-semibold flex justify-between items-center rounded-t-lg ${styles.header}`}>
                      {col.name}
                      <span className="text-xs bg-white bg-opacity-50 px-2 py-0.5 rounded text-gray-700">{(board.tasksByColumn[col.id] || []).length}</span>
                    </div>

                    <div className="px-3 pb-3 overflow-y-auto flex-1 custom-scrollbar">
                      <div className="mb-3 mt-3">
                        <div className="flex gap-2">
                          <input
                            className="flex-1 px-2.5 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="+ 태스크 추가"
                            value={newTitleByCol[col.id] || ''}
                            onChange={(e) => setNewTitleByCol((p) => ({ ...p, [col.id]: e.target.value }))}
                            onKeyDown={e => e.key === 'Enter' && addTask(col.id)}
                          />
                          <button className="bg-white border border-gray-300 text-gray-600 px-3 rounded text-sm hover:bg-gray-50" onClick={() => addTask(col.id)}>Add</button>
                        </div>
                      </div>

                      <Droppable droppableId={col.id}>
                        {(provided) => (
                          <div
                            className="space-y-2 min-h-[50px]"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {(board.tasksByColumn[col.id] || []).map((t, index) => (
                              <Draggable key={t.id} draggableId={t.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    className={`bg-white p-3 rounded shadow-sm border border-gray-200 group ${snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500 rotate-1' : 'hover:shadow-md'}`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{ ...provided.draggableProps.style }}
                                  >
                                    <div className="flex justify-between items-start mb-1">
                                      <h4 className="font-medium text-gray-800 text-sm leading-tight">{t.title}</h4>
                                      <button onClick={() => setEditingTask(t)} className="text-gray-400 hover:text-blue-500 ml-2">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                      </button>
                                    </div>

                                    {(t.startDate || t.endDate) && (
                                      <div className="text-xs text-blue-600 mb-2 bg-blue-50 inline-block px-1.5 py-0.5 rounded">
                                        {t.startDate || '...'} ~ {t.endDate || '...'}
                                      </div>
                                    )}

                                    {t.description && <p className="text-xs text-gray-500 line-clamp-2 mb-2">{t.description}</p>}

                                    <div className="flex justify-end items-center mt-2 pt-2 border-t border-gray-50">
                                      <button className="text-red-400 hover:text-red-600 text-xs px-2 py-1 hover:bg-red-50 rounded" onClick={(e) => {
                                        e.stopPropagation(); // prevent drag if clicked poorly but handle is on card
                                        remove(t.id)
                                      }}>삭제</button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  </div>
                )
              })}
            </div>
          </DragDropContext>
        )}
      </main>

      <TaskEditModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        task={editingTask}
        onSave={updateTask}
      />
    </div>
  );
}

function App() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(!!getToken());
  const [user, setUser] = useState(null);

  const [workspaces, setWorkspaces] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedWs, setSelectedWs] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const [newProjectName, setNewProjectName] = useState('');
  const [msg, setMsg] = useState('');

  async function bootstrap() {
    setMsg('');
    setReady(false);
    try {
      const me = await api.me();
      setUser(me);

      const ws = await api.workspaces();
      setWorkspaces(ws.items);
      const firstWs = ws.items[0]?.id || '';
      setSelectedWs(firstWs);

      if (firstWs) {
        const ps = await api.projects(firstWs);
        setProjects(ps.items);
      } else {
        setProjects([]);
      }
    } catch (e) {
      setMsg(e.message);
      setAuthed(false);
      setToken('');
    } finally {
      setReady(true);
    }
  }

  useEffect(() => {
    if (authed) bootstrap();
    else setReady(true);
  }, [authed]);

  useEffect(() => {
    if (!authed || !selectedWs) return;
    api.projects(selectedWs)
      .then((d) => setProjects(d.items))
      .catch(() => setProjects([]));
  }, [selectedWs, authed]);

  async function createProject() {
    const name = newProjectName.trim();
    if (!name) return;
    await api.createProject(selectedWs, { name, description: '' });
    setNewProjectName('');
    const ps = await api.projects(selectedWs);
    setProjects(ps.items);
  }

  function logout() {
    setToken('');
    setAuthed(false);
    setUser(null);
    setSelectedProject('');
  }

  if (!authed) return <AuthCard onAuthed={() => setAuthed(true)} />;
  if (!ready) return <div className="flex h-screen items-center justify-center text-gray-500">초기화 중...</div>;

  if (selectedProject) {
    return <Board projectId={selectedProject} onBack={() => setSelectedProject('')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white px-6 py-4 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">TaskFlow</h1>
          <div className="text-sm text-gray-500">안녕하세요, {user?.name} 님</div>
        </div>
        <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded border border-gray-200" onClick={logout}>로그아웃</button>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {msg && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">{msg}</div>}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
            워크스페이스
          </h3>
          <select
            className="w-full p-2 border border-gray-300 rounded hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            value={selectedWs}
            onChange={(e) => setSelectedWs(e.target.value)}
          >
            {workspaces.map(w => <option key={w.id} value={w.id}>{w.name} ({w.role})</option>)}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              프로젝트
            </h3>
          </div>

          <div className="flex gap-2 mb-6">
            <input
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="새 프로젝트 이름"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createProject()}
            />
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium whitespace-nowrap"
              onClick={createProject}
            >
              프로젝트 생성
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <div
                className="group border border-gray-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-white"
                key={p.id}
                onClick={() => setSelectedProject(p.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-gray-800 text-lg mb-1 group-hover:text-blue-600 transition-colors">{p.name}</div>
                    <div className="text-sm text-gray-500">{p.description || '설명 없음'}</div>
                  </div>
                  <div className="text-gray-300 group-hover:text-blue-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>
            ))}
            {projects.length === 0 && <div className="col-span-2 text-center py-10 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-300">프로젝트가 없습니다.</div>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
