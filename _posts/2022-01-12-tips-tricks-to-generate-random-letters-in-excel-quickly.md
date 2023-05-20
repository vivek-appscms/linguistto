---
tags: []
categories: []
title: Tips & tricks to generate random letters in excel quickly
layout: post
author: Nikita
image: "/uploads/doqd.png"
comments: false

---
Have you ever been in a position where you needed to generate a random set of letters? You do, after all, need to generate some random alphabets now and then.

Right?

In Excel, you can generate random integers using functions like RAND and RANDBETWEEN, but we don't have something similar for letters.

Today, I'd like to show you an incredible Excel formula trick for generating random letters. The nicest aspect is that it's simple and straightforward to use.

So, what is the Excel formula for generating random letters?

As previously stated, there is no direct feature in Excel that may assist you in generating random letters or alphabets. However, you may develop a formula to generate random letters by combining RANDBETWEEN and CHAR.

If you're looking for a way to generate CAPITAL letters at random, here is the place to go.

For the random letter to be in the capital letter, use 70 and 100 in this formula.

=CHAR(RANDBETWEEN(65,90))

Alternatively, if you wish to generate small random letters, use 97 and 122 in the calculation to make the random letter a capital letter.

**What this formula entails**

Now, let me explain how this method comes up with these letters. First and foremost, you must comprehend that this formula has two parts.

You have the RANDBETWEEN function in the first part, which can produce random numbers for you. Simply enter the lowest and highest numbers, and it will generate a random number from that range. In other words, you'll obtain a random number inside the range as a result.

create letters at random make changes to randbetween

In the second section, you'll find the CHAR function, which can return a specific character when a number is passed to it. That means you must enter a precise integer in the CHAR function for each character. Numbers 65 to 90 denote large characters, while numbers 97 to 122 denote little letters.

If you type 65 into CHAR, you'll get "A," and if you type 97, you'll get "a."

The Bottom Line: RANDBETWEEN returns a random number when any of the following ranges are specified.

Then, for that number, CHAR returns a character.

Finally, there's no doubt that the method you employed above is basic and straightforward to utilize. I've discovered that the ideal usage of this strategy in the real world is to generate random groups for participants depending on the alphabet.