# import pandas as pd
#
# # Read the CSV file into a pandas DataFrame
# csv_file = 'stims.csv'
# df = pd.read_csv(csv_file)
#
# # Initialize the string
# output_string = 'var allStimuli = [\n'
#
# # Iterate through the DataFrame rows
# for index, row in df.iterrows():
#     output_string += '  {'
#     output_string += ', '.join([f'{col}: "{row[col]}"' for col in df.columns])
#     output_string += '},\n'
#
# # Remove the last comma and newline, then close the bracket
# output_string = output_string.rstrip(',\n') + '\n];'
#
# # Print or save the string to a file
# print(output_string)
#
# # Optionally, save to a file
# with open('stims_as_text.txt', 'w') as file:
#     file.write(output_string)

import pandas as pd

# Read the CSV file into a pandas DataFrame
csv_file = 'stims.csv'
df = pd.read_csv(csv_file)

# Initialize the string
output_string = 'var allStimuli = [\n'

# Iterate through the DataFrame rows
for index, row in df.iterrows():
    output_string += '  {'
    # Handle the first column without quotes and others with quotes
    output_string += f'id: {row[df.columns[0]]}, '
    output_string += ', '.join([f'{col}: "{row[col]}"' for col in df.columns[1:]])
    output_string += '},\n'

# Remove the last comma and newline, then close the bracket
output_string = output_string.rstrip(',\n') + '\n];'

# Print or save the string to a file
print(output_string)

# Optionally, save to a file
with open('stims_as_text.txt', 'w') as file:
    file.write(output_string)
