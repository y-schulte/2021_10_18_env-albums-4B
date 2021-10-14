# Express - Linking a React Frontend with a Node/Express Backend - Part 4

Now we have made some good progress with the album app, let's see how else we can improve it...

---

### Task 1

**Solve the problem we just identified, where the app says the current user added ALL the albums in the DB.** 

As we discussed, a good solution would be to change the data structure, so that making a POST request to the "/new-album" endpoint would add a new album to the **user's own** array of albums, instead of a general array.

A good start may be to delete the current contents of `db.json` and add a different starting data structure!

**Hint:** Next, in the "/new-album" route you will need to find the currently logged in user in the DB. An array method may help you here...

**Hint 2**: You may also wish to make changes to your `fetch` request to help you with this...

---

### Task 2

**Practice what we live coded before the break, by making sure a user cannot add the same album to their "albums" array twice.**

**Hint:** You will have to:

1. Check the user to see if the new album already exists in their "albums" array, and
2. If the new album does not already exist, make sure it is added to the user's "albums" array, so that the DB file is updated.

There are lots of ways to do this, but the array methods `.find()` and `.map()` may be helpful. However, other array methods are also available, if you prefer!

---

### Task 3

**Note that when the user first logs in, they cannot see the albums they already added in the past. Change this!**

**Hint:** You do not have to add a new endpoint here, just change how a current one is working (on both the frontend and backend...)

---

## Small Extras - only if you finish early!

Do as many of these as you can before your time is up!

1. Remove the "added by..." part of each album's listing on the page - our changes mean we don't need it any more!
2. Add a small `div` at the top of the page which says "Welcome " and then the user's username. No styling needed!
3. Add some placeholder text if the user has no albums added when they log in (for example, "You have no saved albums at the moment!")
4. Think of any extra features, big or small, you could add to the project if you had time. Pick the best/most interesting one and plan (only verbally!) how you could theoretically implement it. **No need for any extra coding here**, just an approximate plan for how your new feature could be achieved!