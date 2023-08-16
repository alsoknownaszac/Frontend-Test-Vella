import React from "react";
import useFetch from "react-fetch-hook";
import { useParams } from "react-router";
import Layout from "../components/Layout/Layout";
import ErrorHandling from "../components/Container/ErrorHandling";
import ProductContainer from "../components/Category/ProductContainer";
import { SearchBar } from "../components/Basic/SearchBar";

export const Category = () => {
  const { category }: { category: string } = useParams();

  const { isLoading, error, data } = (useFetch as any)(
    `https://fakestoreapi.com/products/category/${category}`
  );

  const [inputSearch, setInputSearch] = React.useState<any>("");

  const [search, setSearch] = React.useState("");

  const filteredSearch = data?.filter(
    (val: { description: string; title: string }) => {
      if (search === "") {
        return val;
      } else if (
        val.description.toLowerCase().includes(search.toLowerCase()) ||
        val.title.toLowerCase().includes(search.toLowerCase())
      ) {
        return val;
      }
    }
  );

  if (isLoading) return <ErrorHandling>Loading...</ErrorHandling>;
  if (error)
    return <ErrorHandling>Something went wrong: {error}</ErrorHandling>;
  return (
    <Layout pageTitle={category}>
      <SearchBar
        placeholder={"search for an item"}
        value={inputSearch}
        checked={inputSearch}
        onChange={({ target }: any) => {
          // handles the input state change
          setInputSearch(target.value);
          // handles selected option by the user
          setSearch(target.value);
        }}
      />
      <ProductContainer productData={filteredSearch} />
    </Layout>
  );
};
