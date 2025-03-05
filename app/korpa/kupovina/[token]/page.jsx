import { OrderSuccess } from "@/_components/OrderToken/OrderToken";

const Purchase = ({ params: { token } }) => {
  return <OrderSuccess orderToken={token} />;
};

export default Purchase;

export const metadata = {
  title: "Kupovina | Bogutovo",
};
