import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const listaRespostas = {
    nome: evento.target.elements["nome"].value,
    email: evento.target.elements["email"].value,
    rg: evento.target.elements["rg"].value,
    cpf: evento.target.elements["cpf"].value,
    aniversario: evento.target.elements["aniversario"].value,
  };
  localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
	window.location.href="./abrir-conta-form-2.html"
});

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo)); //“blur” (ativa ao clicar fora)
  campo.addEventListener("invalid", (evento) => evento.preventDefault()); //Prevenir erros no JS
});

const tiposDeErro = [
  "valueMissing", // Erro do tipo: campo vazio
  "typeMismatch", // Erro do tipo: tipo diferente
  "patternMismatch", // Erro do tipo: erro de patern
  "tooShort", // Erro do tipo: quantidade de caracteres diferentes do esperado
  "customError", // Erro do tipo: erros customizados
];

const mensagens = {
  nome: {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válido.",
    tooShort: "Por favor, preencha um nome válido.",
  },
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um e-mail válido.",
    tooShort: "Por favor, preencha um e-mail válido.",
  },
  rg: {
    valueMissing: "O campo de RG não pode estar vazio.",
    patternMismatch: "Por favor, preencha um RG válido.",
    tooShort: "O campo de RG não tem caractéres suficientes.",
  },
  cpf: {
    valueMissing: "O campo de CPF não pode estar vazio.",
    patternMismatch: "Por favor, preencha um CPF válido.",
    customError: "O CPF digitado não existe.",
    tooShort: "O campo de CPF não tem caractéres suficientes.",
  },
  aniversario: {
    valueMissing: "O campo de data de nascimento não pode estar vazio.",
    customError: "Você deve ser maior que 18 anos para se cadastrar.",
  },
  termos: {
    valueMissing: "Você deve aceitar nossos termos antes de continuar.",
  },
};

function verificaCampo(campo) {
  let mensagem = "";
  campo.setCustomValidity(""); //Para limpar campo após corrigir CPF
  if (campo.name == "cpf" && campo.value.length >= 11) {
    ehUmCPF(campo);
  }
  if (campo.name == "aniversario" && campo.value.length >= 10) {
    ehMaiorDeIdade(campo);
  }
  tiposDeErro.forEach((erro) => {
    if (campo.validity[erro]) {
      mensagem = mensagens[campo.name][erro];
      console.log(mensagem);
    }
    // Somente o campo do escopo em específico
    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
    const validadorDeInput = campo.checkValidity();
    // Se não está válido
    if (!validadorDeInput) {
      mensagemErro.textContent = mensagem;
    } else {
      mensagemErro.textContent = "";
    }
  });
  /*True: Tem erro?
		-recupera a mensagem de erro personalizada correspondente a esse campo e esse tipo de erro específico.
		- Por exemplo, se o campo nome tiver o erro valueMissing, a linha acima irá buscar a mensagem 'O campo de nome não pode estar vazio.' no objeto mensagens, pois mensagens['nome']['valueMissing'] é essa mensagem.*/
}

/* Na expressão regular pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}", cada parte tem um significado específico:

\d{3}: Significa que esperamos três dígitos numéricos.
\.?: O ponto (.) é um caractere especial em expressões regulares, então precisamos escapá-lo com uma barra invertida (\). O ponto de interrogação (?) indica que ele pode aparecer zero ou uma vez.
-?: O hífen (-) é um caractere que pode aparecer zero ou uma vez. Não precisa de uma barra invertida antes dele porque não é um caractere especial dentro de uma expressão regular.
\d{2}: Significa que esperamos dois dígitos numéricos.
*/
