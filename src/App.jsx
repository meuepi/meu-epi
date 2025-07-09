// src/App.jsx
import { useEffect, useRef, useState } from 'react';
import mockData from './data/mock-solicitacoes.json';

export default function App() {
  const [profileOpen, setProfileOpen] = useState(false);   // menu de perfil
  const [sidebarOpen, setSidebarOpen] = useState(false);   // sidebar mobile
  const profileRef = useRef(null);                         // ref para clique-fora

  /* ---- FECHA MENU DE PERFIL AO CLICAR FORA ---- */
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      {/* ---------- HEADER ---------- */}
      <header className="relative z-20 flex items-center justify-between bg-white shadow-none border-b border-gray-200 px-4 py-2">
        <div className="flex items-center gap-2">
          {/* HAMBÚRGUER — só em telas < md */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-600 hover:bg-gray-100 p-2 rounded"
            aria-label="Abrir menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* LOGO + TÍTULO — logo some em < md */}
          <img src="/logo.svg" alt="Logo" className="hidden md:block w-6 h-6" />
          <h1 className="text-xl font-semibold">Meu EPI</h1>
        </div>

        {/* ---------- MENU DE PERFIL ---------- */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 focus:outline-none hover:bg-gray-100 px-2 py-1"
            aria-label="Menu de perfil"
          >
            <span className="hidden md:inline">Natália Gomes</span>
            <img src="/avatar.svg" alt="Avatar" className="w-8 h-8 rounded-full" />
          </button>

          {profileOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white border shadow-none z-20">
              {['Conta', 'Configurações', 'Ajuda', 'Sair'].map((item) => (
                <li
                  key={item}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setProfileOpen(false)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* ---------- OVERLAY (aparece / some com opacidade) ---------- */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-30 md:hidden
                    ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      ></div>

      {/* ---------- SIDEBAR MOBILE (slide in/out) ---------- */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-4 z-40
                    transform transition-transform duration-300 md:hidden
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="block px-2 py-1 hover:bg-gray-100"
                onClick={() => setSidebarOpen(false)}
              >
                Solicitações
              </a>
            </li>
            {/* espaço reservado para novos itens */}
          </ul>
        </nav>
      </aside>

      <div className="flex flex-1">
        {/* ---------- SIDEBAR DESKTOP (sem mudanças) ---------- */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <a href="#" className="block px-2 py-1 hover:bg-gray-100">
                  Solicitações
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* ---------- MAIN CONTENT ---------- */}
        <main className="flex-1 p-4">
          <h2 className="text-lg font-semibold mb-4">Solicitações</h2>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockData.map((item) => (
              <button
                key={item.id}
                className="text-left bg-white border border-gray-200 p-4 hover:bg-gray-50
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                role="button"
                aria-label={`Abrir solicitação ${item.id}`}
              >
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>EMPRESA:</strong> {item.empresa}</p>
                <p><strong>SOLICITANTE:</strong> {item.solicitante}</p>
                <p><strong>COLABORADOR:</strong> {item.colaborador}</p>
                <p><strong>DATA:</strong> {item.data}</p>
                <p><strong>STATUS:</strong> {item.status}</p>
              </button>
            ))}
          </section>
        </main>
      </div>

      {/* ---------- FOOTER ---------- */}
      <footer className="text-center text-sm text-gray-500 py-2 border-t border-gray-200">
        Meu EPI
      </footer>
    </div>
  );
}
