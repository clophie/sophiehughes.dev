# CTEC3905 Assignment

The website created for this coursework has four pages. The first is an 'About' page of which the 
notable feature is a table that is populated with data from the [Jikan unofficial MyAnimeList API](https://jikan.moe/). 
The second is a page that features a table listing some past projects, with links to said projects. 
When hovered over, two of the projects change the image on the left of the page to be a screenshot
of said project. The third page is a photo gallery which has a similar hover over effect to the
Projects page, which each image able to be viewed larger if hovered over. The gallery uses CSS grid
for it's layout. The final page is a small 'To Do' app, which utilises local storage in order to 
store the inputted tasks. Tasks can bechecked off by clicking them, and then deleted by clicking 
them again. A task can be marked as important in order to appear bold and underlined.

There are also links to GitHub and LinkedIn in the upper right of the page which persist across all
pages.

The site is responsive and the navigation bar changes to a hamburger menu on mobile.

## Bugs (That I have noticed)

If two tasks have the same text, deleting one will delete them both.

Sometimes the string stored in local storage will end up with a comma at the start, this will cause 
the To Do list to break, requiring a cache clear/clearing local storage to fix.

At some screen widths, the background image doesn't vertically stretch to fit the page,
which I believe it should be doing because of 'background-size: cover'.

## Resources

W3Schools was used extensively for [CSS](https://www.w3schools.com/css/default.asp), 
[HTML](https://www.w3schools.com/html/default.asp) and 
[Javascript](https://www.w3schools.com/js/default.asp) help and was my main resource. 

The [Mozilla MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) were 
handy, particularly when dealing with local storage.

I used the [CSS-Tricks guide to CSS grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
when implementing the photo gallery.

The following Code Pens were useful in helping me figure out how I wanted to implement certain 
features;

[Menu Toggle](https://codepen.io/msanc/pen/BjYrjE)

[Local Storage To Do](https://codepen.io/ragzor/pen/xGrJrg?editors=0110)

And of course, many Stack Overflow questions which are now buried in my browser history (and probably
too numerous to list).



