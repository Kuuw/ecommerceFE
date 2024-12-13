export type Address = {
  addressId?: number | null;
  userId?: number | null;
  countryId: number;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string | null;
  postalCode: string;
  telephone: string;
}
