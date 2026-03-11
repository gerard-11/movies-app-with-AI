export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-brand-border mt-12 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="text-center md:text-left">
            <p className="text-neutral-300 text-xs sm:text-sm md:text-base">
              CineApp © {new Date().getFullYear()}
            </p>
            <p className="text-neutral-500 text-xs sm:text-sm">
              Powered by <span className="text-red-500">TMDB API</span>
            </p>
          </div>
          <div className="flex gap-3 sm:gap-4 md:gap-6">
            <a
              href="#"
              className="text-neutral-400 hover:text-red-500 transition text-xs sm:text-sm"
            >
              About
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-red-500 transition text-xs sm:text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-red-500 transition text-xs sm:text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
