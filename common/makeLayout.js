const $header = document.querySelector('#header');
const $footer = document.querySelector('#footer');

function makeLayout() {
    fetch('/common/header.html')
      .then(res => res.text())
      .then(data => {

        $header.innerHTML = data;
      });


    fetch('/common/footer.html')
      .then(res => res.text())
      .then(data => $footer.innerHTML = data);
}


makeLayout();



