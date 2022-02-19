import base64
import json
import sys
import requests

user_id = sys.argv[2]
api = f'http://10.0.2.15:5000/api/v1/users/{user_id}'
image_file = sys.argv[1]

with open(image_file, "rb") as f:
    im_bytes = f.read()
im_b64 = base64.b64encode(im_bytes).decode("utf8")

headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

payload = json.dumps({"profile_image": im_b64})
response = requests.put(api, data=payload, headers=headers)
try:
    data = response.json()
    print(data)
except requests.exceptions.RequestException:
    print(response.text)
