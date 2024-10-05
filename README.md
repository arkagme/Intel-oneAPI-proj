
https://github.com/user-attachments/assets/e1af5cfe-58ac-4413-9313-d9821ca3b3ef
# Intel-oneAPI Hackathon Project
Project submitted for Intel-oneAPI hackathon
Oct 4-5, 2024

# Problem Statement:
Over 27% of people aged above the age of 27 suffer from heart disease. Such people often require a daily or regular readings of ECG(Electro Cardio Gram) to be taken and sent to their doctors for review. The problem lies in the natural tendency of elderly people to not perform tests properly or neglecting necessary procedures. This oversight is usually the result of the technology being too complicated, tedious and time consuming for elderly people to deal with.

# Tasks:
1. The main issue with the mentioned problem statement is ease of use. Hence a way of addressing a simple way to make readings must be done.
2. Doctors need not review every single patient in a scenario where the majority of patients show no abnormality. Hence, an automated system for making a innovative yet strong judgement is required.
3. Elderly people tend to not report/forget to send their reports on time and promptly and properly. Hence, a solution where this can be bypassed will ensure consistency.
4. Finally the user interface of the proposed solution must be as simple as possible.

# Our Solution:
1. Our solution is strongly inspired from smart watches capable of making heart rate predictions. We use a motion amplification technique to obtain the ECG graph and the corresponding CSV time series data of the patient with just a video clip of them infront of a camera. This technology is similar to the ones used in smart watches to make heart rate predictions.
2. The motion amplification is a propriety video processing algorithm that detects subtle motions and amplifies it to a level visible to the naked eye. Further, these amplified motions can be used to simulate one's heart rate and as such, their ECG.
  

https://github.com/user-attachments/assets/68062fd5-a4ff-4f9a-a555-cdec436bbc67


3. Our webapp allows users to login  and upload a minimum of 30-second video and get a ECG graph generated which is used to predict any heart abnormalities. We have a secure login system with a email and password. This account is used to store all your past ECG graph datas and predictions.
4. All user data stays confidential with limited access to the doctor. This is achieved by the usage of Firebase - Realtime Database, Authentication and Storage.
5. We made use of Intels OneAPI Toolkit to build a predictive model to detect if the the patient has a heart anomoly.
  ![image](https://github.com/user-attachments/assets/a477a3b9-a18e-4e3a-9032-154ea8b685d2)
6. The model is a Random Forest Classifier which is boosted by the oneAPI tool : scikit-learn-intelex, i.e, Intel extended version of Scikit-Learn.
7. Further, we make use of the oneDAL toll module 'daal4py' to patch the base scikit-learn module and accelerate our model training and data processing by manifolds.
8. For data preprocessing, we used a MinMaxScaler from the scikit-learn-intelex module  and feature extraction along the time and frequency domains for more efficient computations.
9. Finally our simplified front end completes our solution with all neccessary data being passed and forwarded to their respective destinations. Here, one needs to upload a 30 sec video of their face in a well-lit environment following which, the model would claasify their heart-rate patterns based on the 3-channel ecg data our technique computes. Then based on a voting mechanism between these 3 channel-wise predictions, the final output is calculated.


![image](https://github.com/user-attachments/assets/3f802b93-4822-4ae4-8721-5c99ddf6c70c)




# Credits and Acknowledgments:
1. Sai Etihas Chanda - (Author)
2. Arkaprava Gaine - (Author)
3. Shreeya Kannan - (Author)
4. Surya G - (Author)
5. Steve Mould - (Inspiration for the video processing technique)
                (Link for the original code of Motion Amplification : https://github.com/ajsteele/faceHR )
