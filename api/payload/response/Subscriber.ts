export interface Subscriber {
  service: string;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  date_subscribed: string;
  has_paid: boolean;
}
