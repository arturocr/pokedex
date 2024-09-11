import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `${process.env.VITE_API_URL}`,
  documents: ["./src/graphql/**/*.ts"],
  generates: {
    "./src/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: false,
  hooks: { afterAllFileWrite: ["pnpm format"] },
};

export default config;
