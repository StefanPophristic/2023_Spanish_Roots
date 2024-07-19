# Getting potential stims for the project
'''
Stefan Pophristic
2023_Spanish_Nouns
Feb.2.2024

This is script no. 3 in the sequence.
Input:
    filtered_nouns_2.csv (output of script no.2)
        csv file with one row per word. Each word ends in /o/ or /a/ and has a counterpart
        that ends in the opposite vowel
    first_round_potential_stims.csv
        A few weeks ago I created the first round of stimuli with similar scripts
        as create_stims_1.py and create_stims_2.py. However, there was a mistake
        somewhere (either in database setup or the scripts) which yielded a csv file
        that was missing many words (including: foca/foco). However, since I already annotated
        that file, I will merge that file with the new stims file, to keep all
        of the frequency and usage data I manually entered.
Output:
    filtered_nouns_3.csv
        csv file that retains all rows from first_round_stims.csv and deletes any
        duplicate rows in filtered_data_2.csv. All rows added from filtered_data_2.csv
        will be marked as new under the "new" column.
'''

import pandas as pd

# Load the CSV files into pandas DataFrames
old_stims = pd.read_csv('first_round_potential_stims.csv', encoding='latin1')
new_stims = pd.read_csv('filtered_nouns_2.csv', encoding='latin1')

# Merge the DataFrames based on the "word" column, keeping all rows from old_stims
merged_df = pd.merge(old_stims, new_stims, on='word', how='outer', suffixes=('_old', '_new'))

merged_df.to_csv('all_potential_stims.csv', index=False)
#

#
# import csv
# import pandas as pd
#
#
# '''
# word	object
# lemma	object
# POS	object
# IC	object
# English	object
# Animate	float64
# Innapropriate	float64
# Derivational	float64
# Potentially_Use	object
# Other_POS	object
# Span_Dic_Freq	float64
# Verb_Frequency	float64
# Adj_Frequency	float64
# Other_Freq	float64
# Regional_Use	object
# Regional_dont_use	object
# Use	float64
# log_freq	float64
# stim_list	float64
#
# old
# word	object
# lemma	object
# POS	object
# IC	object
# '''
#
# def unify_csv(old_stims, new_stims):
#     #read old csv file as dataframe
#     df_old_stims = pd.read_csv(old_stims, encoding='latin1')
#     df_new_stims = pd.read_csv(new_stims, encoding='latin1')
#
#     # Convert all columns to strings for both dataframes
#     df_old_stims = df_old_stims.astype(str)
#     df_new_stims = df_new_stims.astype(str)
#
#     all_old_lemmas = df_old_stims['lemma'].values
#
#     columns = df_old_stims.columns.to_numpy()
#     print(columns)
#     df_final = pd.DataFrame(columns=columns) #columns=columns
#     print(type(df_final))
#
#     df_new_stims['English'] = None
#     df_new_stims['Animate'] = None
#     df_new_stims['Innapropriate'] = None
#     df_new_stims['Derivational'] = None
#     df_new_stims['Potentially_Use'] = None
#     df_new_stims['Other_POS'] = None
#     df_new_stims['Span_Dic_Freq'] = None
#     df_new_stims['Verb_Frequency'] = None
#     df_new_stims['Adj_Frequency'] = None
#     df_new_stims['Other_Freq'] = None
#     df_new_stims['Regional_Use'] = None
#     df_new_stims['Regional_dont_use'] = None
#     df_new_stims['Use'] = None
#     df_new_stims['log_freq'] = None
#     df_new_stims['stim_list'] = 2
#
#     # Combine the tables
#     for index, row in df_new_stims.iterrows():
#         lemma = row['lemma']
#         print(lemma)
#
#         # If there are two rows with the same lemma, keep the one from old stims
#         if lemma in all_old_lemmas:
#             print("enter if")
#             df_final = df_final.append(df_old_stims[df_old_stims['lemma'] == lemma], ignore_index=True)
#
#         # if there are not the same rows with the same lemma, add them
#         else:
#             print("enter else")
#             print(row)
#             df_final = df_final.append(row, ignore_index=True)
#
#
#     df_final.to_csv('test.csv', index=False)
#
#
# unify_csv("first_round_potential_stims.csv", "filtered_nouns_2.csv")
#     # values = get_column_values(input_file_path, "word")
