function interpolate<T>(text: string, params: T) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${text}\`;`)(...vals);
}

export default interpolate;
