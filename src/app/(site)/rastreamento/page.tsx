'use client'

import { useState } from 'react'
import { Package, Search, Truck, CheckCircle, Clock, MapPin } from 'lucide-react'

export default function TrackingPage() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (!code) return

    setLoading(true)
    // Mock simulation
    setTimeout(() => {
      setResult({
        status: 'Em Trânsito',
        steps: [
          { status: 'Objeto em trânsito - Por favor aguarde', date: '14/01/2026 14:30', loc: 'São Paulo / SP', icon: Truck, active: true },
          { status: 'Objeto postado', date: '13/01/2026 09:15', loc: 'Curitiba / PR', icon: Package, active: false },
        ]
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 md:pb-12">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-6 transform rotate-3">
            <Package className="w-8 h-8 text-colorado-red" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Rastreie seu Pedido</h1>
          <p className="text-gray-500">
            Digite o código de rastreamento enviado para o seu e-mail.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8 border border-gray-100 mb-8">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Código de Rastreio</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="Ex: AA123456789BR"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-lg font-mono uppercase focus:outline-none focus:border-colorado-red focus:bg-white transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <button 
              type="submit"
              disabled={loading || !code}
              className="md:self-end h-[54px] px-8 bg-colorado-red text-white font-bold rounded-xl hover:bg-colorado-red-dark transition-all shadow-lg shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Rastrear
                  <Truck className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {result && (
          <div className="animate-fade-in space-y-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-colorado-red" />
                Histórico do Objeto
              </h3>
              
              <div className="relative pl-8 border-l-2 border-gray-100 space-y-8">
                {result.steps.map((step: any, index: number) => (
                  <div key={index} className="relative">
                    <div className={`absolute -left-[41px] w-5 h-5 rounded-full border-4 border-white ${index === 0 ? 'bg-colorado-red shadow-glow-red' : 'bg-gray-300'}`} />
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <p className={`font-bold ${index === 0 ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.status}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {step.loc}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">
                        {step.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
