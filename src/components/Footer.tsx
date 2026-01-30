import Link from 'next/link'
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Phone,
  Mail,
  MapPin,
  Heart
} from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 md:pt-16 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-colorado-red flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <span className="text-xl font-bold text-gray-900">COLORADO</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Sua casa mais bonita e moderna com os melhores móveis e eletrodomésticos. 
              Qualidade e confiança há 30 anos.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-colorado-red hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Institucional</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {['Sobre Nós', 'Nossas Lojas', 'Trabalhe Conosco', 'Política de Privacidade', 'Termos de Uso'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-colorado-red transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Ajuda</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {['Meus Pedidos', 'Trocas e Devoluções', 'Entregas', 'Fale Conosco', 'Perguntas Frequentes'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-colorado-red transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Atendimento</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-colorado-red shrink-0" />
                <div>
                  <span className="block font-semibold text-gray-900">(11) 4002-8922</span>
                  <span className="text-xs">Seg a Sex das 8h às 20h</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-colorado-red shrink-0" />
                <span className="truncate">sac@colorado.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-colorado-red shrink-0" />
                <span>Av. Paulista, 1000 - SP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Colorado Móveis e Eletros. CNPJ: 00.000.000/0001-00.</p>
          <div className="flex items-center gap-2">
            <span>Feito com</span>
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            <span>para você</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
