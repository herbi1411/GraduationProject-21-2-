import cv2, dlib
import numpy as np
from imutils import face_utils
from keras.models import load_model


class imageDiscriminator:
    def __init__(self):
        self.IMG_SIZE = (34, 26)
        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor('models/shape_predictor_68_face_landmarks.dat')
        self.model = load_model('models/2021_09_09_21_02_36.h5')
        # self.model.summary()


    def crop_eye(self, gray, eye_points):
        x1, y1 = np.amin(eye_points, axis=0)
        x2, y2 = np.amax(eye_points, axis=0)
        cx, cy = (x1 + x2) / 2, (y1 + y2) / 2

        w = (x2 - x1) * 1.2
        h = w * self.IMG_SIZE[1] / self.IMG_SIZE[0]

        margin_x, margin_y = w / 2, h / 2

        min_x, min_y = int(cx - margin_x), int(cy - margin_y)
        max_x, max_y = int(cx + margin_x), int(cy + margin_y)

        eye_rect = np.rint([min_x, min_y, max_x, max_y]).astype(np.int)

        eye_img = gray[eye_rect[1]:eye_rect[3], eye_rect[0]:eye_rect[2]]

        return eye_img, eye_rect

    def discriminate(self, img):
        img_ori = cv2.resize(img, dsize=(0, 0), fx=1, fy=1)
        img = img_ori.copy()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        faces = self.detector(gray)
        pred_l = 1
        pred_r = 1

        for face in faces:
            shapes = self.predictor(gray, face)
            shapes = face_utils.shape_to_np(shapes)

            # 좌우 반전 X
            eye_img_l, eye_rect_l = self.crop_eye(gray, eye_points=shapes[36:42])
            eye_img_r, eye_rect_r = self.crop_eye(gray, eye_points=shapes[42:48])


            eye_img_l = cv2.resize(eye_img_l, dsize=self.IMG_SIZE)
            eye_img_r = cv2.resize(eye_img_r, dsize=self.IMG_SIZE)

            # switch
            temp = eye_img_l
            eye_img_l = eye_img_r
            eye_img_r = temp

            temp = eye_rect_l
            eye_rect_l = eye_rect_r
            eye_rect_r = temp


            eye_input_l = eye_img_l.copy().reshape((1, self.IMG_SIZE[1], self.IMG_SIZE[0], 1)).astype(np.float32) / 255.
            eye_input_r = eye_img_r.copy().reshape((1, self.IMG_SIZE[1], self.IMG_SIZE[0], 1)).astype(np.float32) / 255.

            pred_l = self.model.predict(eye_input_l)
            pred_r = self.model.predict(eye_input_r)

            # visualize
            state_l = 'O %.1f' if pred_l > 0.1 else '- %.1f'
            state_r = 'O %.1f' if pred_r > 0.1 else '- %.1f'

            state_l = state_l % pred_l
            state_r = state_r % pred_r

            # cv2.rectangle(img, pt1=tuple(eye_rect_l[0:2]), pt2=tuple(eye_rect_l[2:4]), color=(255,255,255), thickness=2)
            # cv2.rectangle(img, pt1=tuple(eye_rect_r[0:2]), pt2=tuple(eye_rect_r[2:4]), color=(255,255,255), thickness=2)

            color_l = (255, 0, 0)
            color_r = (255, 0, 0)
            if pred_l > 0.1:
                color_l = (0, 0, 255)
            if pred_r > 0.1:
                color_r = (0, 0, 255)
            cv2.rectangle(img, pt1=tuple(eye_rect_l[0:2]), pt2=tuple(eye_rect_l[2:4]), color=color_l, thickness=2)
            cv2.rectangle(img, pt1=tuple(eye_rect_r[0:2]), pt2=tuple(eye_rect_r[2:4]), color=color_r, thickness=2)

            cv2.putText(img, state_l, tuple(eye_rect_l[0:2]), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            cv2.putText(img, state_r, tuple(eye_rect_r[0:2]), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            # cv2.imshow('result', img)
        return (img, pred_l < 0.1 and pred_r < 0.1)