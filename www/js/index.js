document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	const form = document.getElementById('form');
	const inputNumber = document.getElementById('number');

	const app = document.getElementById('app');
	const boxResult = document.getElementById('result');
	const txtInfoNumber = document.getElementById('infoNumber');
	const txtPrime = document.getElementById('prime');
	const txtBinary = document.getElementById('binary');
	const txtHexadecimal = document.getElementById('hexadecimal');
	const txtColor = document.getElementById('color');
	const boxColor = document.getElementById('show-color');

	const msgInfoNumber = document.getElementById('msg');

	// Captura ação do usuário ditando no input #number
	inputNumber.addEventListener('keyup', handleUserDigit);

	// Formulário
	form.addEventListener('submit', (event) => {
		event.preventDefault();

		// Valida se o usuário informou um número
		if (inputNumber.value === '') {
			toggleShoMsgInfoNumber(true);
			toggleShowResult(false);
		} else { // Gera e mostra o resultado em tela
			const number = parseInt(inputNumber.value);
			const hexNumber = number.toString(16);

			toggleShowResult(true);

			inputNumber.value = '';

			txtInfoNumber.innerHTML = number;
			txtPrime.innerHTML = isPrime(number) ? 'Sim' : 'Não';
			txtBinary.innerHTML = number.toString(2);
			txtHexadecimal.innerHTML = hexNumber;
			generateHexColor(hexNumber);
		}
	});

	// Lidar com o que o usuário digita
	function handleUserDigit() {
		toggleShoMsgInfoNumber(false);

		// Deixar somente números no imput #number
		value = inputNumber.value.replace(/\D/g, '');
		inputNumber.value = value;
	}

	// verifica se o número é primo
	function isPrime(value) {
		if (value > 1) {
			for (let i = 2; i < value / 2 + 1; i++) {
				if (value % i === 0) return false;
			}
		}

		if (value === 1) return false;

		return true;
	}

	// gerar uma cor hexadecimal com o número informado pelo usuário
	function generateHexColor(value) {
		if (value.length > 5) {
			const color = `#${value.substring(0, 6)}`;
			txtColor.innerHTML = color;
			app.style.background = color;
			boxColor.style.background = color;
		}

		if (value.length < 6) {
			generateHexColor(value + value);
		}
	}

	// Controla a visualização da section #result
	function toggleShowResult(show) {
		boxResult.style.visibility = show ? 'visible' : 'hidden';
		boxResult.style.height = show ? 'auto' : '0px';
	}

	// Controla a visualização da mensagem "Informe um número."
	function toggleShoMsgInfoNumber(show) {
		msgInfoNumber.style.visibility = show ? 'visible' : 'hidden';
		msgInfoNumber.style.height = show ? 'auto' : '0px';
	}
}
