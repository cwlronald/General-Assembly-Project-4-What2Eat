
# What2Eat?

## Introduction

Link to website: https://whattwoeat.herokuapp.com/

Alas, the finale of 12 weeks of blood, sweat and tears. Its a bittersweet moment but all good things must come to and end eventually. 

I would not say that this app is the cumulation of everything that I have learnt over the past 12 weeks, but rather, its a reflection of how I like to build things. I like building things that are simple and work well. I would rather go 100% on a 50% product than 50% on a 100% product (if that makes any sense). Adding on the time constraints of this project, I thought it would be the best to build it this way.

The premise of this app is simple: You're hungry but your indecisive nature is causing you to be undecided on what to eat, causing you to further starve and wilt away? Then just use What2Eat! Simply enter your location, the genre of the food you might be craving for, and the price range. If you really have no idea what to eat, just enter the location and search away.

## Code breakdown
Django + React + GoogleMaps API. This code was actually alot simpler than my second and third project as the GoogleMaps API did alot of the heavy lifting. The base version only consists of a single app on django and one component on react. The second version (because of the project requirements) has the ability to create user accounts and view/edit the user's profile + log restaurants as favorites as well as the number of times visited. It uses a postgres database. Honestly could have just built it on Django but i wanted to get some practice in.

## Biggest challenges (descending order)
### Django 
Prior to this, we spent slightly under a week learning django, whereas we had almsot an entire two weeks with node. It was very challenging at the start due to being unfamiliar with the framework. The most challenging part was understanding and getting the user authentication to work (although its a very small part of this project) with a react front end. It was 80% of the pain but only 20% of the final product.

### CSS
Nothing much has changed on this front, still not where I hopped to be at with it. This is made worse by the fact that I do not really have a good eye for design. But I am really hoping to get better. First impressions on a product is everything


## Post Mortem
# Approach and Process
- What in my process and approach to this project would I do differently next time?
I would probably have chose a more complicated project that did not require me to use authentication. I completed the base app within about two days with the help of google and youtube (basically google)

- What in my process and approach to this project went well that I would repeat next time?
Sticking to my philosophy of making simple things that work. Any person checking out my portfolio would not bother spending too much time to figure out how each of my apps work or fiddle with it (yes im talking about you). I was quite disheartened when I saw that some of my coursemates were not able to finish what they intended as their products were too complicated for the current knowledge we had


# Screenshot
![Alt text](client/public/project_screenshot.PNG?raw=true "Title")