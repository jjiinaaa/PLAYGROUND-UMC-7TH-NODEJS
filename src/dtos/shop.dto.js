export const bodyToShop = (body) => {
  const { areaId, name, address, rating } = body;
  return {
    areaId,
    name,
    address,
    rating,
  };
};

export const responseFormShop = (shop) => {
  const { areaId, name, address, rating } = shop;
  return {
    areaId,
    name,
    address,
    rating,
  };
};
