export const sliceTitle = (title) => {
  if (title.length <= 38) {
    return title;
  } else {
    return title.slice(0, 35) + "...";
  }
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
