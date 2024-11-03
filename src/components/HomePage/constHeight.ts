let height: number | null = null;

export function setHeight(hei: number) {
  height = hei;
}

export function getHeight() {
  return height;
}

export default { setHeight, getHeight };
