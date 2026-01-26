Tags: OSR, game stuff, generators

# One Roll Varied Treasure Hoard
Glittering gold, creatures, trinkets and baubles, paid for in blood

Luke Gearings [Wolves Upon the Coast](https://lukegearing.itch.io/wolves-upon-the-coast-grand-campaign) is a masterpiece that changed the way I think about hexcrawls and sandbox D&D games.

An interesting little PDF that came with my purchase of the campaign was [&&&&&&&&& Treasure](https://lukegearing.itch.io/treasure), a "mutant cousin to the Little Brown Books" that contains a multitude of interesting old-school magic items along with Gearings expert prose.

The most novel thing in this PDF, for me, was the table of d100 goods. On each hoard table, you roll the total value of goods in the hoard. Then you roll on this secondary table to figure out which types of goods are present.

This is super rad, creating varied treasure hoards. But it also takes a while, and I'm lazy. I also love rolling handfuls of dice. So I took these ideas and put together a generator!

## One Roll Hoard Generator
Before rolling dice, determine the **treasure multipler** that will be used. I suggest 100 for weak monsters, 500 for strong ones and 1000 for legendary beasts.

1. Grab a handful of dice, around 8-12. Roll them.
3. Arrange the dice in a line and split the line in half.
4. To find the total value of coins in the hoard, add up the left half of the line and multiply the total by your treasure multiplier.
5. Finding the value of goods in the hoard is a little more involved. Each die in the right half of the line is a "goods die."
    - To find the value of the good, multiply the number on the goods die by the hoards treasure multiplier.
    - To find the type of good, add the two dice to goods die's left and use it on the following table. If the total is greater than 20 it wraps around to the bottom of the table.

|   |   |
|---|---|
| 1 | Little Creatures |
| 2 | Ivory / Ambergris |
| 3 | Paintings |
| 4 | Sculptures |
| 5 | Leather / Hides / Skins |
| 6 | Ale / Wine / Spirits |
| 7 | Jewellery |
| 8 | Ingots |
| 9 | Teeth / Claws / Bones |
| 10 | Feathers / Scales / Antennae |
| 11 | Gemstones |
| 12 | Textiles |
| 13 | Historical Artifacts |
| 14 | Furniture |
| 15 | Rare Wood / Flora |
| 16 | Tapestries |
| 17 | Manuscripts / Books / Scripture |
| 18 | Holy Idols / Religious Instruments |
| 19 | Glassware |
| 20 | Eggs / Young |

6. Any dice that rolled their maximum value are magic items. The type of magic item is determined by this table:

| | |
|--|--|
| d4 | Potion |
| d6 | Scroll or Map |
| d8, d10 | Misc. Item |
| d12 | Weapon or Armor | 
| d20 | Something crazy |

Okay, I lied a little bit about this being one roll. When you know the type of magic item, determine what the item actually is from your source of choice (might I suggest [&&&&&&&&& Treasure](https://lukegearing.itch.io/treasure)?)

## Sample Hoard
- Dice Rolled: 10
- Treasure Multiplier: $500  
- Rolls: d8(2), d20(4), d20(1), d20(16), d20(9) | d4(4), d6(1), d6(1), d10(5), d6(2)  
- Total Value: $22500  
- Coins: $16000  
- Goods: $6500
    - Historical Artifacts: $500
    - Ivory / Ambergris: $2500
    - Leather / Hides / Skins: $2500
    - Ale / Wine / Spirits: $1000
- Magic Items: 1
    - Potion: 1

## Statistical Analysis ☝️🤓
I am abysmal at statistics so I didn't even try. I wrote a little python script to generate 10 million treasure hoards and observed the results. These are probably somewhat close to the percent values, but I can't be sure.

All tests were performed by rolling 10 dice randomly, each selected from a uniform sample. It's kind of like picking up a die, rolling it, and putting it back 10 times.

I also need to note that the percentage values are **not** the percentage chance you will get this item when you roll the dice, but rather the percentage of _all hoards_ in the 10 million that contained at least 1 of this good or magic item. I don't know how you would go about determining the chance of getting a given item when you roll, that's a statistical challenge I am not equipped for.

- Total Average Value: $25001  
- Average Coin Value: $11250
- Average Goods Value: $13750
- Amount of hoards containing:
    - Potion: 346236 (34.623599999999996%)
    - Scroll / Map: 245604 (24.560399999999998%)
    - Misc. Item: 317519 (31.7519%)
    - Weapon / Armor: 130580 (13.058%)
    - Something Crazy!: 80215 (8.0215%)

![Percentage of Hoards containing Magic Item](/_images/hoards%20anal%20magic%20item.png)

- Amount of hoards containing:
    1. Little Creatures, 79953, (7.995299999999999%)
    2. Ivory / Ambergris, 138475, (13.847499999999998%)
    3. Paintings, 195249, (19.524900000000002%)
    4. Sculptures, 252747, (25.2747%)
    5. Leather / Hides / Skins, 307626, (30.762600000000003%)
    6. Ale / Wine / Spirits, 325240, (32.524%)
    7. Jewellery, 342504, (34.2504%)
    8. Ingots, 336708, (33.6708%)
    9. Teeth / Claws / Bones, 330147, (33.014700000000005%)
    10. Feathers / Scales / Antennae, 309718, (30.971799999999998%)
    11. Gemstones, 290216, (29.021599999999996%)
    12. Textiles, 262376, (26.2376%)
    13. Historical Artifacts, 233899, (23.3899%)
    14. Furniture, 200842, (20.0842%)
    15. Rare Wood / Flora, 167113, (16.7113%)
    16. Tapestries, 144588, (14.4588%)
    17. Manuscripts / Books / Scripture, 119964, (11.9964%)
    18. Holy Idols / Religious Tools, 107104, (10.7104%)
    19. Glassware, 93699, (9.369900000000001%)
    20. Eggs / Young, 86315, (8.6315%)

![Percentage of Hoards containing Good Type](/_images/hoards%20anal.png)

