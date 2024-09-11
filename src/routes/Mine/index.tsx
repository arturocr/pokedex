import Layout from "../../components/Layout";
import { useTitle } from "../../hooks/useTitle";
import { useAppStore } from "../../store";

const Mine = () => {
  useTitle("Mine");
  const { pokemons } = useAppStore((state) => ({
    pokemons: state.pokemons,
  }));

  return (
    <Layout>
      <h1>Mine</h1>
      <pre>{pokemons.join(", ")}</pre>
    </Layout>
  );
};

export default Mine;
