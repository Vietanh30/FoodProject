$("#logo").click(() => {
  window.location.href = "/views/index.html";
});
$("#signup-btn").click(function () {
  window.location.href = "/views/login.html";
});
// Trên trang search.html
const urlParams = new URLSearchParams(window.location.search);
const valueInputSearch = urlParams.get("search") || ""; // Sử dụng toán tử || để cung cấp giá trị mặc định là chuỗi rỗng

console.log(valueInputSearch); // In giá trị valueInputSearch từ URL
$.ajax({
  url: "https://www.themealdb.com/api/json/v1/1/categories.php",
  method: "GET",
  success: function (response) {
    // Xử lý dữ liệu phản hồi tại đây
    const foods = response.categories;
    // Lọc ra các foods với keyword là input từ bên index
    const filteredCategories = filterCategories(valueInputSearch, foods);
    console.log(filteredCategories);
    html = "";
    filteredCategories.forEach((food, index) => {
      html += `
      <div class="col-3  mt-4 card_food" style="position: relative; cursor:pointer">
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
    });
    $("#list_food").html(html);
  },
  error: function (error) {
    // Xử lý lỗi tại đây
    console.log(error);
  },
});

// Bộ lọc danh mục dựa trên từ khóa
function filterCategories(keyword, foods) {
  if (keyword === "") {
    // Trả về toàn bộ danh sách foods khi keyword rỗng
    return foods;
  } else {
    return foods.filter((category) =>
      category.strCategory.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}
