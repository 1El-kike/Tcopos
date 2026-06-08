export default function AppFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-4 px-4 lg:pl-72">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <p>&copy; {year} TCOPOS. Todos los derechos reservados.</p>
        <p>Hecho con React, Three.js & Hero UI</p>
      </div>
    </footer>
  )
}
