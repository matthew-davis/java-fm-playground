import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
      <div className="flex items-center justify-center mt-7">
        <div className="flex items-center">
          <Link to="/">
            <span className="mx-2 text-xl font-semibold text-white">Java FM Playground</span>
          </Link>
        </div>
      </div>
      <nav className="mt-10">
        <Link to="/models"
              className="flex items-center px-6 py-2 mt-4 text-gray-400 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <span className="mx-3">Foundation Models</span>
        </Link>
        <Link to="/chat"
              className="flex items-center px-6 py-2 mt-4 text-gray-400 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <span className="mx-3">Chat Playground</span>
        </Link>
        <Link to="/text"
              className="flex items-center px-6 py-2 mt-4 text-gray-400 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <span className="mx-3">Text Playground</span>
        </Link>
        <Link to="/images"
              className="flex items-center px-6 py-2 mt-4 text-gray-400 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <span className="mx-3">Image Playground</span>
        </Link>
      </nav>
    </div>
  );
}
