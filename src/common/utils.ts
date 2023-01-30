export function choice<T>(choices: T[]): T {
  /*
   * Returns one randomly selected item from Array
   */
  const idx = Math.floor(Math.random() * choices.length);
  return choices[idx];
}
