export function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/10 px-6 py-8 text-gray-400">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <p className="font-bold text-white">BigBio.ai</p>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} BigBio AI. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6 text-sm">
          <a
            href="https://linkedin.com/in/christopher-davis-biotech"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/d33disc"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a href="mailto:chris@bigbio.ai" className="transition-colors hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
