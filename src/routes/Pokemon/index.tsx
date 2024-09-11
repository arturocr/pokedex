import Layout from "../../components/Layout";
import { useTitle } from "../../hooks/useTitle";

const Pokemon = () => {
  useTitle("Pokémon");
  return (
    <Layout>
      <h1>Pokemon</h1>
    </Layout>
  );
};

export default Pokemon;
