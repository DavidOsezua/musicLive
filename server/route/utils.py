import requests

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Referrer": "https://findmelivemusic.com/",
}


def getLatLngFromAddress(address):

    url = f"https://api.opencagedata.com/geocode/v1/json?q={address}&pretty=1&key=597ee2a96bc74ff6831f428356224397"
    try:

        res = requests.get(url, headers=headers)

        data = res.json()

        if len(data["results"]) == 0:
            return

        info = data["results"][0]
        return info["geometry"]

    except Exception as e:
        print(e)
        return None
