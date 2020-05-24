# Werkstuk-DevIV
Wanneer er geen filters zijn aangeduid moeten alle items weergegeven worden. Indien er één of meerdere filters worden aangdeduid mogen enkel de items weergegeven worden die matchen bij deze filter. Er zijn 2 verschillende soorten filters: filters op basis van doelgroep en filters op basis van genre.

Er zijn 4 situaties:
- Geen filters aangeduid
- Filters van beide soorten aangeduid
- Enkel doelgroepfilters aangeduid
- Enkel genrefilters aangeduid

Indien er geen filters zijn aangeduid worden alle items weergegeven.
Indien beide filters zijn aangeduid zal ik eerst alle items filteren op doelgroep en vervolgens op genre.
Indien enkel doelgroepfilters zijn aangeduid filter ik enkel op doelgroep.
Indien enkel genrefilters zijn aangeduid filter ik enkel op genre.

Indien de items overeenkomen met de filters worden ze weergegeven.

Ik zal volgende functies nodig hebben:
-Een functie die de data ophaald
-Een functie die de aangeduide filters ophaald
-Een functie die de deze filters naar een array pushed
-Een functie die de filters vergelijkt met de items
-En tot slotte een functie die de juiste items append aan de html