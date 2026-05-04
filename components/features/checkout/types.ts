export type Step = 0 | 1 | 2 | 3;
export type CheckoutMode = 'guest' | 'account';

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  payment: string;
};

export const defaultForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  address: '',
  houseNumber: '',
  postalCode: '',
  city: '',
  payment: 'ideal',
};
