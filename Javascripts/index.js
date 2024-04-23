$(document).ready(function () {
  $("#signin-btn").click(function () {
    window.location.href = "/views/login.html"; // Chuyển sang trang login.
  });
  $("#signup-btn").click(function () {
    window.location.href = "/views/login.html"; // Thay "login.html" bằng URL của trang đăng nhập
  });
});

function getFood() {
  // Lấy dữ liệu từ api Public về foods
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/categories.php",
    method: "GET",
    success: function (response) {
      // Xử lý dữ liệu phản hồi tại đây
      console.log(response);
      const foods = response.categories;

      // Khởi tạo biến html để lưu chuỗi HTML
      var html = "";

      // Sử dụng vòng lặp forEach để duyệt qua mảng foods
      foods.forEach((food, index) => {
        if (index <= 3) {
          // Tạo HTML cho mục thực phẩm thứ nhất, thứ hai và thứ ba
          html += `
      <div class="col-3  mt-4 card_food" style="position: relative; cursor:pointer;">
        <div class="" style="background-color: #F1F1F1;border-radius: 10px;width: 100%;box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;">
          <img class="px-3" src="${food.strCategoryThumb}" alt="" style="width: 100%; padding-bottom:2rem !important; padding-top:2rem !important;">
          <div class="p-3" style="width: 100%;background: #fff;border-radius: 10px; border-top-left-radius:40px;border-top-right-radius:40px;">
            <div class="text-center f-f-Readex-Medium f-s-20" style="color: #1D1D1D;">
              ${food.strCategory}
            </div>
            <div class="text-center limit">
              ${food.strCategoryDescription}
            </div>
            <div class="w-100 d-flex justify-content-between mt-2">
              <div class="f-s-20 f-f-Readex-Bold" style="color: #1D1D1D;">
                $ 20.2
              </div>
              <img src="../Image/imgheart.svg" alt="">
            </div>
          </div>
        </div>
      </div>
    `;
        } else {
          // Tạo HTML cho các mục thực phẩm còn lại
          html += `
      <div class="col-3 food-items mt-4 card_food" style="position: relative; cursor:pointer;">
        <div class="" style="background-color: #F1F1F1;border-radius: 10px;width: 100%;box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;">
          <img class="px-3" src="${food.strCategoryThumb}" alt="" style="width: 100%; padding-bottom:2rem !important; padding-top:2rem !important;">
          <div class="p-3" style="width: 100%;background: #fff;border-radius: 10px; border-top-left-radius:40px;border-top-right-radius:40px;">
            <div class="text-center f-f-Readex-Medium f-s-20" style="color: #1D1D1D;">
              ${food.strCategory}
            </div>
            <div class="text-center limit">
              ${food.strCategoryDescription}
            </div>
            <div class="w-100 d-flex justify-content-between mt-2">
              <div class="f-s-20 f-f-Readex-Bold" style="color: #1D1D1D;">
                $ 20.2
              </div>
              <img src="../Image/imgheart.svg" alt="">
            </div>
          </div>
        </div>
      </div>
    `;
        }
      });

      // Gán chuỗi HTML được tạo vào phần tử có id "list_food"
      $("#list_food").html(html);
      $(".food-items").hide();

      var isExpanded = false; // Biến để theo dõi trạng thái mở rộng/collapse của một phần tử trong danh sách foods
      $("#more_menu").click(() => {
        if (!isExpanded) {
          // Mở rộng danh sách
          isExpanded = true;
          // Hiển thị các mục thực phẩm tiếp theo trong danh sách với hiệu ứng slideDown
          $(".food-items").slideDown();
          // Thay đổi nội dung của nút "more menu"
          countFoodShow = 14;
          $("#more_menu").text("Less Menu");
        } else {
          // Thu gọn danh sách
          isExpanded = false;
          // Ẩn các mục thực phẩm tiếp theo trong danh sách với hiệu ứng slideUp
          $(".food-items").slideUp();
          // Thay đổi nội dung của nút "more menu"
          countFoodShow = 3;
          $("#more_menu").text("More Menu");
        }
      });
    },

    error: function (xhr, status, error) {
      // Xử lý lỗi tại đây
      console.log(error);
    },
  });
}
getFood();
// Xử lý sự kiện khi giá trị của input thay đổi
$("#searchInput").on("input", (event) => {
  const keyword = event.target.value.trim();

  // Kiểm tra nếu keyword là rỗng
  if (keyword === "") {
    // Xóa danh sách hiển thị danh mục
    clearCategories();
    hideDropdown();
    return;
  }

  // Xử lý khi có keyword
  getCategories()
    .done((data) => {
      const categories = data.categories;
      const filteredCategories = filterCategories(keyword, categories);
      displayCategories(filteredCategories);
      showDropdown();
    })
    .fail((error) => console.log(error));
});

// Xóa danh sách hiển thị danh mục
function clearCategories() {
  $("#categoriesList").empty();
}

// Lấy danh sách categories từ API
function getCategories() {
  return $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/categories.php",
    dataType: "json",
  });
}
// Hiển thị danh sách categories
function displayCategories(categories) {
  const categoriesList = $("#categoriesList");
  categoriesList.empty();

  categories.forEach((category) => {
    const card = `
      <div class="card card-search mt-1" onclick="searchFood()">
        <div class="card-body px-3 py-2" style="border-bottom: none">
          <div class="card-title f-s-16 f-f-Readex-Medium" style="color: #1D1D1D;">${category.strCategory}</div>
          <p class="card-text limit f-s-12">${category.strCategoryDescription}</p>
        </div>
      </div>
    `;

    categoriesList.append(card);
  });
}

// Bộ lọc danh mục dựa trên từ khóa
function filterCategories(keyword, categories) {
  if (keyword === "") {
    // Trả về mảng rỗng khi keyword rỗng
    return [];
  } else {
    return categories.filter((category) =>
      category.strCategory.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}
// Hiển thị dropdown
function showDropdown() {
  $("#dropdown").show();
}

// Ẩn dropdown
function hideDropdown() {
  $("#dropdown").hide();
}

// Chuyển sang trang kết quả tìm kiếm
function searchFood() {
  const valueInputSearch = $("#searchInput").val().trim();
  const url = `search.html?search=${valueInputSearch}`;
  window.location.href = url;
}
