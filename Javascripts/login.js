$("#sign-up-btn").click(function () {
  $(".container").addClass("sign-up-mode");
});

$("#sign-in-btn").click(function () {
  $(".container").removeClass("sign-up-mode");
});
$(document).ready(function () {
  var users = []; // Mảng lưu trữ thông tin người dùng

  // Gọi API để lấy thông tin người dùng
  $.ajax({
    url: "https://randomuser.me/api/?results=10&seed=your_seed",
    dataType: "json",
    success: function (data) {
      users = data.results; // Lưu trữ danh sách người dùng từ API
      console.log("User Information:");

      // Lặp qua từng người dùng và hiển thị thông tin
      users.forEach(function (user, index) {
        console.log("User " + (index + 1) + ":");
        console.log("Username: " + user.login.username);
        console.log("Password: " + user.login.password);
      });
    },
  });

  $(".sign-in-form").submit(function (e) {
    e.preventDefault(); // Ngăn chặn việc gửi biểu mẫu

    var username = $("#username_login").val();
    var password = $("#password_login").val();

    // Kiểm tra xem có người dùng nào trùng khớp với thông tin đăng nhập
    var isMatch = users.some(function (user) {
      return (
        user.login.username === username && user.login.password === password
      );
    });

    if (isMatch) {
      // Chuyển hướng sang trang index.html
      window.location.href = "/views/index.html";
    } else {
      // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác
      alert("Invalid username or password");
    }
  });
});
