'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Loader2, Check } from 'lucide-react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    // Redirect would happen here
  }

  const passwordStrength = () => {
    const { password } = formData
    if (!password) return 0
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']
  const strengthLabels = ['Fraca', 'Razoável', 'Boa', 'Forte']

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="glass-dark rounded-3xl p-8 shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Criar Conta</h1>
          <p className="text-admin-muted">
            Cadastre-se e aproveite ofertas exclusivas
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-admin-text text-sm font-medium mb-2">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-admin-muted" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-admin-bg border border-admin-border rounded-xl text-admin-text placeholder:text-admin-muted focus:border-colorado-red focus:outline-none focus:ring-2 focus:ring-colorado-red/20 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-admin-text text-sm font-medium mb-2">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-admin-muted" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-admin-bg border border-admin-border rounded-xl text-admin-text placeholder:text-admin-muted focus:border-colorado-red focus:outline-none focus:ring-2 focus:ring-colorado-red/20 transition-all"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-admin-text text-sm font-medium mb-2">
              Telefone
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-admin-muted" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-admin-bg border border-admin-border rounded-xl text-admin-text placeholder:text-admin-muted focus:border-colorado-red focus:outline-none focus:ring-2 focus:ring-colorado-red/20 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-admin-text text-sm font-medium mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-admin-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full pl-12 pr-12 py-3.5 bg-admin-bg border border-admin-border rounded-xl text-admin-text placeholder:text-admin-muted focus:border-colorado-red focus:outline-none focus:ring-2 focus:ring-colorado-red/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-text transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {/* Password Strength */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i < passwordStrength()
                          ? strengthColors[passwordStrength() - 1]
                          : 'bg-admin-border'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-admin-muted">
                  Força da senha:{' '}
                  <span
                    className={
                      passwordStrength() > 0
                        ? strengthColors[passwordStrength() - 1].replace('bg-', 'text-')
                        : ''
                    }
                  >
                    {strengthLabels[passwordStrength() - 1] || 'Muito fraca'}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-admin-text text-sm font-medium mb-2">
              Confirmar Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-admin-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className={`w-full pl-12 pr-12 py-3.5 bg-admin-bg border rounded-xl text-admin-text placeholder:text-admin-muted focus:outline-none focus:ring-2 transition-all ${
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : formData.confirmPassword &&
                      formData.password === formData.confirmPassword
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                    : 'border-admin-border focus:border-colorado-red focus:ring-colorado-red/20'
                }`}
              />
              {formData.confirmPassword &&
                formData.password === formData.confirmPassword && (
                  <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
            </div>
          </div>

          {/* Terms */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
                className="w-5 h-5 mt-0.5 rounded border-admin-border bg-admin-bg text-colorado-red focus:ring-colorado-red"
              />
              <span className="text-admin-muted text-sm">
                Li e aceito os{' '}
                <Link href="/termos" className="text-colorado-red hover:underline">
                  Termos de Uso
                </Link>{' '}
                e a{' '}
                <Link
                  href="/privacidade"
                  className="text-colorado-red hover:underline"
                >
                  Política de Privacidade
                </Link>
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !formData.acceptTerms}
            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Criando conta...
              </>
            ) : (
              <>
                Criar Conta
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-admin-muted mt-8">
          Já tem uma conta?{' '}
          <Link
            href="/login"
            className="text-colorado-red font-semibold hover:underline"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  )
}
