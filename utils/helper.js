const getPublicKeyOfImage = (url) => {
  const arr = url.split("/");
  const imgPublicId =
    arr[arr.length - 2] + "/" + arr[arr.length - 1].split(".")[0];
  return imgPublicId;
};

module.exports = { getPublicKeyOfImage };
