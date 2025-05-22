import { Todo } from '../../types';

interface TaskHistoryProps {
  completedTodos: Todo[];
  onRestore: (id: string) => void;
}

export default function TaskHistory({ completedTodos, onRestore }: TaskHistoryProps) {
  if (completedTodos.length === 0) {
    return <div className="text-center py-4 text-gray-500">完了したタスクはありません</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">完了タスク履歴</h2>
      <div className="space-y-2">
        {completedTodos.map((todo) => (
          <div key={todo.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
            <div className="flex items-center">
              <span className="line-through text-gray-500">{todo.title}</span>
              <span className="ml-2 text-xs text-gray-400">
                {new Date(todo.created_at).toLocaleDateString()}
              </span>
            </div>
            <button
              onClick={() => onRestore(todo.id)}
              className="px-2 py-1 text-xs text-white bg-green-500 rounded hover:bg-green-600"
            >
              復元
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}