// Admin Dashboard Mock Data

export interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
    avatar?: string
  }
  items: {
    productId: string
    name: string
    quantity: number
    price: number
    image: string
  }[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: string
  paymentStatus: 'paid' | 'pending' | 'refunded'
  shippingAddress: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  trackingCode?: string
  createdAt: string
  updatedAt: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  cpf: string
  avatar?: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
  status: 'active' | 'inactive'
  addresses: {
    id: string
    label: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    isDefault: boolean
  }[]
  createdAt: string
}

export interface DashboardStats {
  totalRevenue: number
  revenueGrowth: number
  totalOrders: number
  ordersGrowth: number
  totalCustomers: number
  customersGrowth: number
  averageTicket: number
  ticketGrowth: number
  pendingOrders: number
  processingOrders: number
  shippedOrders: number
  deliveredOrders: number
}

export interface SalesData {
  date: string
  revenue: number
  orders: number
}

export interface TopProduct {
  id: string
  name: string
  image: string
  sales: number
  revenue: number
}

// Mock Orders
export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'COL-2026-0001',
    customer: {
      name: 'Maria Silva Santos',
      email: 'maria.silva@email.com',
      phone: '(11) 99999-8888',
    },
    items: [
      {
        productId: '1',
        name: 'Sofá Retrátil 3 Lugares Premium',
        quantity: 1,
        price: 2499.90,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200',
      },
    ],
    total: 2499.90,
    status: 'delivered',
    paymentMethod: 'Cartão de Crédito',
    paymentStatus: 'paid',
    shippingAddress: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Jardim América',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
    },
    trackingCode: 'BR123456789CD',
    createdAt: '2026-01-10T10:30:00Z',
    updatedAt: '2026-01-13T15:45:00Z',
  },
  {
    id: '2',
    orderNumber: 'COL-2026-0002',
    customer: {
      name: 'João Pedro Oliveira',
      email: 'joao.pedro@email.com',
      phone: '(11) 98888-7777',
    },
    items: [
      {
        productId: '2',
        name: 'Smart TV LED 55" 4K UHD',
        quantity: 1,
        price: 2799.00,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200',
      },
      {
        productId: '10',
        name: 'Home Theater 5.1 Canais',
        quantity: 1,
        price: 1799.00,
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=200',
      },
    ],
    total: 4598.00,
    status: 'shipped',
    paymentMethod: 'Pix',
    paymentStatus: 'paid',
    shippingAddress: {
      street: 'Av. Brasil',
      number: '456',
      neighborhood: 'Centro',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20040-020',
    },
    trackingCode: 'BR987654321CD',
    createdAt: '2026-01-12T14:20:00Z',
    updatedAt: '2026-01-14T09:00:00Z',
  },
  {
    id: '3',
    orderNumber: 'COL-2026-0003',
    customer: {
      name: 'Ana Carolina Ferreira',
      email: 'ana.ferreira@email.com',
      phone: '(21) 97777-6666',
    },
    items: [
      {
        productId: '3',
        name: 'Geladeira Frost Free 400L',
        quantity: 1,
        price: 3299.00,
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=200',
      },
    ],
    total: 3299.00,
    status: 'processing',
    paymentMethod: 'Boleto',
    paymentStatus: 'paid',
    shippingAddress: {
      street: 'Rua do Comércio',
      number: '789',
      neighborhood: 'Boa Vista',
      city: 'Recife',
      state: 'PE',
      zipCode: '50060-000',
    },
    createdAt: '2026-01-13T16:45:00Z',
    updatedAt: '2026-01-14T08:30:00Z',
  },
  {
    id: '4',
    orderNumber: 'COL-2026-0004',
    customer: {
      name: 'Carlos Eduardo Lima',
      email: 'carlos.lima@email.com',
      phone: '(31) 96666-5555',
    },
    items: [
      {
        productId: '4',
        name: 'Cama Box Queen Size + Colchão',
        quantity: 1,
        price: 1899.90,
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=200',
      },
      {
        productId: '8',
        name: 'Guarda-Roupa 6 Portas',
        quantity: 1,
        price: 1599.90,
        image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=200',
      },
    ],
    total: 3499.80,
    status: 'pending',
    paymentMethod: 'Cartão de Crédito',
    paymentStatus: 'pending',
    shippingAddress: {
      street: 'Rua Sergipe',
      number: '321',
      complement: 'Casa 2',
      neighborhood: 'Funcionários',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30130-170',
    },
    createdAt: '2026-01-14T09:15:00Z',
    updatedAt: '2026-01-14T09:15:00Z',
  },
  {
    id: '5',
    orderNumber: 'COL-2026-0005',
    customer: {
      name: 'Fernanda Costa Ribeiro',
      email: 'fernanda.costa@email.com',
      phone: '(41) 95555-4444',
    },
    items: [
      {
        productId: '5',
        name: 'Máquina de Lavar 15kg',
        quantity: 1,
        price: 2199.00,
        image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=200',
      },
    ],
    total: 2199.00,
    status: 'cancelled',
    paymentMethod: 'Pix',
    paymentStatus: 'refunded',
    shippingAddress: {
      street: 'Rua XV de Novembro',
      number: '567',
      neighborhood: 'Centro',
      city: 'Curitiba',
      state: 'PR',
      zipCode: '80020-310',
    },
    createdAt: '2026-01-11T11:00:00Z',
    updatedAt: '2026-01-12T14:30:00Z',
  },
  {
    id: '6',
    orderNumber: 'COL-2026-0006',
    customer: {
      name: 'Roberto Almeida Santos',
      email: 'roberto.almeida@email.com',
      phone: '(51) 94444-3333',
    },
    items: [
      {
        productId: '6',
        name: 'Ar Condicionado Split 12000 BTUs',
        quantity: 2,
        price: 1899.00,
        image: 'https://images.unsplash.com/photo-1631545806609-35d4d452374c?w=200',
      },
    ],
    total: 3798.00,
    status: 'delivered',
    paymentMethod: 'Cartão de Crédito',
    paymentStatus: 'paid',
    shippingAddress: {
      street: 'Av. Ipiranga',
      number: '1234',
      complement: 'Sala 56',
      neighborhood: 'Praia de Belas',
      city: 'Porto Alegre',
      state: 'RS',
      zipCode: '90160-093',
    },
    trackingCode: 'BR456789123CD',
    createdAt: '2026-01-08T09:30:00Z',
    updatedAt: '2026-01-11T16:00:00Z',
  },
]

// Mock Customers
export const customers: Customer[] = [
  {
    id: '1',
    name: 'Maria Silva Santos',
    email: 'maria.silva@email.com',
    phone: '(11) 99999-8888',
    cpf: '123.456.789-00',
    totalOrders: 5,
    totalSpent: 12499.50,
    lastOrderDate: '2026-01-10T10:30:00Z',
    status: 'active',
    addresses: [
      {
        id: '1',
        label: 'Casa',
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 45',
        neighborhood: 'Jardim América',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        isDefault: true,
      },
    ],
    createdAt: '2024-06-15T08:00:00Z',
  },
  {
    id: '2',
    name: 'João Pedro Oliveira',
    email: 'joao.pedro@email.com',
    phone: '(11) 98888-7777',
    cpf: '987.654.321-00',
    totalOrders: 3,
    totalSpent: 8598.00,
    lastOrderDate: '2026-01-12T14:20:00Z',
    status: 'active',
    addresses: [
      {
        id: '1',
        label: 'Trabalho',
        street: 'Av. Brasil',
        number: '456',
        neighborhood: 'Centro',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '20040-020',
        isDefault: true,
      },
    ],
    createdAt: '2025-01-20T10:00:00Z',
  },
  {
    id: '3',
    name: 'Ana Carolina Ferreira',
    email: 'ana.ferreira@email.com',
    phone: '(21) 97777-6666',
    cpf: '456.789.123-00',
    totalOrders: 2,
    totalSpent: 5298.00,
    lastOrderDate: '2026-01-13T16:45:00Z',
    status: 'active',
    addresses: [
      {
        id: '1',
        label: 'Casa',
        street: 'Rua do Comércio',
        number: '789',
        neighborhood: 'Boa Vista',
        city: 'Recife',
        state: 'PE',
        zipCode: '50060-000',
        isDefault: true,
      },
    ],
    createdAt: '2025-08-10T14:00:00Z',
  },
  {
    id: '4',
    name: 'Carlos Eduardo Lima',
    email: 'carlos.lima@email.com',
    phone: '(31) 96666-5555',
    cpf: '789.123.456-00',
    totalOrders: 1,
    totalSpent: 3499.80,
    lastOrderDate: '2026-01-14T09:15:00Z',
    status: 'active',
    addresses: [
      {
        id: '1',
        label: 'Casa',
        street: 'Rua Sergipe',
        number: '321',
        complement: 'Casa 2',
        neighborhood: 'Funcionários',
        city: 'Belo Horizonte',
        state: 'MG',
        zipCode: '30130-170',
        isDefault: true,
      },
    ],
    createdAt: '2026-01-14T09:00:00Z',
  },
  {
    id: '5',
    name: 'Fernanda Costa Ribeiro',
    email: 'fernanda.costa@email.com',
    phone: '(41) 95555-4444',
    cpf: '321.654.987-00',
    totalOrders: 1,
    totalSpent: 0,
    lastOrderDate: '2026-01-11T11:00:00Z',
    status: 'inactive',
    addresses: [
      {
        id: '1',
        label: 'Casa',
        street: 'Rua XV de Novembro',
        number: '567',
        neighborhood: 'Centro',
        city: 'Curitiba',
        state: 'PR',
        zipCode: '80020-310',
        isDefault: true,
      },
    ],
    createdAt: '2025-11-05T16:00:00Z',
  },
]

// Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalRevenue: 156789.50,
  revenueGrowth: 12.5,
  totalOrders: 342,
  ordersGrowth: 8.3,
  totalCustomers: 1256,
  customersGrowth: 15.2,
  averageTicket: 458.50,
  ticketGrowth: 4.1,
  pendingOrders: 23,
  processingOrders: 45,
  shippedOrders: 38,
  deliveredOrders: 236,
}

// Sales Data for Charts (last 7 days)
export const salesData: SalesData[] = [
  { date: '08/01', revenue: 18500, orders: 42 },
  { date: '09/01', revenue: 22300, orders: 51 },
  { date: '10/01', revenue: 19800, orders: 45 },
  { date: '11/01', revenue: 25600, orders: 58 },
  { date: '12/01', revenue: 21400, orders: 48 },
  { date: '13/01', revenue: 28900, orders: 65 },
  { date: '14/01', revenue: 20289, orders: 33 },
]

// Monthly Revenue Data
export const monthlyRevenue = [
  { month: 'Jan', revenue: 156789 },
  { month: 'Fev', revenue: 142350 },
  { month: 'Mar', revenue: 168420 },
  { month: 'Abr', revenue: 175890 },
  { month: 'Mai', revenue: 189650 },
  { month: 'Jun', revenue: 198740 },
  { month: 'Jul', revenue: 185320 },
  { month: 'Ago', revenue: 205890 },
  { month: 'Set', revenue: 215430 },
  { month: 'Out', revenue: 228900 },
  { month: 'Nov', revenue: 312560 },
  { month: 'Dez', revenue: 356780 },
]

// Top Products
export const topProducts: TopProduct[] = [
  {
    id: '1',
    name: 'Sofá Retrátil 3 Lugares Premium',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200',
    sales: 156,
    revenue: 389984.40,
  },
  {
    id: '2',
    name: 'Smart TV LED 55" 4K UHD',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200',
    sales: 134,
    revenue: 375066.00,
  },
  {
    id: '3',
    name: 'Geladeira Frost Free 400L',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=200',
    sales: 98,
    revenue: 323302.00,
  },
  {
    id: '6',
    name: 'Ar Condicionado Split 12000 BTUs',
    image: 'https://images.unsplash.com/photo-1631545806609-35d4d452374c?w=200',
    sales: 87,
    revenue: 165213.00,
  },
  {
    id: '4',
    name: 'Cama Box Queen Size + Colchão',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=200',
    sales: 76,
    revenue: 144392.40,
  },
]

// Category Performance
export const categoryPerformance = [
  { category: 'Sofás e Estofados', revenue: 485650, percentage: 28 },
  { category: 'TV e Áudio', revenue: 412380, percentage: 24 },
  { category: 'Cozinha', revenue: 345890, percentage: 20 },
  { category: 'Quartos', revenue: 258740, percentage: 15 },
  { category: 'Climatização', revenue: 138920, percentage: 8 },
  { category: 'Lavanderia', revenue: 86210, percentage: 5 },
]

// Recent Activities
export const recentActivities = [
  {
    id: '1',
    type: 'order',
    message: 'Novo pedido #COL-2026-0004 recebido',
    time: '5 minutos atrás',
    icon: 'ShoppingBag',
  },
  {
    id: '2',
    type: 'customer',
    message: 'Novo cliente Carlos Eduardo se cadastrou',
    time: '15 minutos atrás',
    icon: 'UserPlus',
  },
  {
    id: '3',
    type: 'shipping',
    message: 'Pedido #COL-2026-0002 foi despachado',
    time: '1 hora atrás',
    icon: 'Truck',
  },
  {
    id: '4',
    type: 'payment',
    message: 'Pagamento confirmado para pedido #COL-2026-0003',
    time: '2 horas atrás',
    icon: 'CreditCard',
  },
  {
    id: '5',
    type: 'review',
    message: 'Nova avaliação 5 estrelas para Smart TV 55"',
    time: '3 horas atrás',
    icon: 'Star',
  },
]

// Shipping Stats
export const shippingStats = {
  awaitingPickup: 23,
  inTransit: 45,
  delivered: 236,
  returned: 8,
  averageDeliveryDays: 4.2,
  onTimeDeliveryRate: 94.5,
}

// Financial Summary
export const financialSummary = {
  grossRevenue: 356780,
  netRevenue: 298456,
  refunds: 12450,
  fees: 8970,
  taxes: 36904,
  profit: 298456,
  profitMargin: 32.5,
  pendingPayments: 28900,
  receivedToday: 15680,
}
