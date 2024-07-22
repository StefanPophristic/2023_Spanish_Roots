# 2023_Spanish_Roots

Researchers: Stefan Pophristic, David Embick, Alec Marantz

Project that is looking at the storage of stems for homophonous words. Foco (focus) and Foca (seal) in spanish share the phonology for their stem but differ in Noun Class and Gender (thus in the -o vs. -a suffix). Through priming in lexical decision tasks, we are interested in testing what is shared between these two words, just the phonological form of the root, or the root identity in the syntax as well?

This study is run in Spanish.

# Repo Organization
- **Analysis**: all analysis scripts
- **Experiments**: All experiment scripts. To run an experiment, open the index.html file. It should open the experiment in a tab on a web browser locally.
  - for experiment behavioral_1 you must append the following variable to the url once you open index.html in order for it to work "?group=" and then add any of the participant group numbers (i.e. "?group=1", "?group=2", "?group=3", "?group=4", or "?group=5")
- **Materials**: Stimuli for each individual experiment, and folder containing all scripts used to create and choose the stimuli. Note that the stim_creation folder is not yet organized nor documented.


# behavioral_1

Pilot Study. Visual LDT. 42 stems. 1 intervener between every prime and target. Distractors are given as pairs with 1 intervener between each pair. Order of prime-target for distractor is random.

Conditions:
- ident_o: (foco --> foco) Masculine word priming itself
- ident_a: (foca --> foca) Feminine word priming itself
- stem_o: (foca --> foco) Feminine homophonous word priming the masculine (-o) homophonous word
- stem_a: (foco --> foca) opposite of stem_o condition, masculine homophonous word priming feminine (-a) homophonous word
- gender_o/control_o: (jugo --> foco) length and frequency matched masculine word priming main masculine word of interest. Should only include gender priming effects.
- gender_a/control_a: (lira --> foca) length and frequency matched feminine word priming main feminine word of interest. Should only include gender priming effects.
