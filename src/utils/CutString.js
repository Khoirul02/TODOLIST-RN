/* eslint-disable prettier/prettier */
export const CutString = (value, longValueExpecation) => {
  var result;
  let title = value;
  let showTitle =
    title.length > longValueExpecation
      ? `${title.substring(0, longValueExpecation)} ...`
      : title;
  result = showTitle;
  return result;
};
