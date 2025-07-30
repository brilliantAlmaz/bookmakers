

document.addEventListener('DOMContentLoaded', () => {

   // fancybox init
   Fancybox.bind("[data-fancybox]", {
   });



   const tabWrapper = document.querySelector('.main__tabwrapper');
   let tabWrapperHeight;
   const dotsButton = document.querySelector('.dots');
   const tabs = document.querySelectorAll('.main__tab ');
   const listingItems = document.querySelectorAll('.main__item');


   tabs.forEach(tab => {
      tab.addEventListener('click', async function (e) {
         e.preventDefault();
         // delete all active classes
         tabs.forEach(t => {
            t.classList.remove('active');
         })
         tab.classList.add('active');
         // hide the menu after clicking on the tab (300ms for the animations play + 50ms delay)
         // only if the viewed from mobile
         if (window.innerWidth <= 701)
            setTimeout(() => {
               dotsButton.classList.remove('active');
               tabWrapper.classList.remove('active');
               tabWrapper.style.height = 0;
            }, 350);

      })
   })

   function setStars(elem) {
      elem.querySelector('.mask').style.width = (5 - elem.dataset.rate) / 5 * 100 + "%"
   }
   listingItems.forEach(li => {
      setStars(li.querySelector('.main__ratingwrap'));
   })





   dotsButton.addEventListener('click', () => {
      // X typefor three dots
      dotsButton.classList.toggle('active');
      // watch when change heights
      tabWrapper.classList.toggle('active');

      if (tabWrapper.classList.contains('active')) {
         tabWrapper.style.height = tabWrapper.style.maxHeight;
      } else {
         tabWrapper.style.height = 0;

      }

   })



   // tab logic 
   tabs.forEach(tab => {
      tab.addEventListener('click', async function () {
         // show loading
         document.querySelector('.listingscreen').classList.remove('hidden')

         // settimeout for immitation the wait for the data to come from server
         setTimeout(() => {


            // remove the existing items
            // document.querySelector('.main__listing').innerHTML = "";
            document.querySelectorAll('.main__item').forEach(mi => mi.remove())


            // sort by the data-sort attribute
            companiesData.sort((a, b) => {
               const aValue = a[tab.dataset.sort];
               const bValue = b[tab.dataset.sort];
               if (aValue > bValue) {
                  return -1;
               } else {
                  return 1;
               }
            })

            // console log all items as if the server returns json 
            console.log(JSON.stringify(companiesData));


            companiesData.forEach((item, index) => {
               let companyRate = "";
               // set rating display value
               if (tab.dataset.sort != "bonus_value") {
                  companyRate = tab.dataset.sort;
               } else {
                  // if we search by bonus value the rating will be general_rating
                  companyRate = 'general_rating';
               }
               // bonus type search
               const currentItemBonusData = bonusTypes.find(bonus => bonus.name === item.bonus_type) ?? { name: "none" };



               document.querySelector('.main__listing').insertAdjacentHTML('beforeend',
                  `<div class="main__item">
                        <div class="main__logo">
                           <img src="./img/logos/bookmaker-card/${item.logo}" alt="">
                           <div class="main__verified ${item.is_verified}">
                              <img src="./img/verified.png" alt="">
                           </div>

                        </div>
                        <div class="main__rating">
                           <div class="main__ratingwrap" data-rate="${item[companyRate]}">
                              <div class="mask"></div>
                              <img src="./img/star.svg" alt="" class="star">
                              <img src="./img/star.svg" alt="" class="star">
                              <img src="./img/star.svg" alt="" class="star">
                              <img src="./img/star.svg" alt="" class="star">
                              <img src="./img/star.svg" alt="" class="star">
                           </div>
                           <span class="main__rating-val">${item[companyRate].toFixed(1)}</span>
                        </div>
                        <div class="main__chat">
                           <img src="./img/chat.svg" alt="">
                           <span class="main__chat-val">${item.chat_quantity}</span>
                        </div>
                        <div class="main__bonus">
                           <div class="main__bonus-text ${currentItemBonusData.name}"
                           style="background:${currentItemBonusData.color}12; color:${currentItemBonusData.color}" >${currentItemBonusData.text ?? ""}</div>
                           <div class="main__bonus-val">
                              <img src="./img/gift.svg" alt=""><span>${item.bonus_value}</span>
                           </div>
                        </div>
                        <div class="main__links">
                           <a href="${item.inner_link}"  class="main__link main__link-inner">Обзор</a>
                           <a href="${item.outer_link}" rel="nofollow" target="_blank" class="main__link main__link-outer">Сайт</a>
                        </div>
                     </div>`

               );
               // turning off inner links 
               document.querySelectorAll('.main__item .main__link-inner')[index].addEventListener('click', (e) => {
                  e.preventDefault();
                  alert("На реальном проекте эта ссылка ввела бы на страницу по url: " + e.target.href);
               });
               // set star rating by data-rate value for current item
               setStars(document.querySelectorAll('.main__item')[index].querySelector('.main__ratingwrap'));



            })
            // remove loading page
            document.querySelector('.listingscreen').classList.add('hidden')
         }, 1000);

      })
   })

   // init general rating sort
   tabs[0].dispatchEvent(new Event('click'));




   windowInit();


   window.addEventListener('resize', windowInit)
   function windowInit() {
      tabWrapper.style.maxHeight = "100%";
      tabWrapper.style.height = "100%";
      tabWrapperHeight = tabWrapper.clientHeight;



      tabWrapper.style.maxHeight = tabWrapperHeight + "px";

      if (window.innerWidth <= 701) {
         tabWrapper.style.height = 0;
      } else {
         tabWrapper.style.height = 100 + "%";
      }

      dotsButton.classList.remove('active');
      tabWrapper.classList.remove('active');
      // loading screen 
      if (document.querySelector('.loadingscreen'))
         document.querySelector('.loadingscreen').classList.add('hidden');
   }


   document.querySelector('.main__link-footer').addEventListener('click', (e) => {
      e.preventDefault();

      alert("Эта ссылка куда то должна вести?")
   })


})