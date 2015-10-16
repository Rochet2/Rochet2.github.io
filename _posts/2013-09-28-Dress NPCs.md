---
title: Dress NPCs

images:
    - /images/dressnpcs/rs5sD3W2i.jpg
    - /images/dressnpcs/rsAFJC3xL.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_220229.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_220603.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_221003.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_222611.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_222656.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_223026.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_224553.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_224643.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_224659.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_224734.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_224815.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_224826.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_224859.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_225107.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_225354.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_225623.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_225632.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_225732.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_225809.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_230035.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_230327.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_230519.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_230631.jpg
    - /images/dressnpcs/rsWoWScrnShot_031115_230910.jpg

videos:
    - https://www.youtube.com/embed/tZe8rJsdkmg?list=PL5CF7437D71BB0795

downloads:
    - <a target="_blank" href="https://github.com/Rochet2/TrinityCore/blob/dressnpcs/src/server/scripts/Custom/DressNPCs/" class="download button" onClick="ga('send', 'event', 'Download', 'click', 'Dress NPCs TrinityCore 3.3.5');">TrinityCore 3.3.5</a>
    - <a target="_blank" href="https://github.com/Rochet2/TrinityCore/blob/dressnpcs_6.x/src/server/scripts/Custom/DressNPCs/" class="download button" onClick="ga('send', 'event', 'Download', 'click', 'Dress NPCs TrinityCore 6.x');">TrinityCore 6.x</a>
---

Dress NPCs is a C++ core modification which allows you to equip armor items on NPCs **without using any client side patches or DBC editing**.  
You can also choose the facial features and hair as well as race and gender for the NPC.  
The outfits are created in the database, so no recompiling is required after installing the core modification.  
You can use item entries as well as displayIds when making the outfits, whichever is more convenient.  
The equipped items provide no armor or other effects for the creatures - the armor is only a visual effect.

The outfits are assigned to a creature through the modelId columns like normal models.  
Since the server allow you to use multiple modelIds on a single NPC, you can also use multiple outfits as well. Mixed use of outfits and modelids is also possible.

In the video below I am using wow modelviewer to build up a specific transmogrification set from a forum and then I use the set through DB with a creature and show how it looks ingame.  
Do note that this was my first test so the video contains a few bloopers.  
The images are from a server project by Valkryst, which is using Dress NPCs.
