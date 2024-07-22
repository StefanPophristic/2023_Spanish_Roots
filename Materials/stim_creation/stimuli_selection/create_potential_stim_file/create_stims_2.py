'''
Stefan Pophristic
2023_Spanish_Nouns
Feb.2.2024

This is script no. 2 in the sequence.
Input:
    filtered_data_1.csv (output of script no.1)
        csv file with all nouns from database whose lemmas end in /o/ or /a/ and have
        a counterpart whose lemma ends in the opposite vowel
Output:
    filtered_nouns_2.csv
        csv file that deletes all duplicate rows, standardizes capitalization, and
        only keeps the rows whose "word" value ends in /a/ or /o/ (i.e. deletes
        any rows whose lemma may meet the criteria, but whose "word" values
        are in the plural)
'''


import csv
import pandas as pd


def get_column_values(csv_file, column_name):
    column_values = []

    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            column_values.append(row[column_name])

    return column_values

def delete_duplicates(input_file):
    print("functioning.")

    column_names = ['wordID', 'word', 'lemma', 'POS', 'IC']
    initial_values = [[], [], [], [], []]

    # Create an empty DataFrame with specified columns
    df = pd.DataFrame(dict(zip(column_names, initial_values)))

    with open(input_file, 'r') as csv_file:
        reader = csv.reader(csv_file, delimiter=',')  # Change delimiter to comma
        header = next(reader)  # Read the header


        for row in reader:
            if row and len(row) >= 1:  # Check if the row is not empty and has at least one element

                current_word = row[1].strip() # word value
                # print(current_word)
                # print("")
                # only keep singular words
                if current_word[-1] == "a" or current_word[-1] == "o":
                    df.loc[len(df)] = row

    # convert all word values to lower case
    df['word'] = df['word'].str.lower()
    #delete wordID column
    df = df.drop('wordID', axis=1)

    df['word'] = df['word'].str.strip()
    df['lemma'] = df['lemma'].str.strip()

    # Find and keep only the first occurrence of duplicates based on 'word' and 'lemma'
    df_no_duplicates = df.drop_duplicates()

    # export the csv
    df_no_duplicates.to_csv('filtered_nouns_2.csv', index=False)


if __name__ == "__main__":
    input_file_path = "filtered_nouns_1.csv"  # Change this to your input file path

    values = get_column_values(input_file_path, "word")
    delete_duplicates(input_file_path)
