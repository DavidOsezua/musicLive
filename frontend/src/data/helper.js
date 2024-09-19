// data/helpers.js
export const calculateSummary = (data) => {
  const totalItems = data.length;
  const statusCount = data.reduce(
    (acc, item) => {
      if (item.status === "Approved") {
        acc[item.status] += 1;
      } else if (item.status === "Pending") {
        acc[item.status] += 1;
      } else if (item.status === "Inactive") {
        acc[item.status] += 1;
      }
      return acc;
    },
    { Approved: 0, Pending: 0, Inactive: 0 }
  );

  return {
    totalItems,
    statusCount,
  };
};
