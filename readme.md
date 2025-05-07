logic is important! if you hard code the favorites, then
logged in and logged out has to be two seperate files/
have logic to handle that. i just suppressed entirely


--had to manually silence all variations of the word favorite
suppress favorites
restructure log in logic
>> can not see favorites button before logged in
>>if logged in shouldn't see log in
>>if logged out shouldn't be able to add to favorites
>>once logged out session has to be cleared so everything goes away
>>make sure no button is showing at times when it logically shouldnt


team-compatible structure
All of our pages share the same HTML scaffolding (nav, login/favorites UI, carousel controls)
and the same CSS classes/IDs, so I never had to alter anyone else’s markup or styling—just dropped my scripts into the existing framework.
Uniform logic, different data
Both desertdaze.js and campfloggnaw.js follow the exact same flow:
DOMContentLoaded → getFestival()
fetch(“festivals.json”) → .find(…) by festival name
showStage(0) in a single container, with Prev/Next handlers
per-item favorites buttons tied to localStorage.loggedIn
login/logout form toggles + “My favorites” link visibility
JSON-specific adaptations
Desert Daze: multi-day selector plus two media rows (images vs. videos), hard-coded captions per stage-and-day.
Camp Flog Gnaw: no day selector (single-day), one row of up to two images, captions keyed only by stage name.
Result
The user experience and underlying code patterns remain identical across both pages, yet each page reads and renders its JSON entry in the way that makes sense for its festival.