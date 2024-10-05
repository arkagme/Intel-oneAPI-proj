# Intel-oneAPI Hackathon Project
Project submitted for Intel-oneAPI hackathon
Oct 4-5, 2024

# Problem Statement:
Over 27% of people aged above the age of 27 suffer from hear disease. Such people often require a daily ECG(Electro Cardio Gram) reading to be taken and sent to their doctors for review. The problem lies in the 
natural tendancy of elderly people to not perform tests properly or neglecting neccesary proceedures. This oversight is usually the result of the technology being too complicated and time consuming for elderly people to deal with.

# Tasks:
1. The main issue with the mentioned problem statement is ease of use. Hence a way of addressing a simple way to make readings must be done
2. Doctors need not review every single patient in a scenario where the majority of patients show no abnormality. Hence, an automated system for making a innovative yet strong judgement is required
3. Elderly people tend to not report/forget to send their reports on time and promptly and properly. Hence, a solution where this can be bypassed will ensure consistency.
4. Finally the user interface of the proposed solution must be as simple as possible.

# Our Solution:
1.Our solution is strongly inspired from smart watches capable of making heart rate predictions. We use motion amplification to obtain the ECG graph and the corresponding CSV time series data of the patient with just a video clip of them infront of a camera. This technology is similar to the ones used in smart watches to make heart rate predictions. 
2. Our webapp allows users to login  and upload a minimum of 30-second video and get a ECG graph generated which is used to predict any heart abnormalities. We have a secure login system with a email and password. This account is used to store all your past ECG graph datas and predictions.
3. All user data stays confidential. This is achieved by the usage of Firebase - Realtime Database, Authentication and Storage.
4. We made use of Intels OneAPI Toolkit to build a predictive model to detect if the the patient has a heart anomoly.
  ![image](https://github.com/user-attachments/assets/a477a3b9-a18e-4e3a-9032-154ea8b685d2)

5. For data processing, we used a MinMaxScaler and feature extraction with the scikit-learn-intelex module for faster computations.
6. Finally our simplified front end completes our solution with all neccessary data being passed and forwarded to their respective destinations.

How to clone:


We are hosting a website locally where you can upload a minimum of 30-second video and get a ECG graph generated which is used to predict any heart abnormalities. We have a secure login system with a email and password. This account is used to store all your past ECG graph datas and predictions.
All user data stays confidential. This is achieved by the usage of Firebase - Realtime Database, Authentication and Storage.

We use motion amplification to obtain the ECG graph and the corresponding ccv time series data of the patient. This technology is similar to the ones used in smart watches to make heart rate predictions. Our application tries to replicate such a prediction using a person's face. With the ECG we get, we classify the heart behaviour as Normal or not. The model used is a Random Forest classifier which has been boosted using the daal4py module.
For data processing, we used a MinMaxScaler and feature extraction with the scikit-learn-intelex module for faster computations.
Finally, for the final prediction, we use a voting mechanism between the prediction made for the 3 leads in our ECG to determine the final prediction.
Once all backend processes have completed, the results are reflected in the frontend.
