export const formatDate = (date) => {
  const year = date?.getFullYear();
  const day = String(date?.getDate()).padStart(2, "0");
  const month = String(date?.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  return `${year}-${month}-${day}`;
};

export function flattenProduct(data) {
  let options = [];
  data?.forEach((item) => {
    options.push({
      value: item._id || item.value,
      label: item.productName || item.name || item.title || item.label,
    });
  });
  return options;
}

export const FormatedDate = (DateData) => {
  const date = new Date(DateData);
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = date.toLocaleString("en-GB", options);
  return formattedDate;
};
