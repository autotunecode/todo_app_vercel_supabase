import { Todo } from '../../types';

interface TodoProps {
  todo: Todo;
  onToggle: (id: string, is_completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoProps) {
  return (
    <div className="flex items-center justify-between p-4 mb-2 border rounded-lg shadow-sm">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.is_completed}
          onChange={() => onToggle(todo.id, !todo.is_completed)}
          className="w-4 h-4 mr-2 border-gray-300 rounded focus:ring-blue-500"
          id={`todo-${todo.id}`}
          aria-label={`タスク「${todo.title}」を${todo.is_completed ? '未完了' : '完了'}としてマーク`}
        />
        <label htmlFor={`todo-${todo.id}`} className={`${todo.is_completed ? 'line-through text-gray-500' : ''}`}>
          {todo.title}
        </label>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
      >
        削除
      </button>
    </div>
  );
} 