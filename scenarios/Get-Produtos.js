import http from "k6/http";
import { sleep } from "k6";
import { Trend, Rate } from "k6/metrics";
import { check, fail } from "k6";

export const GetProdutosDuration = new Trend("get_Produtos_duration");
export const GetProdutosFailRate = new Rate("get_Produtos_fail_Rate");
export const GetProdutosSucessRate = new Rate("get_Produtos_sucess_rate");
export const GetProdutosReqs = new Rate("get_Produtos_reqs");

export default function () {
  const res = http.get("http://localhost:3000/api/Produtos");
  GetProdutosDuration.add(res.timings.duration);
  GetProdutosReqs.add(1);
  GetProdutosFailRate.add(res.status == 0 || res.status > 399);
  GetProdutosSucessRate.add(res.status < 399);

  const durationMsg = "max Duration ${4000/1000}s";
  if (
    !check(res, {
      "max duration": (r) => r.timings.duration < 40000,
    })
  ) {
    fail(durationMsg);
  }

  sleep(1);
}
