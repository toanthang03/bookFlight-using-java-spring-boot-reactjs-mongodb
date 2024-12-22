// public static int ageDiscount(String passengerType) {
//     if (passengerType.equals("Em bé")) {
//         return 100;
//     } else if (passengerType.equals("Trẻ nhỏ")) {
//         return 50;
//     } else if (passengerType.equals("Trẻ em")) {
//         return 20;
//     } else {
//         return 0;
//     }
// }

const ageDiscount = (passengerType) => {
  if (passengerType === "Em bé") {
    return 100;
  } else if (passengerType === "Trẻ nhỏ") {
    return 50;
  } else if (passengerType === "Trẻ em") {
    return 20;
  } else {
    return 0;
  }
};

export default ageDiscount;
