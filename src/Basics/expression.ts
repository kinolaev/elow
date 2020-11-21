export const e1 = <A, B, C>(a: A, ab: (a: A, b: B) => C, b: B): C => ab(a, b)

export const e2l = <A, B, C, D, E>(
  a: A,
  ab: (a: A, b: B) => C,
  b: B,
  cd: (c: C, d: D) => E,
  d: D
): E => cd(ab(a, b), d)

export const e3l = <A, B, C, D, E, F, G>(
  a: A,
  ab: (a: A, b: B) => C,
  b: B,
  cd: (c: C, d: D) => E,
  d: D,
  ef: (e: E, f: F) => G,
  f: F
): G => ef(cd(ab(a, b), d), f)

export const e4l = <A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: (a: A, b: B) => C,
  b: B,
  cd: (c: C, d: D) => E,
  d: D,
  ef: (e: E, f: F) => G,
  f: F,
  gh: (g: G, h: H) => I,
  h: H
): I => gh(ef(cd(ab(a, b), d), f), h)

export const e5l = <A, B, C, D, E, F, G, H, I, J, K>(
  a: A,
  ab: (a: A, b: B) => C,
  b: B,
  cd: (c: C, d: D) => E,
  d: D,
  ef: (e: E, f: F) => G,
  f: F,
  gh: (g: G, h: H) => I,
  h: H,
  ij: (i: I, J: J) => K,
  j: J
): K => ij(gh(ef(cd(ab(a, b), d), f), h), j)

export const e6l = <A, B, C, D, E, F, G, H, I, J, K, L, M>(
  a: A,
  ab: (a: A, b: B) => C,
  b: B,
  cd: (c: C, d: D) => E,
  d: D,
  ef: (e: E, f: F) => G,
  f: F,
  gh: (g: G, h: H) => I,
  h: H,
  ij: (i: I, J: J) => K,
  j: J,
  kl: (k: K, l: L) => M,
  l: L
): M => kl(ij(gh(ef(cd(ab(a, b), d), f), h), j), l)

export const e7l = <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  a: A,
  ab: (a: A, b: B) => C,
  b: B,
  cd: (c: C, d: D) => E,
  d: D,
  ef: (e: E, f: F) => G,
  f: F,
  gh: (g: G, h: H) => I,
  h: H,
  ij: (i: I, J: J) => K,
  j: J,
  kl: (k: K, l: L) => M,
  l: L,
  mn: (m: M, n: N) => O,
  n: N
): O => mn(kl(ij(gh(ef(cd(ab(a, b), d), f), h), j), l), n)

export const e8l = <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, R>(
  a: A,
  ab: (a: A, b: B) => C,
  b: B,
  cd: (c: C, d: D) => E,
  d: D,
  ef: (e: E, f: F) => G,
  f: F,
  gh: (g: G, h: H) => I,
  h: H,
  ij: (i: I, J: J) => K,
  j: J,
  kl: (k: K, l: L) => M,
  l: L,
  mn: (m: M, n: N) => O,
  n: N,
  op: (o: O, p: P) => R,
  p: P
): R => op(mn(kl(ij(gh(ef(cd(ab(a, b), d), f), h), j), l), n), p)

export const e9l = <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, R, S, T>(
  a: A,
  ab: (a: A, b: B) => C,
  b: B,
  cd: (c: C, d: D) => E,
  d: D,
  ef: (e: E, f: F) => G,
  f: F,
  gh: (g: G, h: H) => I,
  h: H,
  ij: (i: I, J: J) => K,
  j: J,
  kl: (k: K, l: L) => M,
  l: L,
  mn: (m: M, n: N) => O,
  n: N,
  op: (o: O, p: P) => R,
  p: P,
  rs: (r: R, s: S) => T,
  s: S
): T => rs(op(mn(kl(ij(gh(ef(cd(ab(a, b), d), f), h), j), l), n), p), s)

export const e2r = <A, B, C, D, E>(
  d: D,
  dc: (d: D, c: C) => E,
  b: B,
  ba: (B: B, a: A) => C,
  a: A
): E => dc(d, ba(b, a))

export const e3r = <A, B, C, D, E, F, G>(
  f: F,
  fe: (f: F, e: E) => G,
  d: D,
  dc: (d: D, c: C) => E,
  b: B,
  ba: (B: B, a: A) => C,
  a: A
): G => fe(f, dc(d, ba(b, a)))

export const e4r = <A, B, C, D, E, F, G, H, I>(
  h: H,
  hg: (h: H, g: G) => I,
  f: F,
  fe: (f: F, e: E) => G,
  d: D,
  dc: (d: D, c: C) => E,
  b: B,
  ba: (B: B, a: A) => C,
  a: A
): I => hg(h, fe(f, dc(d, ba(b, a))))

export const e5r = <A, B, C, D, E, F, G, H, I, J, K>(
  j: J,
  ji: (j: J, i: I) => K,
  h: H,
  hg: (h: H, g: G) => I,
  f: F,
  fe: (f: F, e: E) => G,
  d: D,
  dc: (d: D, c: C) => E,
  b: B,
  ba: (B: B, a: A) => C,
  a: A
): K => ji(j, hg(h, fe(f, dc(d, ba(b, a)))))

export const e6r = <A, B, C, D, E, F, G, H, I, J, K, L, M>(
  l: L,
  lk: (l: L, k: K) => M,
  j: J,
  ji: (j: J, i: I) => K,
  h: H,
  hg: (h: H, g: G) => I,
  f: F,
  fe: (f: F, e: E) => G,
  d: D,
  dc: (d: D, c: C) => E,
  b: B,
  ba: (B: B, a: A) => C,
  a: A
): M => lk(l, ji(j, hg(h, fe(f, dc(d, ba(b, a))))))

export const e7r = <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  n: N,
  nm: (n: N, m: M) => O,
  l: L,
  lk: (l: L, k: K) => M,
  j: J,
  ji: (j: J, i: I) => K,
  h: H,
  hg: (h: H, g: G) => I,
  f: F,
  fe: (f: F, e: E) => G,
  d: D,
  dc: (d: D, c: C) => E,
  b: B,
  ba: (B: B, a: A) => C,
  a: A
): O => nm(n, lk(l, ji(j, hg(h, fe(f, dc(d, ba(b, a)))))))

export const e8r = <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, R>(
  p: P,
  po: (p: P, o: O) => R,
  n: N,
  nm: (n: N, m: M) => O,
  l: L,
  lk: (l: L, k: K) => M,
  j: J,
  ji: (j: J, i: I) => K,
  h: H,
  hg: (h: H, g: G) => I,
  f: F,
  fe: (f: F, e: E) => G,
  d: D,
  dc: (d: D, c: C) => E,
  b: B,
  ba: (B: B, a: A) => C,
  a: A
): R => po(p, nm(n, lk(l, ji(j, hg(h, fe(f, dc(d, ba(b, a))))))))

export const e9r = <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, R, S, T>(
  s: S,
  sr: (s: S, r: R) => T,
  p: P,
  po: (p: P, o: O) => R,
  n: N,
  nm: (n: N, m: M) => O,
  l: L,
  lk: (l: L, k: K) => M,
  j: J,
  ji: (j: J, i: I) => K,
  h: H,
  hg: (h: H, g: G) => I,
  f: F,
  fe: (f: F, e: E) => G,
  d: D,
  dc: (d: D, c: C) => E,
  b: B,
  ba: (B: B, a: A) => C,
  a: A
): T => sr(s, po(p, nm(n, lk(l, ji(j, hg(h, fe(f, dc(d, ba(b, a)))))))))
