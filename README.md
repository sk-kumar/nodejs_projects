# URL Shortner 
## Overview
URL shortening is used to create shorter aliases for long URLs. We call these shortened aliases “short links.” Users are redirected to the original URL when they hit these short links. 

### POST /url/shorten
- Create a short URL for an original url recieved in the request body.

### GET /:urlCode
- Redirect to the original URL corresponding