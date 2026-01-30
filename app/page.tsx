import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">Todo App</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A simple, clean todo application to help you stay organized and productive.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/todos"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg border border-gray-200"
          >
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}
