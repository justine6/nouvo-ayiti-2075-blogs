export default function TopBar() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold text-gray-900 dark:text-white">Nouvo Ayiti 2075</h1>
      <nav className="space-x-4">
        <a href="/en" className="text-gray-700 dark:text-gray-300 hover:underline">Home</a>
        <a href="/en/blog" className="text-gray-700 dark:text-gray-300 hover:underline">Blog</a>
        <a href="/en/projects" className="text-gray-700 dark:text-gray-300 hover:underline">Projects</a>
      </nav>
    </header>
  );
}
