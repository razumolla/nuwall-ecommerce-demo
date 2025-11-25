// product and order related types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface Order {
  id: string;
  products: Product[];
  total: number;
  status: string;
  createdAt: string;
}

// auth related types
export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// cart related types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

// checkout related types
export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
}

export interface CheckoutState {
  shippingAddress: ShippingAddress | null;
  paymentInfo: PaymentInfo | null;
}

// track order related types
export interface OrderStatus {
  orderId: string;
  status: string;
  estimatedDelivery: string;
}

export interface TrackOrderState {
  orders: OrderStatus[];
}
// UI related types
export interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null;
}

export interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export interface NotificationState {
  notifications: Notification[];
}
// settings related types
export interface UserSettings {
  theme: "light" | "dark";
  currency: "USD" | "EUR";
}
export interface SettingsState {
  userSettings: UserSettings;
}
// Redux root state
export interface RootState {
  auth: AuthState;
  cart: CartState;
  checkout: CheckoutState;
  trackOrder: TrackOrderState;
  notification: NotificationState;
  settings: SettingsState;
}
