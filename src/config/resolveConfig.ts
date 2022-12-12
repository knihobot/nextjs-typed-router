import { cosmiconfig } from "cosmiconfig";
import { TypeScriptLoader } from "cosmiconfig-typescript-loader";

const explorer = cosmiconfig("router", {
  loaders: {
    ".ts": TypeScriptLoader(),
  },
});

export const cfg = explorer.load("./routes.ts");
