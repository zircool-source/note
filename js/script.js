// function testWebP(callback) {
// 	var webP = new Image();
// 	webP.onload = webP.onerror = function () {
// 		callback(webP.height == 2);
// 	};
// 	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
// }
// testWebP(function (support) {
// 	if (support == true) {
// 		document.querySelector('html').classList.add('_webp');
// 	} else {
// 		document.querySelector('html').classList.add('_no-webp');
// 	}
// });

const html = document.querySelector('html');
const header = document.querySelector(".header");
const sandwich = document.querySelector('.header__sandwich');
const search = document.querySelector('.header__search');
const searchClose = document.querySelector('.header__search-body .section__close');
const close = document.querySelector('.nav__close');

const rightMenu = document.querySelector('.section_view_article .section__right')
const article = document.querySelector('.section_view_article')


/*Клик вне открытого меню*/
document.addEventListener('mousedown', (event) => {
  const withinBoundaries = event.composedPath().includes(document.querySelector('.header'));
  if (document.querySelector('.menu_opened')) {
    if (!withinBoundaries) {
      html.classList.remove('menu_opened');
      sandwich.classList.remove('open');
    }
  }

  if (document.querySelector('.search_opened')) {
    if (!withinBoundaries) {
      html.classList.remove('search_opened');
      search.classList.remove('open');
    }
  }
})

if (sandwich) {
	sandwich.addEventListener('click', function() {
		sandwich.classList.toggle('open');
    html.classList.toggle('menu_opened');
	})
}

if (search) {
	search.addEventListener('click', function() {
    search.classList.toggle('open');
    html.classList.toggle('search_opened');
	})
}

if (searchClose) {
  searchClose.addEventListener('click', function() {
    search.classList.remove('open');
    html.classList.remove('search_opened');
	})
}

if (close) {
	close.addEventListener('click', function() {
      html.classList.remove('menu_opened');
      html.classList.remove('search_opened');
	})
}

/* Отслеживание клика на ESC */

document.onkeydown = function(evt) {
  evt = evt || window.event;
  let isEscape = false;
  if ("key" in evt) {
      isEscape = (evt.key === "Escape" || evt.key === "Esc");
  } else {
      isEscape = (evt.keyCode === 27);
  }
  if (isEscape) {
      document.querySelector('html').classList.remove('menu_opened','search_opened');
  }
};


/*Фиксация header при скролле*/
window.onscroll = function() {
	stickyHeader();
};


const addSticky = (add) => {
  if (rightMenu && article) {
    if (html.classList.contains('header_fixed')) {
      let calculate = window.pageYOffset - header.offsetHeight;

              // console.log(window.pageYOffset, header.offsetTop, rightMenu.offsetHeight);
              // console.log(article.getBoundingClientRect().height - rightMenu.offsetHeight)

      if (calculate > 0 && window.pageYOffset < article.getBoundingClientRect().height - rightMenu.offsetHeight) {
        rightMenu.style.marginTop = `${calculate + 40}px`
      } 
      if (window.pageYOffset < 150) {
        rightMenu.style.marginTop = `${0}px`
      }
    } 
  }
	if (add) {
		html.classList.add('header_fixed')
		header.classList.add('sticky');
	} else {
		html.classList.remove('header_fixed')
		header.classList.remove('sticky');
	}
}

const stickyHeader = () => (window.pageYOffset > header.offsetTop) ? addSticky('add') : addSticky();
/* =====================================*/
;
function accordion() {
	let acc = document.querySelectorAll('.accordion button');
	for (let i = 0; i < acc.length; i++) {
	  acc[i].addEventListener('click', function() {
		this.classList.toggle('active');

		if (this.closest(".accordion__item")) {
			this.closest(".accordion__item").classList.toggle('active');
		};

		let panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
		  panel.style.maxHeight = null;
		} else {
		  panel.style.maxHeight = panel.scrollHeight + 'px';
		} 
	  });
	}
  };
  
  if (document.querySelector('.accordion')) {
	accordion();
  }
  /* =====================================*/


;
if (document.querySelector('input[type=file]')) {

	const fileInputs = document.querySelectorAll('input[type=file]');
  
	fileInputs.forEach(function(file) {
		file.outerHTML = `
		<div class="file">
			<div class="file__upload">
				${file.outerHTML}
			</div>
			<div class="file__bg">
				<div class="file__name">${file.dataset.text ? file.dataset.text : 'Прикрепить файл'}</div>
				<div class="file__icon" style="mask: url(../img/icons/icons.svg?#${file.dataset.icon ? file.dataset.icon : 'download'});"></div>
			</div>

			<div class="file__list">Файл не выбран</div>
		</div>
		`
	})
  
	fileInputs.forEach(function(el) {
	  el.addEventListener('change', function(e) {
		if (!el.hasAttribute('multiple')) {
			this.closest('.file').querySelector('.file__name').innerHTML = this.value.replace(/C:\\fakepath\\/i, '');
		}
	  })
	})


	// if (document.querySelector('#profile_photo')) {
	// 	const photo = document.getElementById('profile_photo');
	// 	photo.closest("picture").querySelector('source').remove();
	// 	var loadFile = function(event) {
	// 		photo.src = URL.createObjectURL(event.target.files[0]);
	// 	};
	// }

	function delete_file(filelist, i){
		let arr = new Array(...filelist);
		arr.splice(i, 1);
		// alert(arr);
		return array_to_filelist(arr);
	}

	function array_to_filelist (arr) {
		let b = new ClipboardEvent('').clipboardData || new DataTransfer();
		for (let i = 0, len = arr.length; i < len; i++) {
			b.items.add(arr[i]);
		}
		return b.files;
	}

	document.querySelectorAll('input[type=file]').forEach(function(element) {
		element.addEventListener('change', function(e){
			const files = Array.from(e.target.files); // Convert FileList to Array

			// alert(files);
			
			if (element.closest('.file').querySelector('.file__list')) {
				element.closest('.file').querySelector('.file__list').innerHTML = '';
			} else {
				// console.log(files);
				const fileList = document.createElement('div');
				fileList.classList.add('file__list');
				
				element.closest('.file').appendChild(fileList);
			}

			document.querySelector('body').addEventListener('click', function(event) {
				if (event.target.classList.contains('file__del')) {
					e.target.files = delete_file(e.target.files, event.target.dataset.index);
					event.target.closest('.file__icon').remove();
				}
			});

			function sizeConverter(size) {
				var fSExt = new Array('Байт', 'Кб', 'Мб', 'Гб'),
				i=0;while(size>900){size/=1024;i++;}
				var exactSize = (Math.round(size*100)/100)+' '+fSExt[i];
                // console.log('FILE SIZE = ',exactSize);
				return exactSize;
			}

			//generate file list
			files.forEach((el,index) => {
				// console.log(el);
				let fileElement = document.createElement('div');
				fileElement.classList.add('file__icon')
				fileElement.innerHTML = `
					<div class="file__info"></div>
					<div class="file__del" data-index=${index}>Удалить</div>
				`;
				fileElement.querySelector('.file__info').innerHTML = `
				<span class="file__name">${el.name}</span>
				<span class="file__size">${sizeConverter(el.size)}</span>
				`;
				document.querySelector('.file__list').appendChild(fileElement)
			})
		})
	
	
	
	
	}

	

	// function removeFile(index){
	// 	var attachments = document.getElementById("attachment").files; // <-- reference your file input here
	// 	var fileBuffer = new DataTransfer();
	
	// 	// append the file list to an array iteratively
	// 	for (let i = 0; i < attachments.length; i++) {
	// 		// Exclude file in specified index
	// 		if (index !== i)
	// 			fileBuffer.items.add(attachments[i]);
	// 	}
		
	// 	// Assign buffer to file input
	// 	document.getElementById("attachment").files = fileBuffer.files; // <-- according to your file input reference
	// }
)};
/*Клик вне открытых элементов*/
document.addEventListener('mousedown', (event) => {
  if (modals) {
    const modalOutside = event.composedPath().includes(document.querySelector('.modal'));
    if (document.querySelector('.modal.active')) {
      if (!modalOutside) {
        document.querySelector(".page__body").classList.toggle('modal-opened');
        modals.forEach(el => el.classList.remove('active'))
      }
    }
  }
})


/*------------------------------------------------------ Модальное окно и всё что с ним связано*/
const modals = document.querySelectorAll('.modal');
function modalWindow() {  
  const body = document.querySelector('.page__body');
  
  const modalClose = document.querySelectorAll('.modal__close');
  const request = document.querySelectorAll('[data-modal]');

  /* Отслеживание клика на ESC */
  window.onkeydown = function( event ) {
    if ( event.keyCode == 27 ) {
      body.classList.remove('modal-opened','modal-success', 'chat-opened');
      modals.forEach(el => {
        el.classList.remove('active');
      })
    }
  };

  /* Отслеживание на открытие окна при клике на кнопку request */
  request.forEach(el => {
    el.addEventListener('click', (e) => {
      window.event.preventDefault();
      e.preventDefault;
      
      if(document.querySelector(`.modal_${el.dataset.modal}`)) {
        body.classList.toggle('modal-opened');
        document.querySelector(`.modal_${el.dataset.modal}`).classList.add('active');
      } else {
        alert('Модальное окно отсутствует')
      }

    })
  })

  /* Клик на кнопку закрытия */
  modalClose.forEach(function(el) {
    el.addEventListener('click', () => {
      body.classList.remove('modal-opened','modal-success','chat-opened');
      modals.forEach(el => {
        el.classList.remove('active');
      })
    })
  })
}
if (document.querySelector('.modal')) {
  modalWindow();
};
function selectDropdown () {
    const selects = [...document.querySelectorAll('.select-dropdown')];
    selects.forEach(function(select) {
      select.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
          console.log('focus')
          this.classList.add('active');
        } else {
          this.classList.remove('active');
          console.log('unfocus')
        }
      })
      select.addEventListener('focusout', function(event){
        console.log('unfocus');
        this.classList.remove('active');
      })
    })
}

if (document.querySelector('.select-dropdown')) {
    selectDropdown();
};
/*Слайдер базы знаний*/

const knowlageSlider = new Swiper(".section_view_knowlage .knowlageSlider", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        prevEl: ".section_view_knowlage .control__prew",
        nextEl: ".section_view_knowlage .control__next",
    },
    pagination: {
        el: ".section_view_knowlage .control__pagination",
    },
    breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 3,
        },
      },

    on: {
        afterInit() {
            function tabs() {
                let tabs = document.querySelectorAll('.section_view_knowlage .tabs__item');
                let items = document.querySelectorAll('.section_view_knowlage .item');
                let wrapper = document.querySelector('.knowlageSlider .swiper-wrapper');
                console.log(tabs.length > 0);

                if (tabs.length > 0) {
                    tabs.forEach(tab => {
                        tab.addEventListener('click', function() {
                            let emptyCount = 0;
                            tabs.forEach(el => el.classList.remove('active'));
                            document.querySelector('.section_view_knowlage .section__tabs').classList.remove('empty', 'small');
                            this.classList.toggle('active');
                            if (this.dataset.id === 'all') {
                                items.forEach(item => item.style.display = 'flex');
                            } else {
                                items.forEach(item => {
                                    if (item.dataset.cat === this.dataset.id){
                                        item.style.display = 'flex'
                                    } else {
                                        item.style.display = 'none';
                                        emptyCount += 1;
                                        
                                    }
                                });
                            }
                            knowlageSlider.updateSlides();
                            emptyCount === knowlageSlider.slides.length ? wrapper.closest('.section__tabs').classList.add('empty') : null;
                            knowlageSlider.snapGrid.length > 1 ? null : document.querySelector('.section_view_knowlage .section__tabs').classList.add('small');
                            knowlageSlider.slideTo(0, 300);
                        })
                    })
                }
            }

            tabs();
        },
    },
});






    
       ;

/*------------------------------------------------------Маска телефона */

{let [...phones] = document.querySelectorAll('[type=tel]')
let phonesMaskOptions = {
  mask: '+{7}(#00) 000-00-00',
 
  definitions: {
      '#': /[01234569]/
  },
  lazy: false,
  placeholderChar: ' '
    
};
phones.forEach(function (element) {
    IMask(element, phonesMaskOptions);
});}
/*-------------------------------------------------------*/


/*Автоматическая высота TEXTAREA по содержимому*/
function textAreaAdjust(element) {
  element.style.height = "1px";
  element.style.height = (25+element.scrollHeight)+"px";
}

/* 100vh on mobiles */

let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});


/* ---------------------- плавный скролл при клике на якорь */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/* --------------------------------------------------------- */


/* ---------------------- проверка форм */
const forms = [...document.querySelectorAll('form')];

if (forms) {
  forms.forEach(function(el) {
    el.addEventListener('submit', function(e) {
		e.preventDefault();
		let [...inputs] = el.querySelectorAll('input:not([type="file"]), textarea');
		let errsMsg = document.querySelectorAll('.err-msg');
		let errs = document.querySelectorAll('.err');
			errs.forEach(el => el.classList.remove('err'));
			errsMsg.forEach(el => el.remove());

		if (!inputs.every((v) => validate(v)) > 0) {
			e.preventDefault;
			inputs.forEach(el => {
			if (el.value == null || el.value == "") {
				el.classList.add('err');
				let div = document.createElement('div');
				div.classList.add('err-msg');
				div.textContent = 'Пожалуйста, заполните данное поле'; 
				el.parentNode.insertBefore(div, el.nextSibling);
			}
			})
			return false;
			// error;
		} else {
			// success();
			// return true;
			el.submit();
		}
		})
  })
}
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function validate(el) {
  if (el.value == null || el.value == "") {
    return false;
  }
  return true;
}
function success() {
	// Событие, если форма заполнена
	//   document.querySelector('.page__body').classList.add('modal-success');
}

/* --------------------------------------------------------- */




/* ---------------------- списки базы знаний */
const baseLists = document.querySelectorAll('.section_view_base .item__list');
const baseListsMaxCount = 6;

if (baseLists) {
	baseLists.forEach(function(list) {
		let listItems = [...list.querySelectorAll("li")];
		listItems.forEach((el, index) => {
			index > baseListsMaxCount - 1 ? el.classList.add('overflow') : null;
		})
		let listItemsCount = listItems.length;
		if (listItemsCount > baseListsMaxCount) {
			let more = document.createElement('div');
			more.classList.add('item__more');
			more.innerText = `Ещё ${listItemsCount - baseListsMaxCount}`;
			insertAfter(list, more)
		};
	})
}


const baseListMore = document.querySelectorAll('.section_view_base .item__more');

if (baseListMore) {
	baseListMore.forEach(more => {
		more.addEventListener('click', function() {
			this.closest('.section__item').classList.toggle('full');
		})
	})
}

/* --------------------------------------------------------- */



/* ---------------------- популярные материалы */
const popularMore = document.querySelector('.section_view_popular .section__more > *');

if (popularMore) {
	popularMore.addEventListener('click', function() {
		this.closest('.section_view_popular').classList.toggle('open');
	})
}



/* --------------------------------------------------------- */

/* ---------------------- пункты меню */
const menuItems = document.querySelectorAll('.section_view_nav .item');

if (menuItems) {
	menuItems.forEach(menuEl => {
		menuEl.addEventListener('click', function(e) {
			if(document.body.clientWidth < 991) {
				e.preventDefault();
				this.closest('.section__item').classList.toggle('open');
				// alert('123')
			}
			
		})
	})
}
/* --------------------------------------------------------- */


/* ---------------------- fancybox для изображений статьи */
const articleBody = document.querySelector('.article__body');
const articleImages = articleBody.querySelectorAll('img');

if (articleImages) {
	articleImages.forEach(image=> {
		image.dataset.fancybox = 'article';
	})
}


/* ---------------------- генерация правого меню для статьи */

const articleHeaders = articleBody.querySelectorAll('h3');

if (articleHeaders.length) {
	articleHeaders.forEach((el, id) => {
		// console.log(el, `anchor${id}`);
		el.setAttribute('id', `anchor${id}`);
		let newMenuItem = document.createElement('a');
		newMenuItem.text = el.textContent.replace(/(\r\n|\n|\r)/gm, "");
		newMenuItem.setAttribute('href', `#anchor${id}`)
		newMenuItem.classList.add("el");
		// console.log(newMenuItem)
		rightMenu.append(newMenuItem)
	})
	/* --------------------------------------------------------- */
}


if (document.querySelector('.section__right')) {
	document.querySelectorAll('.section__right a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
	
			// document.querySelector(this.getAttribute('href')).scrollIntoView({
			//     behavior: 'smooth',
			// 	block: "center",
			// });
	
			let id = anchor.getAttribute("href").slice(1);
			let yOffset = (document.querySelector('.header').offsetHeight + 20) * -1; 
			let element = document.getElementById(id);
			let y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
			window.scrollTo({top: y, behavior: 'smooth'});
	
	
		});
	});
}
