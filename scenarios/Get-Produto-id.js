import http from "k6/http";
import { sleep } from "k6";
import { Trend, Rate } from "k6/metrics";
import { check, fail } from "k6";

export const GetProdutoDuration = new Trend("get_Produto_duration");
export const GetProdutoFailRate = new Rate("get_Produto_fail_Rate");
export const GetProdutoSucessRate = new Rate("get_Produto_sucess_rate");
export const GetProdutoReqs = new Rate("get_Produto_reqs");

export default function () {
  const res = http.get(
    "http://localhost:3000/api/produtos/d76eeba6-7635-4ca4-bfe5-e4239bfacfe5"
  );
  GetProdutoDuration.add(res.timings.duration);
  GetProdutoReqs.add(1);
  GetProdutoFailRate.add(res.status == 0 || res.status > 399);
  GetProdutoSucessRate.add(res.status < 399);

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
