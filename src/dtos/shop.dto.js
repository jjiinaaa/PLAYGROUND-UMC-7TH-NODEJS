export const bodyToShop = (body) => {
  const { areaId, name, address, rating } = body;
  console.log("request body : ", body);
  return {
    areaId,
    name,
    address,
    rating,
  };
};

export const responseFormShop = (shop) => {
  console.log("response request : ", shop);
  return {
    areaId: shop[0].areaId,
    name: shop[0].name,
    address: shop[0].address,
    rating: shop[0].rating,
  };
};
