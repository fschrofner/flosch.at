---
title: Notify
description: Timed, cross-device reminders for Android.
layout: project.hbt
---

#Notify
<div id="platforms">Platforms:  <i class="fa fa-android fa-lg"></i></div>
<div id="cover">
    <a href="/images/projects/screens/notify/header/notify_main.png" title="Main activity">
        <img data-interchange="[/images/projects/screens/notify/header/notify_main_small.png, (default)], [/images/projects/screens/notify/header/notify_main_large.png, (large)]"/>
    </a>
    <a href="/images/projects/screens/notify/header/notify_edit.png" title="Editing a notification">
        <img data-interchange="[/images/projects/screens/notify/header/notify_edit_small.png, (default)], [/images/projects/screens/notify/header/notify_edit_large.png, (large)]"/>
    </a>
</div>  

<br/>

Notify is an app that allows you to create and manage reminders, which will then be synced across multiple devices.  

The whole synchronisation is done by using a file-based approach for the reminders and sharing them using a cloud-service (in our case we decided to use Google Drive, since it didn't require any
additional application on Android phones).  
After a new reminder has been created and uploaded, a push notification will be send to all other devices that registered with our [Aerogear push server](http://aerogear.org/push/) and share an
alias with the device (the alias being the mail address used for Google Drive).  
When receiving a push, all files will be updated from the server and reread, therefor changing existing reminders is also possible (using a really trivial version numbering system).  

The whole application is more of a proof-of-concept, that you can build synchronisation around a file-based cloud service, rather than a really usable app.  
One of the reasons you can't use it in production is that Aerogear doesn't normally allow endusers to send push notification to other users,
therefor there is no other key than the masterkey, which you should, of course, not hand out to anybody.
We had to build a [broker server](https://bitbucket.org/FlorianSchrofner/notify-broker) around that, which does nothing more than
accepting requests without authentication and then forwarding them to the real push server using the masterkey.  
If Aerogear allows endusers to send push notifications too someday, we might think about continuing the project, but it doesn't make much sense now..  
So for now you can only check out the source code, but no real app.

###Screenshots
<div id="screens">
    <a href="/images/projects/screens/notify/gallery/notify_account_selection.png" title="Selecting the Google account to sync with">
        <img src="/images/projects/screens/notify/gallery/notify_account_selection_thumb.png" alt="select account"/>
    </a>
    <a href="/images/projects/screens/notify/gallery/notify_date_picker.png" title="Picking a date">
        <img src="/images/projects/screens/notify/gallery/notify_date_picker_thumb.png" alt="pick a date"/>
    </a>
    <a href="/images/projects/screens/notify/gallery/notify_notification.png" title="Notification">
        <img src="/images/projects/screens/notify/gallery/notify_notification_thumb.png" alt="notification"/>
    </a>
    <a href="/images/projects/screens/notify/gallery/notify_side_menu.png" title="Using the side menu">
        <img src="/images/projects/screens/notify/gallery/notify_side_menu_thumb.png" alt="side menu"/>
    </a>
</div>  

<br/>

<a href="https://bitbucket.org/fschrofner/notify" class="warning hollow button">Get Source</a>
