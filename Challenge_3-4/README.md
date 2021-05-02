<h1 align="center">
    Challenge 3-4
</h1>
<h4 align="center">
  An "annoying" implementation of a system to solve the memory game from <a href="https://wiki.pokexgames.com/index.php/Unown_Challenges#Desafio_4_.28Jogo_da_mem.C3.B3ria.29">challenge 3-4</a>.
</h4>
<p align="center">
  <img alt="Preview of the system" src="https://i.imgur.com/U0aC4qz.png">
</p>

## The problem

My memory is trash, period. So i had to think of a way to pass this challenge without depending on my memory. 

## The solution

To do that, i created a system that the user has to take the screenshots of the cards in the game, the system then recreates the board and when the user clicks on one card, the system has to show to the user where the other pair is.

## Requirements
- [PokeXGames](https://www.pokexgames.com/#/home)
- [Node JS](https://nodejs.org/en/)
- [Autohotkey](https://www.autohotkey.com/) [optional]

## Observation about the screenshots

So, i used the command `Windows + PrintScreen` on Windows to take a screenshot and save it directly in the `C:/Users/XXXX/Pictures/Screenshots/` folder.

I think you could use a program or another system to do basicaly the same thing, take a screenshot and save in one folder. 

To make the act of take the screenshots more easy, i made a simple remap with [Autohotkey](https://www.autohotkey.com/) to map the `Space` key to `Windows + PrintScreen`. Its optional, but its very, VERY useful to use this system.

Now, to take the screenshots in the game, you will have to follow a **SPECIFIC** order!
1. Go to the right of the top left card, open it and the card below and then [take the screenshot](https://i.imgur.com/zkm2XO4.png).
2. Now keep going down and taking the screenshots till you get to the last 2 cards of this first collumn, always staying on the right of the top most card that you will open, like in the first image above.
3. When you finish the first collumn, do the same thing on the second, but going from [bottom to top cards](https://i.imgur.com/QePAy1K.png). 
4. Keep doing this, going from top to bottom and then from bottom to top, till you get to the last collumn.
5. On the last collumn, you will do the same, but staying on the [left of the cards](https://i.imgur.com/aTPhYgE.png), instead of the right. I chose to do this here cause you can't stay on the right of these cards in the TC's memory game.

**OBS¹:** When taking the screenshots, always try to make your character face north or south, cause otherwise, parts of the character can appear on the card's image, which can make the `image matching system` miss the right pair! It may be a bit different depending on the character's outfit, but always be careful with this!

_**OBS²:** After every attempt, **DELETE** all images from the attempt!_

## How to use

1. Clone the repository: 
```bash
git clone https://github.com/nogenem/Pxg-Challenges-Helpers.git
```

2. Copy the files to the `C:/Users/XXXX/Pictures/Screenshots/` folder
```bash
cp ./Pxg-Challenges-Helpers/Challenge_3-4/* C:/Users/XXXX/Pictures/Screenshots/
```

3. Enter the right folder
```bash
cd C:/Users/XXXX/Pictures/Screenshots/
```

4. Delete/move all images that are already here, if any

5. Install the dependencies and start the system
 ```bash
yarn install
yarn start
```

6. Take all necessary screenshots, like described in `Observation about the screenshots`
7. Open the website `http://localhost:3000` and you should see the board with all the cards, if something went wrong, try again ;p
8. Now, click on one card and the system should show you the right pair, then you just have to find both cards in the challenge. Keep doing this till the end ;p

**OBS:** If you look at the bottom right card, you will see that there is a candle holder there that may or may not make the `image matching system` miss the right pair, so i would suggest that you leave that to be the last card that you open. 
