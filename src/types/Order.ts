import { OrderItem } from './OrderItem';

export type Order = {
    orderId?: number | null;
    addressId: number;
    shipmentCompanyId?: number | null;
    shipmentTrack?: string | null;
    orderItems: OrderItem[];
}
