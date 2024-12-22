export const PieChart = (labels, datas) => {
  const data = {
    labels: labels ? labels : ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: datas ? datas : [300, 50, 100],
        // Màu ngẫu nhiên
        backgroundColor: Array.from(
          { length: labels? labels.length : 3 },
          () => "#" + Math.floor(Math.random() * 16777215).toString(16)
        ),
        hoverBackgroundColor: Array.from(
          { length: labels? labels.length : 3 },
          () => "#" + Math.floor(Math.random() * 16777215).toString(16)
        ),
      },
    ],
  };

  return data;
};
export default PieChart;
