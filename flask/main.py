import base64
from datetime import datetime

import cv2
import numpy as np
from flask import Flask, render_template, request, jsonify

from imageDiscriminator import imageDiscriminator

app = Flask(__name__)


@app.route("/")
def index():
    return "Hello World!!"


@app.route("/fileUpload", methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        params = request.get_json()
        sitename_base64_str = params['data'].split(',')[1]
        sitename_bytes = base64.b64decode(sitename_base64_str)
        im_arr = np.frombuffer(sitename_bytes, dtype=np.uint8)
        image = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)

        image, pred = imd.discriminate(image)
        # print(imd.discriminate(image)[1])
        # cv2.waitKey(990)  # 키입력대기
        # cv2.destroyAllWindows()
        # cv2.imwrite("./image/" + datetime.now().strftime('%H-%M-%S-%f') + ".jpg", image)
        # return jsonify({"pred": pred, "data": str(base64.encodebytes(image))})

        header = "data:image/jpg;base64,"
        jpg_img = cv2.imencode(".jpg", image)
        b64_string = header + base64.b64encode(jpg_img[1]).decode('utf-8')
        return jsonify({"pred": bool(pred), "data": b64_string})

if __name__ == "__main__":
    imd = imageDiscriminator()
    app.run(host="0.0.0.0", port=8000)
