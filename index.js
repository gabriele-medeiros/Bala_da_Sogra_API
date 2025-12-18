import GetProdutos from "./scenarios/Get-Produtos.js";
import GetProdutoId from "./scenarios/Get-Produto-id.js";
import { group, sleep } from "k6";

const scenarios = [
  {
    name: "Get/Produto",
    fn: GetProdutos,
    pause: 1,
  },
  {
    name: "Get/ProdutoById",
    fn: GetProdutoId,
    pause: 1,
  },
];

export default function () {
  for (const scenario of scenarios) {
    group(scenario.name, () => {
      scenario.fn();
    });

    sleep(scenario.pause);
  }
}
