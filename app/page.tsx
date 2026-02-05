import OfficeSim from './components/OfficeSim';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Keigo Simulator 2026</h1>
      <p className="text-gray-600 mb-8">Navigate the complexities of Japanese Business Manners.</p>
      <OfficeSim />
      <p className="mt-12 text-gray-400 text-xs">Educational Fleet: App 3/11</p>
    </div>
  )
}
