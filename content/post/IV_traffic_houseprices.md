---
title: "IV method with application to traffic and house prices"
subtitle: "A quick introduction to IV regressions in causal analysis and it's application to calculate the effect of street traffic on housing prices"
date: 2025-10-17T18:19:00+05:30
author: "Kartik Patekar"
tags: ["empirics", "externality"]
categories: ["Economics"]
draft: false
description: " "
comments:
  1: "Section 3.1 of the book “Mostly Harmless Economics” provides a good justification for using linear regressions in causal analysis. Also see Lecture 1 in [Prof. Wager's Stats 361 notes](https://web.stanford.edu/~swager/stats361.pdf)"
  2: "To be precise, the method described here calculates the 2SLS estimator, which is the most popular estimator in the class of IV estimators. Other IV estimators include the limited information maximum likelihood (LIML) estimator, generalized method of moments (GMM) estimator, and k-estimators."
  3: "The causal effect estimate obtained from IV method is the average treatment effect on compilers (LATE)."
---
## IV method with application to traffic and house prices

If we believe that a variable $X$ causes (or affects) another variable $Y$, we are often interested in studying how much the value of $Y$ changes if we make a small $\delta x$ change in $X$. For example, how much do people dislike traffic on their street can be measured by decrease in house prices in response to increase in street traffic. The statistical technique most commonly used to answer causal questions is the linear regression {{< comment id="1" />}}
$$ Y = \beta X + C\gamma + \epsilon $$
where $C$ is the matrix of control variables and we assume that standard OLS assumption holds. However, even when $X$ and $Y$ are causally related, the estimate of $\beta$ is unbiased only if $X$ and $\epsilon$ are independent conditioned on $C$. This is often not the case in practice. In our example, he construction of a new housing development in a neighborhood may increase traffic prices while lowering the house prices, but this decrease in prices would not be the effect of increased traffic. Similarly, if a shopping complex is built in a neighborhood, it may increase traffic and house prices without this being a causal effect. Instrumental Variable estimation addresses this endogeneity problem by using an instrument $Z$ that affects $Y$ only through $X$. By restricting to studying variation in $Y$ due to variation in $X$ that originates through $Z$, it is possible to obtain unbiased estimates of $\beta$.

![fig1](/1_IV_traffic_houseprices/IV_expl.png "Figure 1: IV estimate in presence of omitted variable")

Let us build an intuititve understanding of omitted variable bias in OLS and how IV estimates remove the bias. Consider the causal relation descrbed in figure 1a. $A$ is an omitted variable which confounds $X$ and $Y$. For concreteness, let's assume that the true data generating process is given by 
$$
\begin{align*}
 X &= A+Z + \eta\\
 Y &= 2X + 2A + \zeta
\end{align*}
$$

Assume that $A$ and $Z$ are inpendent, have mean $0$ and variance $1$. The length of line segments in Figure 1b represent the variation in the variables. Without accounting for the omitted variable, the standard OLS $ Y = \beta X + \epsilon $ gives the incorrect causal estimate
$$ \hat \beta_{OLS} = \frac{Cov(X,Y)}{Var(X)} = 3$$

In the IV framework, we use an instrument $Z$ that affects $Y$ only through $X$ (exogeneity requirement). The IV regression proceeds in 2 stages {{< comment id="2" />}}
$$
\begin{align*}
  \text{Stage 1}&:~~~ X = \delta Z + \hat \eta \implies \hat X =\hat \delta_{IV1} Z \\
  \text{Stage 2}&:~~~ Y = \beta \hat X + \hat \zeta = \beta \hat \delta_{IV1} Z + \hat \zeta 
\end{align*}
$$

In the stage 1, we isolate the variation in $X$ caused by the variation in $Z$ given by $\hat X =\hat \delta_{IV1} Z$. This is represented by the blue part of line segment representing $X$ in Figure 1b. This variation is given independing of the omitted variable $A$, and we use this variation in $\hat X$ to identify the causal effect of $X$ on $Y$ (represented by blue part of $Y$'s line segment). The estimates are given by   
$$
\begin{align*}
  \hat \delta_{IV1} &= \frac{Cov(X,Z)}{Var(Z)} = 1 \\
  \hat \beta_{IV2} &= \frac{Cov(\hat X,Y)}{Var(\hat X)} = \frac{1}{\hat \delta_{IV1}} \frac{Cov(Y,Z)}{Var(Z)} = \frac{Cov(Y,Z)}{Cov(X,Z)} = 2 
\end{align*}
$$

which is the correct causal effect of $X$ on $Y$. Although we only looked at the omitted variable bias, IV method is also useful to correct for "simultaneous causality bias" and the "Errors-in-variables bias". To wrap our discussions, let us formally state the necessary conditions required for the IV method {{< comment id="3" />}}

1. **Relevance:** The instrument variable $Z$ should be correlated with the casual variable of interest $X$. This can be easily checked from significance level of the first stage estimate. Higher correlation in the first stage means that the instrument can more effectively extract the exogenous variation in the regressor and hence the causal estimate has a lower standard error.
2. **Exogeneity:** The instrument variable is uncorrelated with the error term in the regression equation ($Cor(Z,\epsilon | C) = 0 $ where $C$ is a vector of controls). Since the error term in unobserved, this condition is not statistically testable and needs to be justified theoretically. Sometimes, this is specified as the combination of exclusion restriction and as-if random condition.
    - **Exclusion Restriction:** Fixing controls $C$, the instrument $Z$ affects outcome $Y$ only through $X$.  
    - **As-if random:** Fixing controls $C$, the instrument itself must not be endogenous. This rules out any reverse causality from $Y$ to $X$.

## References
