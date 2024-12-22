const addTimeFormat = (timeString, hoursToAdd, minutesToAdd) => {
  // Chuyển đổi thời gian từ chuỗi "HH:mm" thành đối tượng Date
  let [hours, minutes] = timeString.split(":").map(Number);

  // Tạo đối tượng Date từ giờ và phút
  let date = new Date();
  date.setHours(hours, minutes, 0, 0); // Cài đặt giờ và phút vào đối tượng Date

  // Thêm số giờ và số phút vào đối tượng Date
  date.setHours(date.getHours() + hoursToAdd);
  date.setMinutes(date.getMinutes() + minutesToAdd);

  // Định dạng lại thời gian sau khi cộng vào giờ và phút
  let newHours = String(date.getHours()).padStart(2, "0");
  let newMinutes = String(date.getMinutes()).padStart(2, "0");

  // Trả về kết quả với định dạng "HH:mm"
  return `${newHours}:${newMinutes}`;
};

export default addTimeFormat;

