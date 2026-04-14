# Threadly AI Chatbot

A production-ready AI chatbot built with Next.js, Supabase, and SambaNova.

## Features

- **SambaNova Integration**: Default AI powered by LLaMA 3.1 8B Instruct.
- **BYOK (Bring Your Own Key)**: Support for custom API keys (e.g., OpenAI) stored securely in `localStorage`.
- **Persistent Chat History**: High-performance storage with Supabase.
- **Smart Sidebar Navigation**: Quick jumps to specific user messages with temporary highlighting.
- **Prompt Library**: Save and insert frequently used prompts.
- **Modern UI**: Dark-themed, glassmorphic design with smooth animations.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS
- **Database/Auth**: Supabase
- **AI Backend**: SambaNova Cloud
- **Frontend AI**: Direct BYOK calls

## Getting Started

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Setup Environment Variables**:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SAMBANOVA_API_KEY=your_sambanova_api_key
   ```
4. **Setup Database**:
   Run the SQL provided in `supabase_schema.sql` in your Supabase SQL Editor.
5. **Run the app**:
   ```bash
   npm run dev
   ```

## Security Note

- The SambaNova API key is handled strictly in the backend.
- BYOK keys are stored ONLY in the browser's `localStorage` and never sent to your server.
- All backend routes are protected by Supabase session validation.

## License

MIT
