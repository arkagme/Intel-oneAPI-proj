# Intel-oneAPI Hackathon Project
Project submitted for Intel-oneAPI hackathon
Oct 4-5, 2024

We are hosting a website locally where you can upload a minimum of 30-second video and get a ECG graph generated which is used to predict any heart abnormalities. We have a secure login system with a email and password. This account is used to store all your past ECG graph datas and predictions.
All user data stays confidential. This is achieved by the usage of Firebase - Realtime Database, Authentication and Storage.

We use motion amplification to obtain the ECG graph and the corresponding ccv time series data of the patient. This technology is similar to the ones used in smart watches to make heart rate predictions. Our application tries to replicate such a prediction using a person's face. With the ECG we get, we classify the heart behaviour as Normal or not. The model used is a Random Forest classifier which has been boosted using the daal4py module.
For data processing, we used a MinMaxScaler and feature extraction with the scikit-learn-intelex module for faster computations.
Finally, for the final prediction, we use a voting mechanism between the prediction made for the 3 leads in our ECG to determine the final prediction.
Once all backend processes have completed, the results are reflected in the frontend.