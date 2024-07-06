export default function ehUmCPF(campo) {
  // Método de strings em JS que substitui partes de uma string por outra string
  const cpf = campo.value.replace(/\.|-/g, "");
  if (
    validaNumerosRepetidos(cpf) ||
    validaPrimeiroDigito(cpf) ||
    validaSegundoDigito(cpf)
  ) {
    // console.log("CPF não existe!");
    campo.setCustomValidity("Esse CPF não é válido!");
  } //else {
  //   console.log("CPF válido!");
  // }
}

function validaNumerosRepetidos(cpf) {
  const numerosRepetidos = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
  ];
  // includes verifica se está na lista informada (é num repetido)
  return numerosRepetidos.includes(cpf);
}

function validaPrimeiroDigito(cpf) {
  let soma = 0;
  let multiplicador = 10;
  for (let tamanho = 0; tamanho < 9; tamanho++) {
    soma += cpf[tamanho] * multiplicador;
    multiplicador--;
  }
  soma = (soma * 10) % 11;
  if (soma == 10 || soma == 11) {
    soma = 0;
  }
  // console.log(soma);
  return soma != cpf[9];
}

function validaSegundoDigito(cpf) {
  let soma = 0;
  let multiplicador = 11;
  for (let tamanho = 0; tamanho < 10; tamanho++) {
    soma += cpf[tamanho] * multiplicador;
    multiplicador--;
  }
  soma = (soma * 10) % 11;
  if (soma == 10 || soma == 11) {
    soma = 0;
  }
  // console.log(soma);
  return soma != cpf[10];
}

/* FUNCIONAMENTO DO REPLACE: replace(/\.|-/g, "")
.replace(): Este é um método de strings em JavaScript que substitui partes de uma string por outra string, com base em um padrão de correspondência (expressão regular) ou uma string.

/\.|-/g: Aqui, /\.|-/g é a expressão regular usada como padrão de correspondência para identificar o que deve ser substituído na string campo.value.

/: Delimita o início da expressão regular.
\.: Este é um padrão que corresponde a um ponto (.). O ponto é um caractere especial em expressões regulares, então é preciso usar a barra invertida (\) para escapá-lo e torná-lo literal.
|: O operador | dentro da expressão regular funciona como uma alternância, permitindo que a expressão regular combine qualquer um dos padrões à esquerda ou à direita dele.
-: Simplesmente corresponde ao caractere hífen.
/: Delimita o final da expressão regular.
g: Esta é uma flag da expressão regular que significa "global". Ela indica que a substituição deve ser feita em todas as ocorrências do padrão na string, não apenas na primeira.
"": Isso é o que substitui os caracteres correspondidos pela expressão regular. Neste caso, estamos substituindo todos os pontos (.) e hifens (-) por uma string vazia (""). Em outras palavras, estamos removendo esses caracteres da string campo.value.
*/

/* FUNCIONAMENTO DA VALIDAÇÃO DO CPF
*Quando estamos construindo um sistema que requer a criação de contas como o MoniBank, devemos validar os dados em que há essa possibilidade. Usando JavaScript nativamente, sem o uso de bibliotecas, iremos precisar fazer algumas validações manualmente, como a validação do CPF. Vamos atuar em cima de um CPF base que será: 451.055.040-54. A fórmula do cálculo dos últimos dígitos verificadores de um CPF é dividida em:

* Primeiro dígito
Para descobrir o primeiro dígito você precisará recolher os 9 primeiros dígitos do CPF e multiplicar por números de 10 a 2, sequencialmente.

Valor do CPF	4	5	1	0	5	5	0	4	0
Sequência	10	9	8	7	6	5	4	3	2
Resultado	40	45	8	0	30	25	0	12	0
Depois, precisamos somar todos os valores gerados nas multiplicações entre eles. Nesse caso, a soma resultou em 160. Em seguida, será necessário multiplicar essa soma por 10, que gerou o número 1600. Por fim, devemos considerar o módulo da divisão desse número. Nesse caso, 1600 dividido por 11 é igual a 145, com resto 5.

Antes de decidirmos que esse é o primeiro dígito verificador, precisamos testar uma condição: Se o resultado for 10 ou 11, precisaremos zera-lo. Como não é o caso, podemos confirmar que 5 realmente é o primeiro dígito verificador do CPF base.

* Segundo dígito
Para descobrir o segundo dígito você precisará recolher os 10 primeiros dígitos do CPF e multiplicar por números de 11 a 2, sequencialmente.

Valor do CPF	4	5	1	0	5	5	0	4	0	5
Sequência	11	10	9	8	7	6	5	4	3	2
Resultado	44	50	9	0	35	30	0	16	0	10
Em seguida, será necessário somar todos os valores resultados pela multiplicação novamente, e essa soma resultou em 194. Depois, multiplicamos essa soma por 10, para encontrar o valor 1940. Ao final, chegamos na etapa de encontrar o módulo da divisão por 11. Nesse caso, 1940 dividido por 11 é igual a 176, com resto 4.

Novamente, precisamos verificar para caso o resultado for 10 ou 11, será necessário zera-lo. Como novamente não foi o caso, o número 4 realmente é o segundo dígito verificador do CPF base.

Então, o cálculo completo do dígito verificador do CPF base 451.055.040-54 é:
Primeiro dígito: 5
Segundo dígito: 4
*/

/**Para te ajudar, pense em como você fez a alteração para o CPF e a data de nascimento. Você utilizou o método setCustomValidity(). Lembre-se que o customError é um tipo de erro que você define manualmente, e o setCustomValidity() é o método que permite você definir a mensagem de erro personalizada.
  
-É normal se sentir um pouco confuso! 🤔
-A mensagem de erro personalizada não aparece diretamente no HTML, mas sim no Validity State do campo.
-O setCustomValidity() é como se você estivesse "marcando" o campo com uma mensagem específica, dizendo que ele está inválido por um motivo particular.
-Essa mensagem é usada internamente pelo navegador para indicar o erro, e pode ser acessada por meio do atributo validity.customError do campo.
-Então, mesmo que a mensagem não apareça diretamente na tela, ela está sendo utilizada para indicar o erro e pode ser acessada para fins de validação e feedback. 😉
*/
