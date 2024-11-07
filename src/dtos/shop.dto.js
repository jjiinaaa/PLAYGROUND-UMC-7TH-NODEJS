export const bodyToShop = (body) => {
  return {
    areaId: body.areaId,
    name: body.name || "",
    address: body.address || "",
    rating: body.rating || 0,
  };
};

export const responseFormShop = (shop) => {
  console.log("response request : ", shop);
  return {
    areaId: shop[0].areaId,
    name: shop[0].name,
    address: shop.address,
    rating: shop.rating,
  };
};
