---
title: Transmogrification

videos:
    - https://www.youtube.com/embed/xtH4ogz12iM?list=PL5CF7437D71BB0795
    - https://www.youtube.com/embed/wuNWPqiIm64?list=PL5CF7437D71BB0795
    - https://www.youtube.com/embed/PIheEziN_dY?list=PL5CF7437D71BB0795

downloads:
    - <a target="_blank" class="download button" href="https://github.com/Rochet2/TrinityCore/blob/transmog/src/server/scripts/Custom/Transmog/" onClick="ga('send', 'event', 'Download', 'click', 'Transmogrification TrinityCore Blizzlike');">TrinityCore 3.3.5 - Blizzlike</a>
    - <a target="_blank" class="download button" href="https://github.com/Rochet2/TrinityCore/blob/transmogvendor/src/server/scripts/Custom/TransmogDisplayVendor/" onClick="ga('send', 'event', 'Download', 'click', 'Transmogrification TrinityCore TransmogVendor');">TrinityCore 3.3.5 - TransmogVendor</a>
---

Transmogrification allows you to change the appearance of an item to another item - **on 3.3.5 patch**.  
You can use any item in your bags as source of display, as long as it fits the requirements.  
The UI has been redesigned with icons and quality coloured item names to enhance the usability and viewing experience.  

The system is dynamicly using all items - custom items work by default.  
The transmogrifier includes a system to store a limited amount of outfits.  
The default requirements are blizzlike however you can easily change these settings through configuration files.  
You can also tweak many other settings through the configuration file without recompiling.  

**There are two different transmogrification scripts here. One has blizzlike way of using your own items and the other - transmog vendor - has all item displays in it from the database.**

#### Default rules:
* The character must be able to equip both items.  
* Only uncommon (green), rare (blue), heirloom (pale gold) or epic (purple) items may be transmogrified (exceptions: a select few of these items will be prevented from being used to transmogrify if they are deemed inappropriate).  
 * Heirlooms and Account Bound items can be transmogrified.  
 * Heirlooms and Account Bound items can be used to transmogrify.   
* At this point only appearance can be changed, stats can not be moved.  
* Items must share the same armor type (examples: plate for plate, cloth for cloth).  
* Weapons must be the same weapon type (exceptions: Guns, Crossbows, or Bows).  
* Guns, Crossbows, and Bows can be used to transmogrify Guns, Crossbows, or Bows.  
* Main hand weapons can only be used to transmogrify Main hand weapons.  
* Off-hand weapons can only be used to transmogrify Off-hand weapons.  
* One handed weapons can be used to transmogrify a Main hand or Off-hand weapon.  
* Using an item for transmogrify makes it soulbound. An item that was still tradable with other eligible players (raid loot and the likes) will of course also no longer be tradable.  
* Using an item for transmogrify makes it non-refundable.  
* Legendary items cannot be transmogrified.  
* Legendary items cannot be used to transmogrify.  
* Fishing Poles cannot be transmogrified. Frowney  
* Fishing Poles cannot be used to transmogrify. Frowney  
* Mailing an item strips its transmogrification.  
* Placing an item in Void Storage strips its transmogrification.  
* Vendoring an item strips its transmogrification.  
* The displayed enchant will be that of the currently equipped item.  
* There may be individual items that are excluded from being transmogrified on the basis that they were originally added to the game as absurdities. (examples: a weapon that looks like a fish, or a chest piece that is invisible...)   
