## 21-2학기 졸업프로젝트(Web Cam을 이용해 눈깜빡임 인식을 통한 알림 웹서비스)


### 구조
![Structure](./image/SW구조(09.12).PNG)
___
### React

* Firebase를 통해 계정 생성
* 웹캠 영상 받아서 Flask 서버로 이미지 전송
* 판독된 정보를 Firebase에 저장
* 일정 주기로 눈깜빡임이 발생하지 않을 시 알림전송


### Flask
* React서버에서 이미지를 받아 OpenCV로 이미지 전처리
* dlib을 이용해서 (얼굴, 눈) 탐색 후 Keras 로 생성한 판독 모델을 통해 눈깜박임 여부 판독
* 판독 결과를 React서버로 보냄

___

진행 일지

날짜|내역
---|---|
<span style="color:red">09.12</span>| Git repository 생성, Flask에서 판독한 이미지 React로 전송 한 후에 웹페이지에 보이기