'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Todo } from '../types';
import TodoItem from './components/Todo';
import TodoForm from './components/TodoForm';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // supabaseが初期化されているか確認
    if (!supabase) {
      setError('Supabaseクライアントが初期化されていません。環境変数を確認してください。');
      setLoading(false);
      return;
    }
    
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      setLoading(true);
      
      // supabaseが初期化されていない場合は早期リターン
      if (!supabase) {
        throw new Error('Supabaseクライアントが初期化されていません');
      }
      
      const { data, error: supabaseError } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }
      
      if (data) {
        setTodos(data);
      }
    } catch (err: any) {
      console.error('Todoの取得に失敗しました:', err);
      setError(err.message || 'Todoの取得中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  }

  async function addTodo(title: string) {
    try {
      if (!supabase) {
        throw new Error('Supabaseクライアントが初期化されていません');
      }
      
      const newTodo = {
        title,
        is_completed: false,
      };

      const { data, error: supabaseError } = await supabase
        .from('todos')
        .insert([newTodo])
        .select();

      if (supabaseError) {
        throw supabaseError;
      }

      if (data) {
        setTodos([...data, ...todos]);
        await fetchTodos(); // リストを更新
      }
    } catch (err: any) {
      console.error('Todoの追加に失敗しました:', err);
      setError(err.message || 'Todoの追加中にエラーが発生しました');
    }
  }

  async function toggleTodo(id: string, is_completed: boolean) {
    try {
      if (!supabase) {
        throw new Error('Supabaseクライアントが初期化されていません');
      }
      
      const { error: supabaseError } = await supabase
        .from('todos')
        .update({ is_completed })
        .eq('id', id);

      if (supabaseError) {
        throw supabaseError;
      }

      // 状態を更新
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, is_completed };
          }
          return todo;
        })
      );
    } catch (err: any) {
      console.error('Todoの更新に失敗しました:', err);
      setError(err.message || 'Todoの更新中にエラーが発生しました');
    }
  }

  async function deleteTodo(id: string) {
    try {
      if (!supabase) {
        throw new Error('Supabaseクライアントが初期化されていません');
      }
      
      const { error: supabaseError } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (supabaseError) {
        throw supabaseError;
      }

      // 削除後のリストを更新
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err: any) {
      console.error('Todoの削除に失敗しました:', err);
      setError(err.message || 'Todoの削除中にエラーが発生しました');
    }
  }

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Todoアプリ</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <TodoForm onAdd={addTodo} />
      
      {loading ? (
        <div className="text-center py-4">読み込み中...</div>
      ) : (
        <div>
          {todos.length === 0 ? (
            <div className="text-center py-4 text-gray-500">タスクはありません</div>
          ) : (
            todos.map((todo) => (
              <TodoItem 
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      )}
    </main>
  );
}
