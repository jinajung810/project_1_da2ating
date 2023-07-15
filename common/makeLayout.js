makeLayout();

function makeLayout() {
  initHeader();
  initSidebar();
  initFooter();
  initCategory();
}

function initHeader() {
  const token = sessionStorage.getItem('token');
  let userInfo = sessionStorage.getItem('userInfo');
  if (userInfo !== null) {
    userInfo = JSON.parse(userInfo);
  }

  let formTags = '';
  if (token === null || userInfo === null) {
    formTags = `
      <a class="header-form-btn sign-up-btn" href="../register/register.html">회원가입</a>
      <a class="header-form-btn login-btn" href="../login/login.html">로그인</a>
      <a class="header-icon-btn" href="../cart/cart.html">
        <span class="material-symbols-outlined" onclick="">shopping_cart</span>
      </a>
    `;

  } else {
    formTags = `
      <p class="welcome">반갑습니다. ${userInfo?.name}님</p>
      <button class="header-form-btn logout-btn" onclick="logout()">로그아웃</button>
      <a class="header-icon-btn" href="../member-info/mypage-view.html">
        <span class="material-symbols-outlined">face</span>
      </a>
      <a class="header-icon-btn" href="../cart/cart.html">
        <span class="material-symbols-outlined" onclick="">shopping_cart</span>
      </a>
    `;

    if (userInfo.type === 'admin') {
      formTags += `
        <a href="../admin/admin-product/admin-product.html">관리자기능</a>
      `;
    }
  }

  const headerTags = `
    <nav class="header-top">
      <a class="logo" href="/">
        <img src="/resources/logo2.gif">
      </a>
      <div class="search">
        <i class="fas fa-search"></i>
        <input class="keyword" type="search" placeholder="상품검색" onkeyup="searchProduct(event)">
      </div>
      <div class="form">
        ${formTags}
      </div>
    </nav>
    <nav class="header2">
      <div class="header-category"></div>
    </nav>
  `;

  const $header = document.querySelector('#header');
  $header.innerHTML = headerTags;
}

function initSidebar() {
  const sidebarTags = `
    <div class="menu-side">
      <div class="easyskills">
        <a href="../member-info/order-deliver.html">
          <span class="material-symbols-outlined">local_shipping</span></br>
        </a>
        <span class="material-symbols-outlined">maximize</span></br>
        <a href="../cart/cart.html">
          <span class="material-symbols-outlined">shopping_cart</span></br>
        </a>
        </div>
      <div class="topBottom">
        <a href="#">
          <span class="material-symbols-outlined">arrow_circle_up</span></br>
        </a>
        <a href="#footer">
          <span class="material-symbols-outlined">arrow_circle_down</span>
        </a>
      </div>
    </div>
  `;

  const $sidebar = document.querySelector('#sidebar');
  if ($sidebar !== null) {
    $sidebar.innerHTML = sidebarTags;
  }
}

function initFooter() {
  const $footer = document.querySelector('#footer');

  const footerTags = `
    <div class="inner">
      <div class="top">
        <ul class="footerMenu">
          <li><a href="javascript:void(0)">회사소개</a></li>
          <li><a href="javascript:void(0)">이용약관</a></li>
          <li><a href="javascript:void(0)">개인정보 처리방침</a></li>
          <li><a href="javascript:void(0)">이용안내</a></li>
        </ul>
        <ul class="sns" style="color:rgba(255, 255, 255, 0)">
          <li><a href="javascript:void(0)"><img src="/resources/icons/sns_insta.png" alt="Instagram"></a></li>
          <li><a href="javascript:void(0)"><img src="/resources/icons/sns_fb.png" alt="Facebook"></a></li>
          <li><a href="javascript:void(0)"><img src="/resources/icons/sns_you.png" alt="YouTube"></a></li>
        </ul>
      </div>

      <div class="companyInfo">
        <ul class="infoList">
          <li>법인명(상호) : 주식회사 엘리스 2조</li>
          <li>대표 : 2조</li>
          <li>TEL : <span>2222-2222</span></li>
        </ul>
        <ul class="infoList">
          <li>사업자등록번호 : 222-22-22222</li>
          <li>통신판매업신고번호 : 2023-엘리스-222</li>
          <li><button>사업자정보확인</button></li>
        </ul>
        <ul class="infoList">
          <li>주소 : 엘리스 1차 프로젝트</li>
          <li>개인정보관리책임자 : 엘리스</li>
          <li>E-Mail : elice@elice.io</li>
        </ul>

        <p class="copyright">
          Copyright&copy; <span>elice-team2</span>  All Rights Reserved.
        </p>

        <div class="footerLogo">
          <img src="/resources/logo2.gif" alt="logo">
        </div>
      </div>
    </div>
  `

  $footer.innerHTML = footerTags;
}

async function initCategory() {
  try {
    const res = await fetch('http://kdt-sw-5-team02.elicecoding.com/api/categories', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });
    const datas = await res.json();
    const data = datas.data;
    categoryAdd(data);

  } catch (error) {
    console.error('get 에러 발생', error);
  }
}

function categoryAdd(data) {
  const category = document.querySelector('.header-category');
  for (let i = 0; i < data.length; i++) {
    const categoryContent = document.createElement('a');
    categoryContent.textContent = `${data[i].name}`;
    const sanitizedToken = data[i].name.replace(/[\s<>]/g, '_');
    categoryContent.classList.add(sanitizedToken);
    categoryContent.href = `../product-list/product-list.html?category=${data[i]._id}`;
    category.appendChild(categoryContent);
  }

  // 카테고리 클릭 시 글자색 변화
  const categoryLinks = document.querySelectorAll('.category a');
  categoryLinks.forEach((link) => {
    link.addEventListener('click', function () {
      this.classList.toggle('clicked');
    });
  });
}

function logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userInfo');

  location.href = '/';
}

function searchProduct(e) {
  if (e.key === "Enter") {
    const searchInput = document.querySelector(".keyword");
    const searchQuery = searchInput.value;
    doSearch(searchQuery);
  }
}

async function doSearch(keyword) {
  const _keyword = keyword.trim();

  if (_keyword.length < 2) {
    alert('2글자 이상 검색해주세요.');
    return;
  }

  location.href = `../search/search.html?keyword=${_keyword}`;
}
