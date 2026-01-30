'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowRight, Loader2, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-md">
        <div className="glass-dark rounded-3xl p-8 shadow-2xl animate-fade-in text-center">
          <div className="w-20 h-20 mx-auto bg-colorado-green/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-colorado-green" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">E-mail enviado!</h1>
          <p className="text-admin-muted mb-8">
            Enviamos um link de recuperação para <strong className="text-admin-text">{email}</strong>. 
            Verifique sua caixa de entrada e siga as instruções.
          </p>
          <Link
            href="/login"
            className="btn-primary w-full py-4 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para o Login
          </Link>
          <p className="text-admin-muted text-sm mt-6">
            Não recebeu o e-mail?{' '}
            <button
              onClick={() => setIsSuccess(false)}
              className="text-colorado-red hover:underline"
            >
              Tentar novamente
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="glass-dark rounded-3xl p-8 shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-colorado-red/20 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-colorado-red" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Esqueceu sua senha?</h1>
          <p className="text-admin-muted">
            Não se preocupe! Digite seu e-mail e enviaremos um link para redefinir sua senha.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-admin-text text-sm font-medium mb-2">
              E-mail cadastrado
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-admin-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full pl-12 pr-4 py-4 bg-admin-bg border border-admin-border rounded-xl text-admin-text placeholder:text-admin-muted focus:border-colorado-red focus:outline-none focus:ring-2 focus:ring-colorado-red/20 transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar Link
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-admin-muted hover:text-colorado-red transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  )
}
