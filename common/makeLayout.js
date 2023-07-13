makeLayout();

function makeLayout() {
  initHeader();
  initSidebar();
  initFooter();
}

function initHeader() {
  const $header = document.querySelector('#header');

  const headerTags = `
    <nav class="header-top">
      <a class="logo" href="/">
          <img src="/resources/logo2.gif">
      </a>
      <div class="search">
          <i class="fas fa-search" type="button" onclick="doSearch()"></i>
          <input class="keyword" type="search" placeholder="상품검색" onkeyup="performSearch(event)">
      </div>
      <div class="form">
          <p class="welcome">회원가입</p>
          <button class="login" type="submit" onclick="login()" style="cursor: pointer">로그인</button>
          <a class="mypage" href="/views/member-info/mypage-view.html">
              <span class="material-symbols-outlined" onclick="mypage()">face</span>
          </a>
          <a class="cart" href="/views/cart/cart.html">
              <span class="material-symbols-outlined" onclick="mypage()">shopping_cart</span>
          </a>
      </div>
    </nav>
    <nav class="header2">
      <div class="header-category"></div>
    </nav>
  `;

  $header.innerHTML = headerTags;
}

function initSidebar() {
  const $sidebar = document.querySelector('#sidebar');

  const sidebarTags = `
    <div class="menu-side">
      <div class="easyskills">
        <a href="/views/member-info/order-deliver.html">
          <span class="material-symbols-outlined" style="cursor: pointer;">local_shipping</span></br>
        </a>
        <span class="material-symbols-outlined">maximize</span></br>
        <span class="material-symbols-outlined" href="" style="cursor: pointer;">shopping_cart</span></br>
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
    <link rel="stylesheet" href="sidebar.css">
  `

  $sidebar.innerHTML = sidebarTags;
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