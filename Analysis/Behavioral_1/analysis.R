#####################
#####################
# Stefan Pophristic
# July 22nd, 2024
# NELLAB
# 2023_Spanish_Roots-Behavioral_1
##################### 



# Load necessary packages

library(tidyverse)
library(lmerTest)
library(boot)
library(reshape2)

setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

#########
# Import Data
#########

# Subject Data
df_trials <- read.csv('../../Data/Behavioral_1/2023_Spanish_Roots-Behavioral_1-clean.csv', header = TRUE)
df_subjects <- read.csv('../../Data/Behavioral_1/2023_Spanish_Roots-Behavioral_1-subject_information.csv', header = TRUE)


total_trials <- nrow(df_trials) #total data points: 9360
totalParticipants <- length(unique(df_trials$workerid))
totalParticipants #total participants: 50

#Import target word Variables
df_variables <- read.csv('../../Materials/Behavioral_1/stims.csv', header = TRUE)



#########
# Clean Data
#########

###
# Participant Exclusion
###

# Exclude participants if they had an error rate of >15%
df <- df_trials %>%
  mutate(correctTrial = case_when(
    (response == "f" & trial_type == "distractor") ~ 1,
    (response == "j" & trial_type %in% c("ident_o", "ident_a", "stem_o", "stem_a", "gender_o", "gender_a")) ~ 1,
    TRUE ~ 0)) %>%
  group_by(workerid) %>%
  filter(mean(correctTrial == 0) <= 0.151)

print(totalParticipants - length(unique(df$workerid)))
# 6 participants excluded 

excluded_participants <- df_trials %>%
  mutate(correctTrial = case_when(
    (response == "f" & trial_type == "distractor") ~ 1,
    (response == "j" & trial_type %in% c("ident_o", "ident_a", "stem_o", "stem_a", "gender_o", "gender_a")) ~ 1,
    TRUE ~ 0))  %>%
  group_by(workerid) %>%
  summarise(error_rate = mean(correctTrial == 0)) %>%
  filter(error_rate > 0.151)

# Get unique values of excluded groups and their error rates
unique_excluded_groups <- df_trials %>%
  mutate(correctTrial = case_when(
    (response == "f" & trial_type == "distractor") ~ 1,
    (response == "j" & trial_type %in% c("ident_o", "ident_a", "stem_o", "stem_a", "gender_o", "gender_a")) ~ 1,
    TRUE ~ 0))  %>%
  filter(workerid %in% excluded_participants$workerid) %>%
  group_by(workerid) %>%
  summarise(error_rate = mean(correctTrial == 0)) %>%
  distinct()

# Print unique workerids and their error rates
print(unique_excluded_groups)
# workerid error_rate
# <int>      <dbl>
# 1       86      0.212
# 2       89      0.167
# 3       99      0.219
# 4      101      0.212
# 5      121      0.158
# 6      127      0.201

# Get rid of participants whose average RT is more than two standard deviations from experimental the average
df <- df %>%
  group_by(workerid) %>%
  mutate(mean_rt = mean(rt), sd_rt = sd(rt)) %>%
  filter(!(rt > mean_rt + 2 * sd_rt)) %>%
  ungroup() %>%
  select(-mean_rt, -sd_rt)

print(totalParticipants - length(unique(df$workerid)))
# 6 participants excluded 

excluded_participants <- df %>%
  group_by(workerid) %>%
  mutate(mean_rt = mean(rt), sd_rt = sd(rt), error_rate = mean(correctTrial == 0)) %>%
  filter(rt <= mean_rt + 2 * sd_rt) %>%
  ungroup() %>%
  select(-mean_rt, -sd_rt) %>%
  filter(error_rate > 0.15)

# Print workerid and error rate for excluded participants
unique(excluded_participants[, c("workerid", "error_rate")])
# No further exclusions


###
# Trial Exclusion
###

# Get rid of incorrect trials 
df <- df %>% 
  filter(correctTrial == 1)

firstExclusion <- nrow(df)
print(total_trials - firstExclusion)
# 2015 trials were wrong

print((total_trials - firstExclusion)/total_trials)
# 21.5% of the data was excluded 

# Get rid of trials whose RT is more than two standard deviations from the average
df <- df %>%
  mutate(mean_rt = mean(rt), sd_rt = sd(rt)) %>%
  mutate(rt_exclude = if_else(rt > (mean_rt + 2 * sd_rt) | rt < (mean_rt - 2 * sd_rt), TRUE, FALSE)) %>%
  filter(!rt_exclude) %>%
  select(-mean_rt, -sd_rt, -rt_exclude)

print(firstExclusion - nrow(df))
# 184 trials excluded 

print((total_trials - nrow(df))/total_trials)
# Total data excluded: 23.49%


###
# Final Cleaning
###

df <- df %>%
  select(-error, -proliferate.condition, -correctTrial) %>%
  rename(trial_num = slide_number_in_experiment)

#Counting of trials started at 8
df$trial_num <- df$trial_num - 7


#########
# Participant Information
#########

# No participants were excluded, so no changes to df_subjects

# Gender
genderData <- df_subjects %>%
  count(gender) 

genderData
#   gender n
# 1    Female 21
# 2      Male 27
# 3 Nonbinary  2


# Age
ggplot(df_subjects, aes(x = age)) +
  geom_histogram(binwidth = 3, fill = "skyblue", color = "black") +
  labs(title = "Histogram of Age", x = "Age", y = "Frequency")




#########
# Merge Variable Information
#########

df_variables <- df_variables %>%
  rename(item = stim)

df <- left_join(df, df_variables, by = c("id", "item"))

# get rid of distractor trials
df_distractor  <- df %>%
  filter(trial_type == "distractor")

df <- df %>%
  filter(trial_type != "distractor")


# Only get targets
df_all <- df

df <- df %>%
  filter(Condition == "target") %>%
  rename(prime_target = Condition)
  

df <- tidyr::separate(df, trial_type, into = c("condition", "gender"), sep = "_")

df$condition <- gsub("gender", "control", df$condition)

# histogram of RT
p <- ggplot(df, aes(x = rt)) +
  geom_histogram(binwidth = 5, fill = "blue", color = "black", alpha = 0.7) +
  theme_minimal() +
  labs(title = "Histogram of Response Times",
       x = "Response Time (ms)",
       y = "Frequency")

# Print the plot
print(p)

# Highly skewed right tale, take the log of rt as variable of interest

df$log_rt <- log(df$rt)


# histogram of RT
p <- ggplot(df, aes(x = log_rt)) +
  geom_histogram(binwidth = 0.01, fill = "blue", color = "black", alpha = 0.7) +
  theme_minimal() +
  labs(title = "Histogram of Response Times",
       x = "Response Time (ms)",
       y = "Frequency")

# Print the plot
print(p)



#########
# Run Regressions
#########

df$workerid <- factor(df$workerid)
df$item <- factor(df$item)
df$condition <- factor(df$condition, levels = c("control", "stem", "ident"))
df$gender <- factor(df$gender)


# Significance against eachother
lm = lmer(log_rt ~ trial_num + freq + condition + gender + (1|workerid) + (1|item), data=df)
summary(lm)

# in ms --> effect size is -71ms for the ident condition 

# Fixed effects:
# Estimate Std. Error         df t value Pr(>|t|)    
# (Intercept)     7.424e+00  2.793e-02  1.120e+02 265.856  < 2e-16 ***
# trial_num      -1.538e-04  5.774e-05  1.844e+03  -2.664  0.00778 ** 
# freq           -3.164e-02  5.946e-03  7.031e+01  -5.320 1.17e-06 ***
# conditionstem  -6.115e-03  7.563e-03  1.827e+03  -0.809  0.41891    
# conditionident -4.637e-02  7.529e-03  1.835e+03  -6.158 9.01e-10 ***
# gendero         5.503e-03  9.281e-03  6.746e+01   0.593  0.55522   



# Significance against eachother
lm = lmer(log_rt ~ trial_num + freq + condition*gender + (1|workerid) + (1|item), data=df)
summary(lm)


# Fixed effects:
#   Estimate Std. Error         df t value Pr(>|t|)    
# (Intercept)             7.427e+00  2.824e-02  1.173e+02 263.001  < 2e-16 ***
# trial_num              -1.549e-04  5.776e-05  1.842e+03  -2.682  0.00738 ** 
# freq                   -3.161e-02  5.945e-03  7.029e+01  -5.317 1.19e-06 ***
# conditionstem          -6.653e-03  1.087e-02  1.833e+03  -0.612  0.54057    
# conditionident         -5.563e-02  1.076e-02  1.828e+03  -5.170 2.59e-07 ***
# gendero                -1.031e-03  1.280e-02  2.337e+02  -0.081  0.93590    
# conditionstem:gendero   1.091e-03  1.513e-02  1.832e+03   0.072  0.94252    
# conditionident:gendero  1.820e-02  1.508e-02  1.844e+03   1.207  0.22762    


#########
# Plots
#########


conditions_plot <- ggplot(df, aes(x = condition, y = rt, fill = condition)) +
  geom_boxplot() +
  scale_fill_manual(
    values = c("control" = "#a74a2e", "ident" = "#c89349", "stem" = "#9ca564"),
    labels = c("control" = "control", "ident" = "identity", "stem" = "stem") # Custom labels
  ) +
  scale_x_discrete(
    labels = c("control" = "control", "ident" = "identity", "stem" = "stem") # Custom x-axis labels
  ) +
  theme_minimal() +
  labs(title = "Box Plot of RT by Condition",
       x = "Condition",
       y = "Response Time (ms)",
       fill = "Condition")

print(conditions_plot)
ggsave(filename = "figures/conditions.png", plot = conditions_plot, width = 8, height = 6, units = "in", dpi = 300)


# Create a box plot with gender overlay
condition_gender_plot <- ggplot(df, aes(x = condition, y = rt, fill = gender)) +
  geom_boxplot(position = position_dodge(width = 0.8)) + # Dodge to separate the box plots
  scale_fill_manual(values = c("a" = "#c5a1a1", "o" = "#aec1c3")) +
  scale_x_discrete(
    labels = c("control" = "control", "ident" = "identity", "stem" = "stem") # Custom x-axis labels
  ) +
  theme_minimal() +
  labs(title = "Box Plot of RT by Condition and Gender",
       x = "Condition",
       y = "Response Time (ms)",
       fill = "Gender")

# Print the plot
print(condition_gender_plot)
ggsave(filename = "figures/conditions_gender.png", plot = condition_gender_plot, width = 8, height = 6, units = "in", dpi = 300)



#####
# Power Analysis

library(pwr)

# Separate data by condition
control_data <- df %>% filter(condition == "control") %>% pull(rt)
ident_data <- df %>% filter(condition == "ident") %>% pull(rt)

# Calculate means
mean_control <- mean(control_data)
mean_ident <- mean(ident_data)

# Calculate standard deviations
sd_control <- sd(control_data)
sd_ident <- sd(ident_data)

# Sample sizes
n_control <- length(control_data)
n_ident <- length(ident_data)

# Calculate pooled standard deviation
sd_pooled <- sqrt(((n_control - 1) * sd_control^2 + (n_ident - 1) * sd_ident^2) / (n_control + n_ident - 2))

# Calculate Cohen's d
cohen_d <- abs(mean_control - mean_ident) / sd_pooled

# Print Cohen's d
print(cohen_d)

alpha <- 0.05
power <- 0.80

# Calculate required sample size for a two-sample t-test
pwr_result <- pwr.t.test(d = cohen_d, sig.level = alpha, power = power, type = "two.sample")
print(pwr_result)
# n = 217.9504
# d = 0.2689692
# sig.level = 0.05
# power = 0.8
# alternative = two.sided
####




