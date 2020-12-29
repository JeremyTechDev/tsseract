const arrayToObj = (arr: object[], keyProp: string) => {
  let obj: any = {};
  arr.forEach((elem: any) => {
    obj[elem[keyProp]] = elem;
  });
  return obj;
};

export default arrayToObj;
