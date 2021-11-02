<h1 align="center">
    Challenge 3-4
</h1>
<h4 align="center">
  Uma implementação "irritante" de um sistema para resolver o jogo da memória da <a href="https://wiki.pokexgames.com/index.php/Unown_Challenges#Desafio_4_.28Jogo_da_mem.C3.B3ria.29">"challenge" 3-4</a>.
</h4>
<p align="center">
  <img alt="Preview do sistema" src="https://i.imgur.com/U0aC4qz.png">
</p>

## O problema

Minha memória é um lixo, ponto. Então eu tive que pensar em um jeito de passar esse "challenge" sem depender da minha memória.

## A solução

Para fazer isso, eu criei um sistema que o usuário tem que tirar "screeshots" das cartas no jogo, e o sistema recria o tabuleiro e quando o usuário clicar em uma carta, o sistema deve mostrar a ele aonde o outro par esta.

## Requisitos

- [PokeXGames](https://www.pokexgames.com/#/home)
- [Node JS](https://nodejs.org/en/)
- [Autohotkey](https://www.autohotkey.com/) [opcional]

## Observações sobre as "screenshots"

Então, eu usei o comando `Windows + PrintScreen` no Windows para tirar as "screenshots" e salvar elas diretamente na pasta `C:/Users/XXXX/Pictures/Screenshots/`.

Eu acho que seria possível usar um programa ou outro sistema para fazer basicamente a mesma coisa, tirar uma "screenshot" e salvar em uma pasta.

Para fazer o ato de tirar "screenshots" mais fácil, eu fiz um "remap" simples com o [Autohotkey](https://www.autohotkey.com/) para mapear a tecla `Space` para `Windows + PrintScreen`. Isto é opcional, mas é muito, MUITO útil para usar este sistema.

Agora, para tirar as "screenshots" no jogo, você terá que seguir uma ordem **ESPECÍFICA**!

1. Vá para a direita da carta superior esquerda, abra ela e a carta de baixo, e então [tira a "screenshot"](https://i.imgur.com/zkm2XO4.png).
2. Agora continue indo para baixo e tirando as "screenshots" até que você chegue nas 2 últimas cartas da primeira coluna, sempre se mantendo na direita da carta mais acima que você vai abrir, como mostrado na primeira imagem acima.
3. Quando você terminar a primeira coluna, faça a mesma coisa com a segunda, mas indo de [baixo para cima nas cartas](https://i.imgur.com/QePAy1K.png).
4. Continue fazendo isso, indo de cima para baixo e então de baixo para cima, até que você chegue na última coluna.
5. Na última coluna, você terá que fazer o mesmo, mas mantendo-se na [esquerda das cartas](https://i.imgur.com/aTPhYgE.png), em vez da direita. Eu escolhi fazer isso porque você não pode ficar à direita dessas cartas no jogo da memória do TC.

**OBS¹:** Ao tirar as "screenshots", sempre tente manter o personagem voltado para o norte ou sul, porque, caso contrário, partes do personagem podem aparecer nas images das cartas, o que pode fazer com que o `sistema de correspondência de imagem` erre o par correto! Pode ser um pouco diferente dependendo da "outfit" do personagem, mas sempre tome cuidado com isso!

_**OBS²:** Após cada tentativa, **DELETE** todas as imagems da tentativa!_

## Observação sobre a primeira tentativa do código

Este código foi testado usando as seguintes resoluções de tela: 1920x1080 e 2560x1080, eu não posso garantir que ele irá funcionar em nenhuma outra resolução, porque não consegui pensar em uma maneira universal de pegar as cartas de uma screenshot, então eu tive que achar os valores manualmente e colocar eles no código, `index.js`.

Digo isso, eu aconselho você a testar o código primeiro no Jogo da Memória do Trade Center (TC). Você pode ir lá, iniciar o jogo da memória, seguir as instruções descritas abaixo na seção `Como usar` e então, se as cartas não estiverem aparecendo corretamente no tabuleiro da página web, você pode ir no `index.js` e brincar com os valores dentro da variável `BASE_CROP_VALUES` até que tudo funcione corretamente. Você só precisa tirar as screenshots **1 vez**, depois disso você pode deslogar do jogo e começar a brincar com os números, o código vai regenerar as imagens cortadas.

## Como usar

1. Clone o repositório:

```bash
git clone https://github.com/nogenem/Pxg-Challenges-Helpers.git
```

2. Copie os arquivos para a pasta `C:/Users/XXXX/Pictures/Screenshots/`

```bash
cp ./Pxg-Challenges-Helpers/Challenge_3-4/* C:/Users/XXXX/Pictures/Screenshots/
```

3. Entre na pasta correta

```bash
cd C:/Users/XXXX/Pictures/Screenshots/
```

4. Se ja tiver imagens na pasta, delete/mova-as!

5. Instale as dependências e inicie o sistema

```bash
yarn install
yarn start
```

6. Tire todas as "screenshots" necessárias, como descrito em `Observações sobre as "screenshots"`

7. Abra o website [http://localhost:3000](http://localhost:3000) e você deve ver o tabuleiro com todas as cartas, se algo deu errado, tente novamente ;p

8. Agora, clique em uma carta e o sistema deve mostrar o par correto, então você só precisa achar ambas as cartas no "challenge". Continue fazendo isso até o final ;p

**OBS:** Se você olhar a carta inferior direita, você verá que tem um candelabro la que pode ou não fazer o `sistema de correspondência de imagem` errar o par correto, então eu sugiro deixar esta carta para o final.
