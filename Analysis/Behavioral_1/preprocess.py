# Stefan Pophristic
# Jul. 22, 2024
# Preprocessing for 2023 SPanish Roots, Behavioral 1
#
# Output from experiment doesn't mark items as primes or targets
# this script does that

import pandas as pd
import numpy as np



df = pd.read_csv('../../Data/Behavioral_1/2023_Spanish_Roots-Behavioral_1-trials.csv')


# Length of the DataFrame
length = len(df)

# Create the repeating pattern
pattern = np.tile(['prime', 'prime', 'target', 'target'], length // 4 + 1)[:length]

# Add the new column to the DataFrame
df['Condition'] = pattern

df.to_csv('../../Data/Behavioral_1/2023_Spanish_Roots-Behavioral_1-clean.csv', index=False)
