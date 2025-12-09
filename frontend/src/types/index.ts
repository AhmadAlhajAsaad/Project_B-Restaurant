export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  createdAt: string;
}

export interface Reservation {
  id?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  reservationDate: string;
  reservationTime: string;
  numberOfGuests: number;
  specialRequests?: string;
  status?: string;
  createdAt?: string;
}

export interface OrderItem {
  id?: number;
  orderId?: number;
  menuItemId: number;
  menuItemName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  totalAmount: number;
  status?: string;
  createdAt?: string;
  orderItems: OrderItem[];
}
