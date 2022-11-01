
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

![-react](https://user-images.githubusercontent.com/103979716/199112745-aea0ac0c-11f8-40be-a7b5-08300e3945a5.svg)
![-javascript](https://user-images.githubusercontent.com/103979716/199113123-04739e76-7bf1-4ce8-a19b-68228ebabc5f.svg)
![-html](https://user-images.githubusercontent.com/103979716/199112762-f1a7148b-d9f0-4b29-9dbb-e9a350500eed.svg)
![-css](https://user-images.githubusercontent.com/103979716/199112767-d74e12db-3d6a-47af-8f86-5de024e16bd0.svg)
![-nodejs](https://user-images.githubusercontent.com/103979716/199112775-d22e679c-6f36-4d6c-bff8-0d9e7f6561ff.svg)
![-express](https://user-images.githubusercontent.com/103979716/199112780-09753942-cce4-4551-9b0d-91d391a5d0fe.svg)
![-aws (1)](https://user-images.githubusercontent.com/103979716/199112786-2dcb17cd-0650-478b-b1f7-aa7394574d8c.svg)

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

