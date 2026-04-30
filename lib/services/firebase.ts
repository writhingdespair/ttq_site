import { Order } from '@/lib/models/order'
import { Customer } from '@/lib/models/customer'
import { MenuCategory } from '@/lib/models/menu'
import { menuCategories } from '@/lib/data/menu'

/**
 * Firebase service abstraction.
 *
 * Currently uses local mock data. To connect real Firebase:
 * 1. Set NEXT_PUBLIC_FIREBASE_CONFIG in .env.local (JSON string)
 * 2. Uncomment Firebase SDK imports
 * 3. Replace mock implementations with real Firestore calls
 */

// Placeholder for Firebase config
const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  ? JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
  : {
      apiKey: 'placeholder',
      authDomain: 'placeholder.firebaseapp.com',
      projectId: 'placeholder',
      storageBucket: 'placeholder.appspot.com',
      messagingSenderId: '000000000000',
      appId: '0:000000000000:web:0000000000000000000000',
    }

export function getFirebaseConfig() {
  return firebaseConfig
}

let ordersStore: Order[] = []
let customersStore: Customer[] = []

export async function fetchMenuCategories(): Promise<MenuCategory[]> {
  // TODO: Replace with Firestore query
  // const snapshot = await getDocs(collection(db, 'menuCategories'))
  // return snapshot.docs.map(doc => doc.data() as MenuCategory)
  return menuCategories
}

export async function submitOrder(order: Order): Promise<{ orderId: string }> {
  // TODO: Replace with Firestore add
  // const docRef = await addDoc(collection(db, 'orders'), order)
  // return { orderId: docRef.id }

  const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const newOrder = { ...order, id: orderId }
  ordersStore.push(newOrder)
  return { orderId }
}

export async function getOrder(orderId: string): Promise<Order | null> {
  // TODO: Replace with Firestore get
  return ordersStore.find((o) => o.id === orderId) || null
}

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
  // TODO: Replace with Firestore update
  const order = ordersStore.find((o) => o.id === orderId)
  if (order) order.status = status
}

export async function createCustomer(customer: Customer): Promise<{ customerId: string }> {
  // TODO: Replace with Firestore add
  const customerId = `cust_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  customersStore.push({ ...customer, id: customerId })
  return { customerId }
}

export async function getCustomer(customerId: string): Promise<Customer | null> {
  // TODO: Replace with Firestore get
  return customersStore.find((c) => c.id === customerId) || null
}

export async function updateCustomer(customerId: string, data: Partial<Customer>): Promise<void> {
  // TODO: Replace with Firestore update
  const customer = customersStore.find((c) => c.id === customerId)
  if (customer) Object.assign(customer, data)
}
