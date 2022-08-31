# Payback — a fully-featured e-commerce store

![screenshot of the homepage](/public/images/self/home.png)

## Table of contents

- [Description](#description)
- [Features](#features)
  - [Messenger](#messenger)
  - [Buying products](#buying-products)
  - [Selling products](#selling-products)
  - [Leaving reviews](#leaving-reviews)
  - [Authentication](#authentication)
- [License](#license)

---

## Description

Payback is an e-commerce site where people can [buy](#buying-products) and [sell](#selling-products) products. Users can communicate with each other using build-in [messenger](#messenger). To understand how reliable a seller is, users can view all [reviews](#leaving-reviews) about that particular seller (a review can be left only after the product has been purchased).  
Initially, access to the site is read-only. Users must [authenticate](#authentication) in order to perform any actions, such as buying or selling products.

> _**Disclaimer**: Payback is a pet project. All users and products presented on the site are not real, their photos, descriptions, etc. are obtained from public APIs.  
> The payment system is working in test mode._

---

## Features

### Messenger

You can communicate with other users directly on the site.

#### To create a chat with someone:

1. [Sign in](#to-sign-in)
2. Go to the page of the user with whom you want to create a chat. Let's say it's [user #11]  
   ![screenshot of the user page](/public/images/self/user.png)
3. Click "Write a message"

If everything goes well, you will be redirected to the chat page  
![screenshot of the chat page](/public/images/self/chat.png)  
After that, you can type a message in the text field and click on the blue arrow to send it.  
![screenshot of the chat with a message](/public/images/self/chat-with-message.png)  
If your interlocutor writes a message, you will see it in real time.  
![screenshot of the chat with two messages](/public/images/self/chat-with-two-messages.png)  
A list of all chats is available on the [chats page].  
![screenshot of the chats page](/public/images/self/chats.png)

---

### Buying products

The payment system works in test mode, so the real payment won't be made. You can buy a product just for proof of concept.

#### To buy a product:

1. [Sign in](#to-sign-in)
2. Go to the page of the product that you want to buy. Let's say it's [product #35]  
   ![screenshot of the product page](/public/images/self/product.png)
3. Click "Buy" and follow the instructions provided above the "Buy" button to make a test payment

If everything goes well, you will be prompted to [leave a review](#to-leave-a-review). From now on, this product is sold. The balance of the user who put this product up for sale will be increased by the price of the product minus service charges.  
![screenshot of a sold product](/public/images/self/sold-product.png)

---

### Selling products

You can put your own product up for sale so other users can buy it.

#### To put your product up for sale:

1. [Sign in](#to-sign-in)
2. Go to [sell page]
3. Specify product information:
   1. Select a category by clicking on it  
      ![screenshot of categories](/public/images/self/sell-step-categories.png)
   2. Upload a photo of your product by clicking "Upload". After the photo uploads, a "Continue" button appears. Click it to proceed.
      ![screenshot of upload photo](/public/images/self/sell-step-photo.png)
   3. Specify a title (optional), then click "Continue"
      ![screenshot of title](/public/images/self/sell-step-title.png)
   4. Specify a description (optional), then click "Continue"
      ![screenshot of description](/public/images/self/sell-step-description.png)
   5. Specify a price, then click "Continue"
      ![screenshot of price](/public/images/self/sell-step-price.png)
   6. Select a product status by clicking on the appropriate button. If you want premium status, please refer to the [buying products](#buying-products) section for more information about how to make a payment  
      ![screenshot of product statuses](/public/images/self/sell-step-status.png)

If everything goes well, you will be redirected to the [profile page] and your product will appear here. If your product has a premium status, it will also appear on the [home page].  
![screenshot of the uploaded product](/public/images/self/uploaded-product.png)

---

### Leaving reviews

After buying a product, you can leave a review about it and about the seller.

#### To leave a review:

1. [Buy a product](#to-buy-a-product)
2. After the review modal appears, enter your review text and select how many stars you want to give to the seller (for example, if I want to give 4 stars, I click on the fourth star)  
   ![screenshot of a review](/public/images/self/review.png)
3. Click "Submit"

If everything goes well, the review will be created. You can find it by clicking the "reviews" link on the seller's page.  
![screenshot of all reviews](/public/images/self/all-reviews.png)

---

### Authentication

Anyone can view home page, category page, product page, user page and review page. But if you want to buy products, sell products or create a chat with someone, you first must sign in.

#### To sign in:

1. Go to [sign in page]  
   ![screenshot of the sign in page](/public/images/self/signin.png)
2. Click on one of the auth providers
3. Follow the steps required to authenticate with the selected auth provider

If everything goes well, you will be redirected to the [profile page].  
![screenshot of the profile page](/public/images/self/profile.png)

#### To sign out:

1. Go to [profile page]
2. Click "Options"
3. Click "Sign out"

## License

Payback is available under the [MIT license](https://opensource.org/licenses/MIT). Payback also includes external libraries that are available under a variety of licenses.

<!-- keys -->

[home page]: https://payback-store.vercel.app
[sign in page]: https://payback-store.vercel.app/profile/signIn
[profile page]: https://payback-store.vercel.app/profile/products
[user #11]: https://payback-store.vercel.app/users/11
[chats page]: https://payback-store.vercel.app/chats
[product #35]: https://payback-store.vercel.app/products/35
[sell page]: https://payback-store.vercel.app/sell
