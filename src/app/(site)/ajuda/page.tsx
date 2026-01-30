'use client'

import { useState } from 'react'
import { Plus, Minus, Search, HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react'

export default function HelpPage() {
  const faqs = [
    {
      question: 'Como faço para rastrear meu pedido?',
      answer: 'Você pode rastrear seu pedido acessando a página "Rastrear Pedido" no topo do site e informando o número do pedido ou CPF utilizado na compra. Além disso, enviamos atualizações por e-mail a cada etapa.'
    },
    {
      question: 'Quais são as formas de pagamento aceitas?',
      answer: 'Aceitamos cartões de crédito (Visa, Mastercard, Elo, Amex) em até 12x sem juros, Pix com 10% de desconto e Boleto Bancário.'
    },
    {
      question: 'Qual o prazo de entrega?',
      answer: 'O prazo de entrega varia de acordo com o seu CEP e a disponibilidade do produto. Você pode simular o prazo e valor do frete na página do produto ou no carrinho de compras.'
    },
    {
      question: 'Como funciona a política de trocas e devoluções?',
      answer: 'Você tem até 7 dias corridos após o recebimento para solicitar a devolução por arrependimento. Para defeitos de fabricação, o prazo é de 90 dias. Entre em contato com nosso SAC para iniciar o processo.'
    },
    {
      question: 'É seguro comprar no site da Colorado?',
      answer: 'Sim, nosso site utiliza tecnologia de criptografia SSL para proteger seus dados. Além disso, somos verificados por empresas de segurança e possuímos selos de confiança.'
    },
  ]

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 md:pb-12">
      {/* Hero */}
      <div className="bg-colorado-red text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Como podemos ajudar?</h1>
          <p className="text-white/90 text-lg mb-8">
            Encontre respostas para as dúvidas mais comuns ou entre em contato com nosso time.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <input 
              type="text" 
              placeholder="Digite sua dúvida..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:border-colorado-red transition-colors group cursor-pointer">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-colorado-red group-hover:text-white transition-colors">
              <Phone className="w-6 h-6 text-colorado-red group-hover:text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Televendas</h3>
            <p className="text-sm text-gray-500">(11) 4002-8922</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:border-colorado-yellow transition-colors group cursor-pointer">
            <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-colorado-yellow group-hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6 text-colorado-yellow-dark group-hover:text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Chat Online</h3>
            <p className="text-sm text-gray-500">Seg a Sex, 8h às 20h</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:border-colorado-green transition-colors group cursor-pointer">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-colorado-green group-hover:text-white transition-colors">
              <Mail className="w-6 h-6 text-colorado-green group-hover:text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">E-mail</h3>
            <p className="text-sm text-gray-500">sac@colorado.com.br</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
      >
        {question}
        {isOpen ? <Minus className="w-4 h-4 text-colorado-red" /> : <Plus className="w-4 h-4 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-50 bg-gray-50/30">
          {answer}
        </div>
      )}
    </div>
  )
}
