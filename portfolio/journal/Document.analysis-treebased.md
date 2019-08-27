---
title: (Python Script) Predicting Diabetes Using Tree-based Methods 
date: 2018-08-09 17:49:28 +0000
excerpt: This works like expected, this text is only visible on the front page where
  all the journal posts are listed
categories:
- thesis
---

## Introduction

The aim of this document is to develop a statistical model to predict type 2 diabetes based on the machine learning algorithm, and to check if the statistical approach with patients’ data can detect diabetes correctly. The methodology that will be mainly used will be the tree-based model, which is one of the most frequently used methods in the medical field. It is easy to interpret, mirrors physician’s criteria and gives relatively high accuracy than any other statistical methods. A decision tree is the base-line for the tree-based model, and the two other methods will be modifications of this algorithm. Random forest and Boosting are called Ensemble methods that combine multiple classifiers (several decision trees) in different ways. A random forest can decrease variance, and boosting can reduce bias.


```python
import numpy as np
import pandas as pd
from sklearn import tree
from sklearn.model_selection import train_test_split
import pydotplus
import matplotlib.pyplot as plt
import re
import matplotlib
from IPython.display import Image
from sklearn.externals.six import StringIO
from sklearn.tree import DecisionTreeClassifier
import pandas_profiling

```

First we'll load a data from synthea. In this data set, NA is informative missingness. As the patients do not need unnecessary lab tests, NA means the patients’ lab test. Therefore, all the NA in this paper is replaced with 0. As the NA implies some information, the NA is kept as a distinct number so that classifier can detect the difference between the real values and NA, which is encoded as 0.

Also Blood pressure variable is slitted it into two variables which are high blood pressure and low blood pressure.

## Data importing and cleansing


```python
input_file = "/Users/namhyunjin/PycharmProjects/untitled2/synthea_validate.csv"
df = pd.read_csv(input_file, header = 0)
df = df.fillna(0)
#df=df.fillna(df.mean())


# Blood_Pressure
low_blood = []
high_blood = []
for row in df['Blood_Pressure']:
    if row !=0:
        high_blood.append(float(re.findall('\d+', row)[1]))
        low_blood.append(float(re.findall('\d+', row)[0]))
    else:
        high_blood.append(0)
        low_blood.append(0)
df['low_blood'] = low_blood
df['high_blood'] = high_blood
```

Define diabetes as a patients who has a 'Condition' variable recoreded as 'Diabetes' and 'Prediabetes'. Drop the variables that are irrelevent to data analysis. Also rename the variable so that XGBoost can understand the variables(XGBoost algorithm does not allow variables to have '[',']', and '<' for their names)


```python
df['diabetes'] = df.Condition.isin(['Diabetes', 'Prediabetes'])
df = df.drop(['Condition','Blood_Pressure','Unnamed: 0', 'Patient_Year','Immunization','Diagnostic_Report',
              'Procedure', 'Condition','Care_Plan', 'Quality adjusted life years', 'Disability rating scale',
              'Housing status', 'Are you covered by health insurance or some other kind of health care plan [PhenX]',
              'Total score [MMSE]','Medication', 'Encounter','Allergy_Intolerance'], axis=1)
# rename variables
regex = re.compile(r"\[|\]|<", re.IGNORECASE)
a = [regex.sub("_", col) if any(x in str(col) for x in set(('[', ']', '<'))) else col for col in df.columns.values]
df.columns = a

# clean the data
d_tf = {True:1, False:0}
df['diabetes'] = df['diabetes'].map(d_tf)
```

Before going into the analysis process, a dataset can be divided into training and testing data. Most of the data is used for training, and a smaller amount of the data is used for testing. Training data is used to fit a parameter and builds the models to find an algorithm to map the function where X is an input vector, and Y is an output vector. In this study, the output vector is the diagnosis of diabetes and f(X) is the decision tree, random forest, and boosting


```python
# Devide data
features = list(df.columns[:49])
y = df['diabetes']
X = df[features]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1)
```

## Data description

There are 50 variables in the data set. The variables are information about paitent's health such as "Body height", "Calcium", "Carbon Diaxide", and so on. As we inputted 0 for missing valuses, there are a lot of 0 in the whole dataset. Some of the variables are highly correlated. For example, "Body Weight" and "Body Mass Index" are highly correlated, and "Creatinine" and "Chloride" are highly correlated.


```python
print(pd.DataFrame( index = ["Diabetes", "Not Diabetes"],
                   data = [df.diabetes.value_counts()[0],df.diabetes.value_counts()[1]],
                  columns = ["Number of patiens"]))
```

                  Number of patiens
    Diabetes                  13410
    Not Diabetes                522


The output variables is the patient's condition if they have diabetes or not. Among 13932 patients, there are 522 patinets who are having a diabetes and 13410 patients who does not have diabetes.

# Decision Tree

A decision tree is a machine learning methods that is useful for interpretation. It can be displayed graphically and is easily understood even by a non-expert. It also mirrors a physician’s criteria to diagnosis diseases. It uses a greedy approach for recursive binary splitting; at each step of the tree-building process, the best split is chosen at that particular step, rather than looking ahead and picking a split that will lead to a better tree in some future step. Therefore, patients can go through laboratory test according to the sequence of the nodes and can terminate sooner if they meet certain conditions. Unfortunately, a simple decision tree may not perform as well as other Machine Learning algorithms. However, many decision trees using ensemble methods (random forests and boosting); this limitation can be redeemed and provide high prediction accuracy.


```python
tree_clf = tree.DecisionTreeClassifier(criterion = "gini", splitter = 'random', max_leaf_nodes = 10, min_samples_leaf = 5, max_depth= 5)
tree_clf = tree_clf.fit(X_train,y_train)
```

First of all, to make the model simple and easy to interpret, I set the hyperparameter like as above. It will create some restriction to tree model and make model not grow too deeply. Maximum numver of leaf nodes is 5, minimum number of samples leaf is 5, and maximum depth for the tree is 5.


```python
# Visualize
dot_data = StringIO()
tree.export_graphviz(tree_clf, out_file=dot_data, feature_names=features)
graph = pydotplus.graph_from_dot_data(dot_data.getvalue())
Image(graph.create_png())
```

Figure above shows the result for the decision tree. A node, which is divided into sub-nodes, is named a parent node of sub-nodes where a sub-nodes are the child of the parent node. For in this case, There are 9 nodes included roots nodes, which is Glucoes. In theLeft split of the root node, "Death" is root nodes for this sub-trees and "Oral temperature" is the sub-nodes. The tree’s root node can be interpreted like "Is the low blood pressure level under 29.24?". If the patients have under 29.24 glucose level, then it should follow the left-node.


```python
tree_imp = pd.DataFrame({'Var' : X_train.columns,'Imp' : tree_clf.feature_importances_ })
tree_imp = tree_imp.sort_values(by = 'Imp', ascending=False)[:10]
tree_imp.plot.bar(x='Var', y='Imp')
plt.show()
```


![png]( )


Figure aboe shows the relative importance for the variables. A measure of variable importance is the sum of Gini impurity index for each split for which it means it shows the most important variable that is used to predict diabetes. It shows that 'low blood pressure', 'Total Cholesterol' and 'Death' are the 3 most important factors.


```python
tree_y_pred = tree_clf.predict(X_test)
from sklearn import metrics
print(pd.crosstab(y_test, tree_y_pred, rownames = ['y_test'], colnames = ['tree_y_pred']))
print("Accuracy:",metrics.accuracy_score(y_test, tree_y_pred))
```

    tree_y_pred     0
    y_test           
    0            4022
    1             158
    Accuracy: 0.9622009569377991


The test data prediction accuracy is 96.268%. Therefore, we can conclude that decision tree can be a propriate method to predict diabetes.

# Random Forest

Random forests is an ensemble machine learning method. It is well known as a strong predictor that can be also easy to interpret. Random forests is a substantial modification technique of bagging that builds a B number of de-correlated sample trees. Bagging is an ensemble learning method which is the shortened term for’ bootstrap aggregating’. It involves bootstrapping the train data into B different set, and for iteration, it is building different decision trees. Aggregating gives an output of the class that earned the most votes of the B number of trees. Since bagging is aggregating a number of trees, it can reduce variance and helps to avoid over-fitting. Whenever split is decided in bagging, like as the decision tree, every variable is on the consideration, even though it is using a bootstrapped sample, there is a high chance that all of the bagged trees might look similar to each other. In other words, the bagged trees will be highly correlated and averaging many highly correlated quantities does not lead to better performance.

Random forest builds a B number of decision trees on bootstrapped training samples, which is the same procedure with bagging. However, in Random forest model, when each split is made, a random sample of m (= square of p) predictors is chosen instead of using the full set of p predictors. Hence, Random forest can give a reduction in variance as averaging many uncorrelated quantitie.




```python
from sklearn.ensemble import RandomForestClassifier
rf_clf = RandomForestClassifier(n_estimators=300)
rf_clf = rf_clf.fit(X_train,y_train)
```

I set the number of trees as 300.


```python
rf_feature_imp = pd.Series(rf_clf.feature_importances_,index=X_train.columns).sort_values(ascending=False)[1:10]
rf_feature_imp.plot.bar()
plt.show()
```


![png](/upload/notebook1/output_29_0.png)


Figure above shows the relative importance for the variables. Random forest shows "Body Height", "Body Mass Index","Low Blood pressure" as an important variables.


```python
rf_y_pred = rf_clf.predict(X_test)
print(pd.crosstab(y_test, rf_y_pred, rownames = ['y_test'], colnames = ['rf_y_pred']))
print("Accuracy:",metrics.accuracy_score(y_test, rf_y_pred))
```

    rf_y_pred     0
    y_test         
    0          4022
    1           158
    Accuracy: 0.9622009569377991


The test data prediction accuracy is 96.22%. It is showing a strong performance, but showing less accuracy then decision tree.

# XGBoost

Boosting is an ensemble technique that new models are added to fix the errors made by existing models. Models are added recursively till no noticeable improvements can be detected. Each tree in boosting has high bias, but by effectively combining these weak trees, it will produce a low bias and low variance result. In contrast to Random Forest, it will grow simpler trees with fewer splits.

XGBoost is an implementation technique of gradient boosting machines created by Tianqi Chen. The difference in modelling details is that Xgboost used a more regularised model formalisation to control over-fitting, which gives it better performance. The XGBoost algorithm combines many week classifiers, and by combining them, it gets better performance. Each tree has a high bias with weak performance. It starts by building an initial tree with high bias, which has a poor performance by itself. Then it sequentially builds next tree which is trained to predict what the previous tree was not able to fitted well and is itself a weak learner too. It continues this procedure until stopping criteria met. XGBoost is providing the advantages of higher execution speeds, better model performance, enabling parallelised computations, cache optimisation, and out-of-core computing for huge databases.



```python
import xgboost as xgb
from xgboost import XGBClassifier
from xgboost.sklearn import XGBClassifier
from xgboost import plot_importance

dtrain = xgb.DMatrix(X_train, label= y_train)
dtest = xgb.DMatrix(X_test, label= y_test)

param = {'max_depth': 5, 'eta': 1, 'objective': 'binary:logistic'}
num_round = 40
evallist = [(dtest, 'eval'), (dtrain, 'train')]

bst = xgb.train(param, dtrain, num_round, evallist)
```

    [0]	eval-error:0.037799	train-error:0.037326
    [5]	eval-error:0.03756	train-error:0.036505
    [10]	eval-error:0.038278	train-error:0.033942
    [15]	eval-error:0.038278	train-error:0.033121
    [20]	eval-error:0.038278	train-error:0.033019
    [25]	eval-error:0.038517	train-error:0.033019
    [30]	eval-error:0.038517	train-error:0.033019
    [35]	eval-error:0.038278	train-error:0.033019
    [40]	eval-error:0.038278	train-error:0.033019


First of all, to make the model simple and easy to interpret, I set the hyperparameter like as above. It will create some restriction to boosting model and prevent overfit. Maximum depth for the tree is 5, and lower learning rate $eta$ is 1, and number of iteration is 50.


```python
xgb.plot_importance(bst, max_num_features=10)
plt.show()
```


![png](/upload/notebook1/output_37_0.png)


Figure above shows the relative importance for the variables. Random forest shows "Body Weight", "Body Height" , "Low High pressure" as an important variables.


```python
xg_y_pred = bst.predict(dtest)
xg_y_pred  = xg_y_pred > 0.5
print(pd.crosstab(y_test, xg_y_pred, rownames = ['y_test'], colnames = ['xg_y_pred']))
print("Accuracy:",metrics.accuracy_score(y_test, xg_y_pred))
```

    xg_y_pred  False  True 
    y_test                 
    0           4019      3
    1            158      0
    Accuracy: 0.9614832535885167


The test data prediction accuracy is 96.17%. It is showing a strong performance, but showing less accuracy than decision tree and randomforest.


```python

```
