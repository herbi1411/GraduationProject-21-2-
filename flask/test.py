import cv2
import numpy as np
from imutils import face_utils
import base64


img = cv2.imread("./image/21-43-59-042570.jpg",cv2.IMREAD_COLOR)
jpg_img = cv2.imencode(".jpg",img)
b64_string = base64.b64encode(jpg_img[1]).decode('utf-8')
print(b64_string)

header = "data:image/jpg;base64,"
f = open("test.txt","w")
f.write(header + b64_string)


# s = base64.b64encode(img) #.decode('utf-8')
# f = open("test.txt","wb")
# f.write(s)


