import pandas as pd

# Load the CSV files
corpus_nouns = pd.read_csv('corpus_nouns.csv')
stims = pd.read_csv('stims.csv')

# Ensure the columns of interest are named as specified
corpus_nouns.columns = ['lemma', 'POS', 'count', 'logFreq']  # Rename columns for clarity
stims.columns = ['target', 'target_a_english', 'target_a_freq', 'id']  # Assuming stims also has 4 columns

# Create a dictionary from corpus_nouns for quick lookup
corpus_dict = dict(zip(corpus_nouns['lemma'], corpus_nouns['logFreq']))

# Add the new column to stims based on the mapping
stims['SPAN_freq'] = stims['target'].map(corpus_dict)

# Save the modified stims.csv
stims.to_csv('stims_SPAN_freq.csv', index=False)

print("The new stims_SPAN_freq.csv file has been created with the additional column.")
