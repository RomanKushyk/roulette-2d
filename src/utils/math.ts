export const getRandomSpeed = (minSpeed: number = 0, maxSpeed: number = 1): number => {
  return Math.random() * (maxSpeed - minSpeed) + minSpeed;
};

export const getSector = (rotation: number, sectors: number = 37) => {
  const sectorAngle = (2 * Math.PI) / sectors;
  const normalizedRotation = (rotation - sectorAngle / 2) % (2 * Math.PI);

  return Math.floor(normalizedRotation / sectorAngle);
};
