requête de recherche de localité pour Annemasse sur https://maps.openrouteservice.org


https://api.openrouteservice.org/pgeocode/search?
  text=annemasse
  &size=2
  &focus.point.lon=6.430950164794922
  &focus.point.lat=46.087519345973455
  &layers=locality

https://api.openrouteservice.org/pgeocode/search?
  text=annemasse
  &size=1
  &focus.point.lon=6.430950164794922
  &focus.point.lat=46.087519345973455
  &layers=county

https://api.openrouteservice.org/pgeocode/search?
  text=annemasse
  &size=10
  &focus.point.lon=6.430950164794922
  &focus.point.lat=46.087519345973455
  &layers=country,region,macrocounty,macroregion,neighbourhood,borough,street,address,postalcode

https://api.openrouteservice.org/pgeocode/search?
  text=annemasse
  &size=10
  &focus.point.lon=6.430950164794922
  &focus.point.lat=46.087519345973455
  &layers=venue
  &boundary.rect.min_lon=-10.546875000000002
  &boundary.rect.min_lat=38.151837403006766
  &boundary.rect.max_lon=23.4228515625
  &boundary.rect.max_lat=53.028000167735165

clic sur une localité

https://nominatim.openstreetmap.org/search.php?
  polygon_geojson=1
  &format=json
  &country=France
  &city=Annemasse


après avoir indiqué 2 points

https://api.openrouteservice.org/v2/pdirections/cycling-regular/geojson

```json
{
  "coordinates":[[6.463855,46.078868],[6.24563,46.184032]],
  "elevation":true,
  "instructions_format":"html",
  "extra_info":["surface","steepness","waytype"],
  "language":"fr",
  "units":"km",
  "preference":"recommended"
}
```
