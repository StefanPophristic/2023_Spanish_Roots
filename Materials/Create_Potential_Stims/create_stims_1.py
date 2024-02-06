'''
Stefan Pophristic
2023_Spanish_Nouns
Feb.2.2024

This is script no. 1 in the sequence.
Input:
    database_NC_nouns.csv
        csv file downloaded from the SPAN database (see NELLAB server's
        Shared > corpora > SPAN > README.md for more info). File includes all words
        that are marked for a noun part of speach and for belonging to a noun class
        (i.e. whose lemma form ends in /a/ or /o/).
Output:
    filtered_nouns_1.csv
        csv file that only retains rows of data whose lemma has a corresponding
        lemma in another row of data that only differs in final vowel
        e.g. if a row has the lemma 'foca', it will be kept only if another row has
        the lemma 'foco', and vice versa
'''
import csv

def get_column_values(csv_file, column_name):
    column_values = []

    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            column_values.append(row[column_name])
        column_values = [value.lower() for value in column_values]

    return column_values

def filter_csv(input_file, output_file):
    rows_to_keep = []

    with open(input_file, 'r') as csv_file:
        reader = csv.reader(csv_file, delimiter=',')  # Change delimiter to comma
        header = next(reader)  # Read the header

        for row in reader:
            row = [value.lower() for value in row]

            if row and len(row) >= 1:  # Check if the row is not empty and has at least one element
                current_word = row[2].strip()

                # only proceed if word ends in /a/ or /o/
                if current_word[-1] == "a" or current_word[-1] == "o":
                    # Create opposite word
                    opposite_word = current_word[:-1]

                    if current_word[-1] == "a":
                        opposite_word = opposite_word + "o"
                    else:
                        opposite_word = opposite_word + "a"

                    # Add row only if the opposite word exists in values
                    if opposite_word in values:
                        rows_to_keep.append(row)

    with open(output_file, 'w', newline='') as output_csv:
        writer = csv.writer(output_csv, delimiter=',')  # Change delimiter to comma
        writer.writerow(header)  # Write the header
        writer.writerows(rows_to_keep)

if __name__ == "__main__":
    input_file_path = "database_NC_nouns.csv"  # Change this to your input file path
    output_file_path = "filtered_nouns_1.csv"  # Change this to your desired output file path

    values = get_column_values(input_file_path, "word")
    filter_csv(input_file_path, output_file_path)
