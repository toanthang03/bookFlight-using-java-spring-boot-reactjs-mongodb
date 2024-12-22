const isValidImage = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type");

    // Kiểm tra xem phản hồi có thành công và loại nội dung có phải là ảnh không
    if (response.ok && contentType && contentType.startsWith("image/")) {
      return true;
    }
    return false;
  } catch (error) {
    // Nếu có lỗi xảy ra (ví dụ: link không tồn tại), link không hợp lệ
    return false;
  }
};

export default isValidImage;
