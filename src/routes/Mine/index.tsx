import Layout from "../../components/Layout";
import { useTitle } from "../../hooks/useTitle";

const Mine = () => {
  useTitle("Mine");
  return (
    <Layout>
      <h1>Mine</h1>
    </Layout>
  );
};

export default Mine;
