---
title: NFC Tag Filesharing
description: A convenient way of sharing files over nfc tags.
template: project.hbt
---

#NFC Tag Filesharing  
<div id="platforms">Platforms: <i class="fa fa-android fa-lg"></i> </div>  
<div id="cover">
    <a href="/images/projects/screens/nfc/header/nfc_select_file.png" title="Select file">
        <img data-interchange="[/images/projects/screens/nfc/header/nfc_select_file_small.png, (default)], [/images/projects/screens/nfc/header/nfc_select_file_large.png, (large)]"/>
    </a>
    <a href="/images/projects/screens/nfc/header/nfc_uploading.png" title="Uploading a file">
        <img data-interchange="[/images/projects/screens/nfc/header/nfc_uploading_small.png, (default)], [/images/projects/screens/nfc/header/nfc_uploading_large.png, (large)]"/>
    </a>
</div>

<br/>

This application is kind of an experiment, it's goal is to make sharing files over NFC tags as easy and convenient as possible.  
The user just needs to select a file and put his phone onto the tag, the application will do the rest.  

If the tag is big enough the file is saved directly on the tag, otherwise the dropbox API is used to automatically upload it to the cloud, generate a link and then write the link instead.  

This was my first (kind of) serious Android project and although I can't imagine a lot of real use-cases for it,
I still think it was a neat project.  

If you're interested you can check it out at the links below!  
(The app isn't available on Google Play yet, but most certainly will be in the near future)  

###Screenshots
<div id="screens">
    <a href="/images/projects/screens/nfc/gallery/nfc_start.png" title="Start writing">
        <img src="/images/projects/screens/nfc/gallery/nfc_start_thumb.png" alt="start writing"/>
    </a>
    <a href="/images/projects/screens/nfc/gallery/nfc_uploaded.png" title="Upload complete">
        <img src="/images/projects/screens/nfc/gallery/nfc_uploaded_thumb.png" alt="upload complete"/>
    </a>
    <a href="/images/projects/screens/nfc/gallery/nfc_written.png" title="Tag written">
        <img src="/images/projects/screens/nfc/gallery/nfc_written_thumb.png" alt="tag written"/>
    </a>
</div>  

<br/>

<a href="https://bitbucket.org/FlorianSchrofner/nfctagfilesharing/downloads" class="button">Get App</a>
<a href="https://bitbucket.org/FlorianSchrofner/nfctagfilesharing" class="button">Get Source</a>