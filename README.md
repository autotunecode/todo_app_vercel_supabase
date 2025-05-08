# Todo App with Next.js, Supabase, and Vercel

Next.js、Supabase、Vercelを使用したシンプルなTodoアプリケーション。

## セットアップ手順

### 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com/)にアクセスし、アカウント作成・ログインします。
2. 新しいプロジェクトを作成します。
3. プロジェクトが作成されたら、SQL Editorに移動し、以下のSQLを実行してtodosテーブルを作成します：

```sql
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID
);
```

4. Settings > API からプロジェクトのURL（`NEXT_PUBLIC_SUPABASE_URL`）と匿名キー（`NEXT_PUBLIC_SUPABASE_ANON_KEY`）をコピーします。

### 2. 環境変数の設定

プロジェクトのルートディレクトリに`.env.local`ファイルを作成し、Supabaseの接続情報を設定します：

```
NEXT_PUBLIC_SUPABASE_URL=あなたのSupabaseプロジェクトURL
NEXT_PUBLIC_SUPABASE_ANON_KEY=あなたのSupabase匿名キー
```

### 3. アプリケーションの実行

```bash
npm install
npm run dev
```

ブラウザで[http://localhost:3000](http://localhost:3000)にアクセスすると、アプリケーションが表示されます。

## Vercelへのデプロイ

1. [Vercel](https://vercel.com/)にアクセスし、アカウント作成・ログインします。
2. 「New Project」をクリックし、GitHubリポジトリをインポートします。
3. 環境変数に`NEXT_PUBLIC_SUPABASE_URL`と`NEXT_PUBLIC_SUPABASE_ANON_KEY`を設定します。
4. 「Deploy」をクリックしてデプロイを開始します。

## 機能

- Todoの作成、読み取り、更新、削除（CRUD操作）
- リアルタイムデータ同期（将来的な拡張）
- レスポンシブデザイン
