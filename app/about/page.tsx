import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 mb-8 inline-block"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About This App</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-4">
          <p className="text-gray-600">
            This is a simple todo application built with Next.js 14, TypeScript, and Tailwind CSS.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 pt-4">Features</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Add new todos</li>
            <li>Mark todos as complete</li>
            <li>Delete todos</li>
            <li>Data persists in localStorage</li>
            <li>Clean, modern UI</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 pt-4">Tech Stack</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Next.js 14 with App Router</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>localStorage for persistence</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
