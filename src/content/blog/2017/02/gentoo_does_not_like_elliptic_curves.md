---
title: Gentoo does not like elliptic curves
description: My adventures with elliptic curves on Gentoo
author: Florian Schrofner
date: 2017-02-07
tags: goingFOSS, web
layout: post.hbt
---

I recently switched my hosting provider from [HostSailor](https://hostsailor.com/) to [Scaleway](https://www.scaleway.com/) (using their VPS solution). Mostly because of the cheaper prices, as well as because they are Europe based (finally I can pay in Euros!) and the fact that they provide SSD servers instead of normal HDDs, which results in a performance boost. But I also made the switch because of the operating systems they provide, most notably: Arch Linux.  

Unfortunately, though, I had to find out, that their [Arch Linux image](https://github.com/scaleway/image-archlinux) is currently broken and can not be built at the moment. So I figured, I could start with something new and maybe try a new distribution again. I was pretty certain that I do not want a standard release distribution, as the release updates I had to do with my Fedora server really became a pain in the ass. If I ever come back to standard release based distributions, I will certainly look for something with a less frequent release cycle, like CentOS or Debian. But for now I was looking for a rolling release distribution to drive my server. The only distro they provided, that fulfilled that restriction was: Gentoo.  

### Getting into Gentoo
After reading the [Gentoo handbook](https://wiki.gentoo.org/wiki/Handbook:AMD64) to get an overall idea about how to do things, it wasn't actually too complicated to get things running. The update times were, of course, way longer compared to Arch, as Gentoo is a source based distribution (meaning that all packages are most of the time completely built from source), but that isn't actually that much of a put-off for a server system, which is running 24/7 anyway.  

After setting things up, like openssl, openssh, mosh, tmux, emacs, nginx, etc. everything seemed to be working fine, so I started to point my domain towards the new server. I created new certificates using [certbot](https://certbot.eff.org/) for Let's Encrypt and finally I verified if everything is working okay, by issuing a [Qualys SSL Test](https://www.ssllabs.com/ssltest/). That's were things started getting weird.  

Somehow I didn't receive a bad rating on the SSL test, but I could see that a lot of clients were failing to connect at all. Interestingly those, that were able to connect, only used a normal Diffie-Hellman key exchange, instead of the elliptic curve one, although I explicitly placed those right at the beginning of my cipher suite. I also checked the available ciphers with [sslscan](https://github.com/DinoTools/sslscan) and found out, that my server does not provide any elliptic curve suites. Those either failed or were rejected. I checked my nginx configuration again and again, but I couldn't find anything wrong there.  

### Exploring the cause
Doing a lot of research, I finally found the possible cause for my elliptic curve fiasco. As I, and apparently a lot of other people too, didn't know that elliptic curve cryptography is actually [patented](https://en.wikipedia.org/wiki/ECC_patents), I didn't even think about this possibility. The current situation about ECC patents is unclear, so some people handle it differently than others. Most binary Linux distributions seem to include ECC in their openssl binaries by default, that is why you maybe never heard about that issue before.  

Gentoo however, does not include ECC in their binary distributions. "Wait a minute?" You might say. "I thought Gentoo is a source based distribution?" Well, yes it is.. but sometimes it isn't. I didn't know that either, but Gentoo actually uses binary distributions in some cases by default as well. There is a [USE flag](https://wiki.gentoo.org/wiki/USE_flag) called "bindist", which enables binary distributions. This also applies to openssh/openssl and their ciphersuites. So as long as this USE flag is enabled, you won't get any ECC support.  

However, if you build openssl from source, the patents seem to be fine with that. I don't know why, but that seems to be the situation for now.

### Fixing Things
To get things running like normal, it should actually be enough to forbid the "bindist" flag for either openssl/openssh or for the whole system, whatever you prefer. One way this can be done, is by adding "-bindist" to your make.conf and rebuilding those two packages. After I did that, I tried to scan my site again using sslscan. And ECC still did not work.  
I checked my nginx configuration again, restarted it several times and I couldn't figure out what the heck was wrong with it. Finally I had the idea to remerge nginx again, so that it knows that it can use those ciphersuites. Apparently it does so during compile time, not run time. After that I finally got the ECC cipher suites and nearly no client failed to connect in the Qualys test (except the really old ones).  

So Gentoo seems to be working for now, let's see which issue I run into next.
