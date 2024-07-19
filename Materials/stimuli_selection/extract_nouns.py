'''
Stefan Pophristic
Jul. 1st, 2024
extract_nouns.py

input: corpus_nouns.CSV
    Original csv file found on NELLAB server (shared > Corpora > SPAN > Scripts > Stefan > 2023_Spanish_Nouns)
     and is called "unambiguous_nouns.csv". This is a script that extracted all
     nouns from the SPAN corporas that did not appear in that corpus under any
     other parts of speach

Script written by Chatgpt and modified
'''


import pandas as pd

# Replace 'your_file.csv' with the path to your input CSV file
input_file_path = 'corpus_nouns.csv'
# Replace 'filtered_output.csv' with the path to your output CSV file
output_file_path = 'nouns_subset.csv'

# Read the CSV file
df = pd.read_csv(input_file_path)

# Ask the user for input1 (an integer), input2 (a float), and input3 (a string)
input1 = int(input("Enter number of characters of target word: "))
input2 = float(input("Enter Log Frequency of Target word: "))
input3 = input("Enter whether noun ends in /a/ or /o/: ")

# Filter rows where the number of characters in the first column matches input1
df_filtered = df[df.iloc[:, 0].apply(lambda x: len(str(x)) == input1)]

# Further filter rows where the value in the fourth column is within 0.05 of input2
df_filtered = df_filtered[abs(df_filtered.iloc[:, 3] - input2) <= 0.5]

# Further filter rows where the last column ends with the specified string
# Ensure the last column is converted to string
df_filtered = df_filtered[df_filtered.iloc[:, 0].astype(str).str.endswith(input3)]

# Sort the filtered DataFrame based on the proximity to input2
df_filtered['proximity'] = abs(df_filtered.iloc[:, 3] - input2)
df_filtered = df_filtered.sort_values(by='proximity')

# Drop the temporary 'proximity' column
df_filtered = df_filtered.drop(columns=['proximity'])

# Save the filtered and sorted DataFrame to a new CSV file
df_filtered.to_csv(output_file_path, index=False)

print(f"Filtered and sorted rows have been saved to {output_file_path}")

# import pandas as pd
#
# # Replace 'your_file.csv' with the path to your input CSV file
# input_file_path = 'corpus_nouns.csv'
# # Replace 'filtered_output.csv' with the path to your output CSV file
# output_file_path = 'nouns_subset.csv'
#
# # Read the CSV file
# df = pd.read_csv(input_file_path)
#
# # Ask the user for input1 (an integer), input2 (a float), and input3 (a string)
# input1 = int(input("Enter number of characters of target word: "))
# input2 = float(input("Enter Log Frequency of Target word: "))
# input3 = input("Enter whether noun ends in /a/ or /o/: ")
#
# # Filter rows where the number of characters in the first column matches input1
# df_filtered = df[df.iloc[:, 0].apply(lambda x: len(str(x)) == input1)]
# #
# # Further filter rows where the value in the fourth column is within 0.05 of input2
# df_filtered = df_filtered[abs(df_filtered.iloc[:, 3] - input2) <= 0.5]
# #
# # Further filter rows where the last column ends with the specified string
#
# # Ensure the last column is converted to string
# df_filtered = df_filtered[df_filtered.iloc[:, 0].astype(str).str.endswith(input3)]
#
# # Save the filtered DataFrame to a new CSV file
# df_filtered.to_csv(output_file_path, index=False)
#
# print(f"Filtered rows have been saved to {output_file_path}")
