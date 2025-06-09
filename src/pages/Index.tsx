import { KanbanBoard } from '../components/KanbanBoard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-10">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold text-gray-800">Kanban para Estudos</h1>
          <p className="text-gray-600">Organize e Trabalhe</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <KanbanBoard />
      </main>

      <footer className="bg-white border-t py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          Kanban de Estudos - Arraste e solte para organizar suas tarefas
        </div>
      </footer>
    </div>
  );
};

export default Index;
