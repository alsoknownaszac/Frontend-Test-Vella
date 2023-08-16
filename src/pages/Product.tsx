import useFetch from "react-fetch-hook";
import { useParams } from "react-router";
import ErrorHandling from "../components/Container/ErrorHandling";
import Layout from "../components/Layout/Layout";
import SingleProductContainer from "../components/ProductDetails/SingleProductContainer";

export default function Product() {
  const { id }: { id: string } = useParams();

  const { isLoading, error, data } = (useFetch as any)(
    `https://fakestoreapi.com/products/${id}`
  );

  if (isLoading) return <ErrorHandling>Loading...</ErrorHandling>;
  if (error)
    return <ErrorHandling>Something went wrong: {error}</ErrorHandling>;
  return (
    <Layout>
      <SingleProductContainer productData={data} />
    </Layout>
  );
}
