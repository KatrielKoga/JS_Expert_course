IMAGE_URL="https://static.wikia.nocookie.net/mkwikia/images/e/ee/Predator_render.png"
BACKGROUND_URL="https://wallpapercave.com/wp/wp1822724.jpg"


curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"
autocannon --renderStatusCodes -c10 "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"