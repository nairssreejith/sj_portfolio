export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      data-testid="footer"
      className="bg-primary text-white py-8"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-white/60">
          &copy; {year} Alex Rivera — All rights reserved.
        </p>
        <p className="font-mono text-xs uppercase tracking-widest text-white/60">
          Built with React &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
