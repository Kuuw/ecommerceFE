import { OrderItem } from './OrderItem';

export interface Order {
    orderId?: number | null;
    addressId: number;
    shipmentCompanyId?: number | null;
    shipmentTrack?: string | null;
    orderItems: OrderItem[];
}
