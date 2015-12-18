---
title: Moving From Pico To Metalsmith
description: Just a short update about the recent website change
author: Florian Schrofner
date: 2014-12-05
tags: goingFOSS,web
template: post.hbt
---

Probably most (or all) of you people didn't even recognize the changes I've made in the last few months, but the website now switched to a different CMS under the hood.  
In fact it isn't really using a CMS anymore, but a static site generator called [metalsmith](http://metalsmith.io/).


The CMS I was using before, was called [Pico](http://picocms.org/) and it actually served me quite well, but I still had some issues with it.  
One of these issues isn't actually Pico's fault and most likely even a reason to go for Pico to some: Pico is using PHP.  
Don't get me wrong, PHP can be great, but in my case it just seems a bit overpowered (I'm just trying to host some static sites) and can even add a bit of insecurity to the whole webserver.  

Another issue was that it was way too cumbersome to enhance Pico's functionalities.  
The recommended way of making a blog, was to write the PHP script yourself (to be fair, they provide the whole script on their website). I somehow never managed to get it just the way i wanted it to be.  

And finally the most important issue, that actually motivated me to do the whole site over again after I had just finished it: Pico is dead.  

###Pico's dead, baby

I didn't really want to believe it, after I had just put so much work into my website, but I somehow knew that it was true.  
After the next few months i tried to slowly switch my CMS, while still keeping an eye on Pico's development.  
The original Pico developers [dev7studios](http://dev7studios.com/) have dropped development completely and are now putting Pico into the arms of the community.
But there doesn't seem to be anyone who's really willing to keep this project alive. They just changed the Github account that manages the repository, moved the website to a different domain and changed the licence text, keeping anything else untouched.  
This has been the situation for about 7 months now and I don't really expect it to change soon.

###Metalsmith to the rescue

After my decision to switch to a new CMS was final, I quickly discovered that a static site generator would perfectly fit my needs.  
Some hours of research later, I made metalsmith the static site generator of my choice, and I haven't been disappointed yet.  
Metalsmith uses a pretty interesting approach to make it the best fit for nearly everyone's needs: it's completely pluggable.

That means that metalsmith, the core itself, only provides an API to work on a bunch of files and the rest is provided by different plugins.  
This website for example uses plugins like handlebars (templating engine), markdown (to parse markdown files), permalinks (to organize the link structure), convert (to convert images for different resolutions) and tags (to provide tag functionality for blog posts).  
These plugins are either coded by the original metalsmith authors, or by any other individual that cares to enhance metalsmith.  
Another great advantage (for me) in comparison to Pico is that metalsmith uses NodeJs and therefor Javascript, which I am at least a bit familiar with.  

All in all metalsmith seems like the ideal solution to me and I hope it does not die as fast as Pico.. but even when it dies, it's not really dead then, since once the site is generated, it will stay online and won't break unexpectedly (which you can't guarantee for a PHP script).  


###TL;DR
The upgrade from the dying Pico to the flexible metalsmith is now complete.  
My website will now be generated by a static site generator and doesn't depend on PHP anymore.  

Since the new way allows me to structure my code pretty nicely, i also opened up a public mercurial repository, containing the buildscript for my website.
Maybe someone struggeling with metalsmith will find it useful to have a glance at an actually working site. I don't really expect that this will happen, but it doesn't hurt to make it public either (still have to add licences though).  
You can find the source code [here](https://bitbucket.org/FlorianSchrofner/flosch.at/).
