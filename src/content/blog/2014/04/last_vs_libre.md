---
title: Why Libre.fm Can Not Replace Last.fm Yet
description: My thoughts about the libre.fm webservice
author: Florian Schrofner
date: 2014-04-24
tags: goingFOSS,web
template: post.hbt
---

Since I've started using Linux I'm constantly trying to switch to open source 
alternatives whenever it's possible. One of the services I really rely on, but haven't replaced with a matching open source counterpart is [Last.fm](http://last.fm). I totally love the features Last.fm offers: most of all I enjoy the music tracking & statistics and I dig its recommendation system.  

But since I'm more or less forcing myself to switch to free software, I was always on the lookout for a new replacement. About 2 years ago I found [Libre.fm](http://libre.fm/) which seems to be exactly what I wanted, but being still under heavy development it appeared to be kind of half-baked.  
Nevertheless trying to test it out, I wanted to transfer my <span data-tooltip class="has-tip" title="The name Last.fm gave their music-logs">scrobbles</span> from Last.fm to Libre.fm, which wasn't as easy as I thought. Being pretty unexperienced when it comes to terminal programs and (in this case) Python, I somehow couldn't do it. As I didn't want to start from zero I just stayed with Last.fm and lived happily after.  

Or atleast I would have, but about a month ago I somehow ended up on Libre.fm again. They kind of relaunched their whole service, or I thougt so, as they've got a completely new (and in my opinion pretty nice) design. So I decided to give it another try and this time I was able to transfer the major part (~1000 tracks were lost) of my scrobbles from Last.fm to Libre.fm using [lastscrape](http://encukou.github.io/lastscrape-gui/).  
The initial enthusiasm was gone pretty quickly as I saw that Libre.fm still can't display the album cover of any of the artists I scrobbled.  

<div id="pictures">
    <a href="/blog/2014/04/librefm_main.png" title="Libre.fm Main">
        <img src="/blog/2014/04/librefm_main_thumb.png" alt="Libre.fm Main">
    </a>
</div>  
<br/>
But that's just an unimportant feature after all. So I checked out the other stuff that Libre.fm allowed me to do.. which wasn't much. The stats are preset, you can't configure anything about them.  

So you've got to live with:  

- your most played artists in the last 6 months  
- your top tracks in the last 6 months  
- your scrobbles per day for the last month.  
    
That's what really bothers me about their service, as I'm mostly interested in the overall statistics and not in the statistics for the last 6 months. Also I'd really like a download button for my data, since they already promote that the data belongs to the user and that you can take it with you when you leave (a download button would be rather nice to import your playcounts into a new music manager).  
What I approve of is that they provide you the option to forward every scrobble to Last.fm, which is a pretty kind step of them, they are playing far nicer than Last.fm here.

Long story short: I'm really interested in switching to Libre.fm, when they finally manage to provide some nice presented, extensive statistics.
