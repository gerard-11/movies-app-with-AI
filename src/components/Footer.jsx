export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-brand-border mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-neutral-300">
              CineApp © {new Date().getFullYear()}
            </p>
            <p className="text-neutral-500 text-sm">
              Powered by <span className="text-red-500">TMDB API</span>
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-neutral-400 hover:text-red-500 transition text-sm"
            >
              About
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-red-500 transition text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-red-500 transition text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
