# 🛒 Colorado E-commerce

Um e-commerce moderno e completo para a **Colorado Móveis & Eletros**, desenvolvido com as tecnologias mais recentes do ecossistema React.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Ready-green?logo=supabase)

## 🎨 Cores da Marca

- **Vermelho**: `#C41E3A` - Cor principal
- **Amarelo**: `#FFD700` - Destaques e ofertas
- **Verde**: `#228B22` - Ações positivas e CTAs secundários

## ✨ Funcionalidades

- 🏠 **Página Inicial** com banner rotativo, categorias e produtos em destaque
- 📦 **Catálogo de Produtos** com filtros e ordenação
- 🔍 **Página de Categoria** com filtros específicos
- 🛍️ **Página de Produto** completa com galeria, especificações e produtos relacionados
- 🛒 **Carrinho de Compras** com drawer lateral e página dedicada
- 🔥 **Página de Ofertas** com countdown e produtos em promoção
- 📱 **Design Responsivo** otimizado para mobile e desktop
- ⚡ **Animações** suaves e micro-interações

## 🚀 Começando

### Pré-requisitos

- Node.js 18.17 ou superior
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/colorado-ecommerce.git
cd colorado-ecommerce
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env.local na raiz do projeto com:
NEXT_PUBLIC_SUPABASE_URL=sua-url-do-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 16)
│   ├── carrinho/          # Página do carrinho
│   ├── categoria/[slug]/  # Páginas de categorias
│   ├── ofertas/           # Página de ofertas
│   ├── produto/[slug]/    # Páginas de produtos
│   ├── produtos/          # Listagem de produtos
│   ├── globals.css        # Estilos globais + tema Colorado
│   ├── layout.tsx         # Layout principal
│   ├── not-found.tsx      # Página 404
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── CartDrawer.tsx     # Drawer do carrinho
│   ├── CategoryCard.tsx   # Card de categoria
│   ├── Footer.tsx         # Rodapé
│   ├── Header.tsx         # Cabeçalho
│   ├── HeroBanner.tsx     # Banner principal
│   └── ProductCard.tsx    # Card de produto
├── data/                  # Dados mock
│   └── products.ts        # Produtos e categorias
├── lib/                   # Bibliotecas e utilitários
│   └── supabase/          # Configuração do Supabase
├── store/                 # Estado global
│   └── cart.ts            # Store do carrinho (Zustand)
└── types/                 # Tipos TypeScript
    ├── database.ts        # Tipos do banco de dados
    └── index.ts           # Exportações de tipos
```

## 🛠️ Tecnologias

- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca de UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework de estilos
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Supabase](https://supabase.com/)** - Backend as a Service
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gerenciamento de estado
- **[Lucide React](https://lucide.dev/)** - Ícones

## 📱 Páginas

| Página | Rota | Descrição |
|--------|------|-----------|
| Home | `/` | Página inicial com banner e produtos |
| Produtos | `/produtos` | Listagem completa de produtos |
| Categoria | `/categoria/[slug]` | Produtos por categoria |
| Produto | `/produto/[slug]` | Detalhes do produto |
| Ofertas | `/ofertas` | Produtos em promoção |
| Carrinho | `/carrinho` | Carrinho de compras |

## 🎯 Próximos Passos

- [ ] Integração completa com Supabase
- [ ] Sistema de autenticação
- [ ] Checkout com pagamento
- [ ] Busca de produtos
- [ ] Favoritos/Lista de desejos
- [ ] Avaliações de produtos
- [ ] Painel administrativo

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ para **Colorado Móveis & Eletros**
# ecommerce-colorado
