const inputName = document.getElementById('name');
const inputBirthday = document.getElementById('birthDate');
const inputCpf = document.getElementById('cpf');
const inputPhone = document.getElementById('phone');
const inputCell = document.getElementById('cellphone');
const inputPis = document.getElementById('pis');
const inputCheck = document.getElementById('studies');
const button = document.getElementById('btnSubmit');
const container = document.querySelector('.saida');

class Pessoa {
	constructor(nome, nascimento, CPF, telefone, celular, PIS, estuda) {
		this.nome = nome;
		this.nascimento = nascimento;
		this.cpf = CPF;
		this.telefone = telefone;
		this.celular = celular;
		this.pis = PIS;
		this.estuda = estuda;
	}

	get nome() {

		return this._nome;

	}

	set nome(newName) {
		const nomeUsuario = newName.split(' ');
		const nomeTodo = []
		nomeUsuario.forEach((value) => {
			const primeiraLetra = value.slice(0, 1).toUpperCase();
			const restente = value.slice(1).toLowerCase();
			nomeTodo.push(primeiraLetra + restente)
		});

		this._nome = nomeTodo.join(' ');

	}

	get nascimento() {

		const formato = this._nascimento.split('-');
		formato.reverse()
		return formato.join('/')

	}

	set nascimento(newValue) {
		this._nascimento = newValue

	}

	get cpf() {
		const formato = this._cpf.split('');
		formato.forEach((value, i) => {
			if (i === 3 || i === 7) {
				formato.splice(i, 0, '-')
			}
		});
		formato.forEach((value, i) => {
			if (i === 11) {
				formato.splice(i,0, '-')
			}
		});

		return formato.join('')
	}

	set cpf(newCpf) {
		const formato = newCpf.split('');
		const filtrarNumero = formato.filter((value) => value == Number(value) );

		this._cpf = filtrarNumero.join('');	
	}

	get telefone(){
		const formato = this._telefone.split('');
		formato.forEach((value, i) => {
			if (i === 3) {
				formato.splice(i, 0, ') ')
			}
			if (i === 8) {
				formato.splice(i, 0, '-')
			}
		})

		return formato.join('')
	}

	set telefone(newPhone) {
		const formato = newPhone.split('');
		const filtrarNumero = formato.filter((value) => value == Number(value));
		
		this._telefone = filtrarNumero.join('');	
	}

	get celular(){
		const formato = this._celular.split('');
		formato.unshift('(')
		formato.forEach((value, i) =>{
			if (i === 3) {
				formato.splice(i, 0, ') ')
			}
			if (i === 8) {
				formato.splice(i, 0, '-')
			}
		});

		return formato.join('')
	}

	set celular(newCell){
		const formato = newCell.split('');
		const filtrarNumero = formato.filter((value) => value == Number(value));

		this._celular = filtrarNumero.join('');
	}

	get pis() {
		return this._pis
	}

	set pis(newPis){
		const formato = newPis.split('');
		const filtrarNumero = formato.filter((value) => value == Number(value))

		this._pis = filtrarNumero.join('');
	}

	get estuda() {
		if (this._estuda === true){
			return 'Sim'
		} else{
			return 'Não'
		}
	}

	set estuda(check){
		this._estuda = check
	}
}

function card(usuario){
	const div = document.createElement('div');
	div.classList.add('card');
	const {nome, nascimento, cpf, telefone, celular, pis, estuda} = usuario;

	createParagraph(div, `Nome: ${nome}`);
	createParagraph(div, `Nascimento: ${nascimento}`);
	createParagraph(div, `CPF: ${cpf}`);
	createParagraph(div, `Telefone: ${telefone}`);
	createParagraph(div, `Celular: ${celular}`);
	createParagraph(div, `PIS: ${pis}`);
	createParagraph(div, ` Estudante? ${estuda}`);
	container.appendChild(div);
}

function createParagraph(element, text) {
    const paragraph = document.createElement('p');
    paragraph.innerText = text;

    element.appendChild(paragraph)
}

function createUser() {
    const valores = [inputName.value, inputBirthday.value, inputCpf.value, inputPhone.value, inputCell.value, inputPis.value, inputCheck.checked]
    const user = new Pessoa(...valores);

    return user
}

button.addEventListener('click', (event) => {
    event.preventDefault();

    const user = createUser();
    console.log(user)
    card(user)

	inputName.value = ''
	inputBirthday.value = ''
	inputCpf.value = ''
	inputPhone.value = ''
	inputCell.value = ''
	inputPis.value = ''
	inputCheck.value = ''
})
