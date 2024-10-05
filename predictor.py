import sklearnex
import numpy as np
import pandas as pd
import daal4py as d4p
from sklearnex.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, MinMaxScaler
import joblib
import scipy.io as sio
from scipy.stats import kurtosis,skew
import statistics as st
from antropy import petrosian_fd as pfd
from antropy import detrended_fluctuation as dfa
from hurst import compute_Hc as he
from pyentrp import entropy
d4p.sklearn.patch_sklearn()

def hjorth(a):
    first_deriv = np.diff(a)
    second_deriv = np.diff(a,2)

    var_zero = np.mean(a ** 2)
    var_d1 = np.mean(first_deriv ** 2)
    var_d2 = np.mean(second_deriv ** 2)

    activity = var_zero
    morbidity = np.sqrt(var_d1 / var_zero)
    complexity = np.sqrt(var_d2 / var_d1) / morbidity

    return activity, morbidity, complexity

def extract(d):
    res = [0,0,0]
    for ch,row in enumerate(d):
        mean,std,kurt,skeww,minn,maxx,med,mode,q1,q3 = np.mean(row),np.std(row),kurtosis(row),skew(row),min(row),max(row),np.median(row),st.mode(row),np.quantile(row,.25),np.quantile(row,.75)
        iqr = q3-q1
        act,mob,comp = hjorth(row)
        petf,defa,heux = pfd(row),dfa(row),he(row)[0]
        perm,samp,shan = entropy.permutation_entropy(row,3,1),entropy.sample_entropy(row,2,0.2*np.std(row)),entropy.shannon_entropy(row)
        energy = 0
        for x in row:
            energy+=(x**2)
        res[ch] = [mean,std,kurt,skeww,minn,maxx,med,mode,q1,q3,iqr,act,mob,comp,petf,defa,heux,perm,samp[0],shan,energy]
    return res

def getinp():
    return np.array([[int(input('Enter age: ')),int(input('Enter 1/0 for M/F: '))]]*3)


def make_pred(data):
    scaler = MinMaxScaler()
    models = joblib.load('oneapi.joblib')
    return models.predict(scaler.fit_transform(data))

def pipe(fil,input):
    testmeta = pd.read_csv(fil+".csv").T
    extra = np.array([[int(input[1]),int(input[2])]]*3)
    data = np.asarray(extract(np.array(testmeta)))
    data = np.concatenate([extra,data],axis=1)
    return make_pred(data)



