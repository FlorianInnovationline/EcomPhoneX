export interface Review {
  id: string
  productId: string
  userName: string
  rating: number
  title: string | null
  comment: string
  createdAt: Date
}

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    productId: '1',
    userName: 'João Silva',
    rating: 5,
    title: 'Excellent phone',
    comment: 'Amazing camera quality and super fast performance. Highly recommended!',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'rev-2',
    productId: '1',
    userName: 'Maria Santos',
    rating: 5,
    title: 'Perfect for photography',
    comment: 'The Leica camera system is outstanding. Photos look professional.',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'rev-3',
    productId: '2',
    userName: 'Pedro Costa',
    rating: 4,
    title: 'Great value',
    comment: 'Good performance and build quality. Battery could be better.',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'rev-4',
    productId: '3',
    userName: 'Ana Ferreira',
    rating: 5,
    title: 'Fast charging is amazing',
    comment: '120W charging is a game changer. Phone charges in minutes!',
    createdAt: new Date('2024-02-10'),
  },
]
