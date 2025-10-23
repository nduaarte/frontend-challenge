import { PaymentMethod, PaymentStatus } from "../types";

type Opts = { latencyMs?: number; failRate?: number; expireAfterMs?: number };

export function createPaymentSimulator(method: PaymentMethod, opts: Opts = {}) {
  const defaults = {
    pix: { latencyMs: 900, failRate: 0.05, expireAfterMs: 15000 },
    card: { latencyMs: 1600, failRate: 0.15, expireAfterMs: 15000 },
    boleto: { latencyMs: 3500, failRate: 0.25, expireAfterMs: 25_000 },
  } as const;

  const cfg = { ...defaults[method], ...opts };
  let status: PaymentStatus = "initial";
  const listeners: ((s: PaymentStatus) => void)[] = [];
  const notify = () => listeners.forEach((l) => l(status));

  const on = (fn: (s: PaymentStatus) => void) => {
    listeners.push(fn);
    return () => {
      const i = listeners.indexOf(fn);
      if (i >= 0) listeners.splice(i, 1);
    };
  };

  const start = () => {
    status = "processing";
    notify();
    setTimeout(() => {
      const shouldFail = Math.random() < 0.75;
      if (shouldFail) {
        status = "failed";
      } else {
        status = "paid";
      }

      const r = Math.random();
      if (r < cfg.failRate) {
        status = "failed";
      } else {
        status = "paid";
      }
      notify();
    }, cfg.latencyMs + Math.random() * 800);

    setTimeout(() => {
      if (status === "processing" || status === "initial") {
        status = "expired";
        notify();
      }
    }, cfg.expireAfterMs);
  };

  return { on, start, getStatus: () => status };
}
