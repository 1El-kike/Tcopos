export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0  overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -top-48 right-1/4 w-[600px] h-[600px] rounded-full bg-yellow-500/15 blur-[140px]" />
      <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-navy-600 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] rounded-full bg-navy-400/8 blur-[80px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-navy-800/60 to-navy-900/90" />
    </div>
  )
}
