const formAdd = document.forms[0];
const contentElem = document.querySelector('#content');
const doneElem = document.querySelector('#done-num');
const cancelledElem = document.querySelector('#cancelled-num');


const get_contentLst = () => JSON.parse(localStorage.getItem('contentLst')) || [];
const get_contentLst_status = () => JSON.parse(localStorage.getItem('contentLst_status')) || {id: 0, okeyLst: 0, closeLst: 0}

const add_deal = deal => localStorage.setItem('contentLst', JSON.stringify([...get_contentLst(), deal]));

const remove_deal = deal =>{
	const new_lst = get_contentLst().filter(elem => elem.id !== deal.id);
	localStorage.setItem('contentLst', JSON.stringify(new_lst));
};

const add_pos_status = ()=>{
	const deals_status = get_contentLst_status()
	deals_status.okeyLst++;
	localStorage.setItem('contentLst_status', JSON.stringify(deals_status));
};

const add_neg_status = ()=>{
	const deals_status = get_contentLst_status()
	deals_status.closeLst++;
	localStorage.setItem('contentLst_status', JSON.stringify(deals_status));
};


const render = function(list){
	const {okeyLst, closeLst} = get_contentLst_status();
	doneElem.innerText = okeyLst;
	cancelledElem.innerText = closeLst;

	contentElem.innerText = '';
	for(let elem of list){
		const divElem = document.createElement('div');
		const titleElem = document.createElement('h1');
		const notesElem = document.createElement('p');
		const okeyElem = document.createElement('div');
		const closeElem = document.createElement('div');
		const barElem = document.createElement('div');


		barElem.append(okeyElem, closeElem)
		divElem.append(titleElem, notesElem, barElem);
		contentElem.append(divElem);

		okeyElem.innerText = '✔'
		closeElem.innerText = '✘';
		titleElem.innerText = elem.title;
		notesElem.innerText = elem.notes;
		divElem.style.background = '#353b48';

		divElem.classList.add('card');
		titleElem.classList.add('title');
		notesElem.classList.add('notes');
		okeyElem.classList.add('okey');
		closeElem.classList.add('close');
		barElem.classList.add('bar');


		okeyElem.addEventListener('click', ()=>{
			add_pos_status();
			remove_deal(elem)
			render(get_contentLst());
		});	
		
		closeElem.addEventListener('click', event=>{
			add_neg_status();
			remove_deal(elem)
			render(get_contentLst());
		});
	};
};

formAdd.addEventListener('submit', event=>{
	event.preventDefault();
	const {title, notes} = event.target;
	if(title.value !== ''){
		const idElem = get_contentLst_status();
		add_deal({
			id: idElem.id,
			title: title.value,
			notes: notes.value,
		});
		idElem.id++;
		localStorage.setItem('contentLst_status', JSON.stringify(idElem));
	}else{
		alert('Значение первого поля пустое!');
	};
	title.value = '';
	notes.value = '';
	render(get_contentLst());
});

render(get_contentLst());