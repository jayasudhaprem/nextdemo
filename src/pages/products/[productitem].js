import { useRouter } from "next/router";

const ProductItem = ({Product}) => {
    const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h3>
        {Product.name}
      </h3>
      <p>{Product.description}</p>
    </>
  );
};


export const getServerSideProps = async (context) => {
  const { params, res, req, query } = context;
  const response = await fetch(`http://localhost:4000/products`);
  const data = await response.json();
  const filteredItem = data.find((item) => {
    if (item.name.toLowerCase() == params.productitem.toLowerCase()) { return item; }
})
  return {
    props: {
        Product: filteredItem,
    },
  };
};

export default ProductItem;
