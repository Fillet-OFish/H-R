
<h1 align="center">
  <br>
  Hack & Reactor
  <br>
</h1>

<h4 align="center">
  <br>
  A minimalistic and sleek design implementation for a modernized eCommerce web browsing experience. 
  <br>
</h4>

<div align="center">
  <img src='https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB' />
  <img src='https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E' />
  <img src='https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white' />
  <img src='https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white' />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/-AWS-232F3E?logo=amazonaws&logoColor=white&style=for-the-badge" />
</div>


## See It In Action
Visit our group presentation <a rel="noopener noreferrer" target="_blank" href='https://docs.google.com/presentation/d/1fxJdcWFcnfD9vaJuwRyJTV67F9eIQu4Fan8WUgba-RY/edit?usp=sharing'> slides </a> to see everything in motion.

## Key Features
* Dark/Light mode
* Realtime interface language changes

## OVERVIEW
![overview-img](https://i.postimg.cc/mBD49LMz/overview.png)

### Features
* An image gallery with interactivity
   * Toggle between an expanded version or a collapsed version by clicking the main gallery photo
* Relevant product information
* Style selection
* Add to cart

## RELATED ITEMS
<p align="center"><img width="1300" alt="related-products" src="https://user-images.githubusercontent.com/102894133/199101605-3993101d-2749-477d-9099-cb1131928077.png">
</p>
<details><summary>See 'your outfit' image</summary>

<p align="center"><img width="1300" alt="your-outfit" src="https://user-images.githubusercontent.com/102894133/199102136-fd4bfdd6-3023-4bae-a807-058be355eecc.png">
</p>
</details>

### Features
* Related items that dynamically generated based on the item currently being viewed
* If an item is clicked on, a modal will appear with a comparison of the features of the current item and the item selected
* A 'Your Outfit' section which allows you to save the currently viewed item into a list that persists while traversing the site


## QUESTIONS & ANSWERS
<p align="center"><img width="1300" alt="qa" src="https://user-images.githubusercontent.com/102894133/199110755-e64bd3e1-b09c-4fed-be5e-2cc1aefc1094.png"></p>

### Features
* Questions and answers loads two new questions at a time when clicking on "Load More Questions"
* Search functionality that filters out questions by title
* Add questions and answers through a unique custom modal form

## RATING & REVIEWS
<p align="center"><img width="1300" alt="reviews" src="https://user-images.githubusercontent.com/102894133/199101162-61b86f1a-9efd-41ab-b4b3-dba8e2450580.png"></p>

## Getting Started
Create a `.env` file that copies the contents of `example.env`:
```
campus='hr-rfp'
TOKENS='add token here'

PORT=3000
```
What you'll need to edit is `TOKENS='add token here'`, replacing the `add token here` with your own github token.

Once completed, run the following commands:
```
 npm run build
 npm run server-dev
```

