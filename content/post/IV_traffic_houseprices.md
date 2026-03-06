---
title: "IV method and Shift-Share instruments"
subtitle: "A quick introduction to IV regressions in causal analysis and Shift Share instruments"
date: 2025-10-17T18:19:00+05:30
author: "Kartik Patekar"
tags: ["empirics", "externality"]
categories: ["Economics"]
draft: false
description: " "
notes:
  1: "Section 3.1 of the book \"Mostly Harmless Economics\" provides a good justification for using linear regressions in causal analysis. Also see Lecture 1 in [Prof. Wager's Stats 361 notes](https://web.stanford.edu/~swager/stats361.pdf)"
  2: "To be precise, the method described here calculates the 2SLS estimator, which is the most popular estimator in the class of IV estimators. Other IV estimators include the limited information maximum likelihood (LIML) estimator, generalized method of moments (GMM) estimator, and k-estimators."
  3: "The causal effect estimate obtained from IV method is the average treatment effect on compilers (LATE)."
---

# Instrumental Variable approach for Causal Inference

If we believe that a variable $X$ causes (or affects) another variable $Y$, we are often interested in studying how much the value of $Y$ changes if we make a small $\delta x$ change in $X$. For example, how much do people dislike traffic on their street can be measured by decrease in house prices in response to increase in street traffic. The statistical technique most commonly used to answer causal questions is the linear regression {{< note id="1" />}}
$$ Y = \beta X + C\gamma + \epsilon $$
where $C$ is the matrix of control variables and we assume that standard OLS assumption holds. However, even when $X$ and $Y$ are causally related, the estimate of $\beta$ is unbiased only if $X$ and $\epsilon$ are independent conditioned on $C$. This is often not the case in practice. In our example, the construction of a new housing development in a neighborhood may increase traffic while lowering the house prices, but this decrease in prices would not be the effect of increased traffic. Similarly, if a shopping complex is built in a neighborhood, it may increase traffic and house prices without this being a causal effect. Instrumental Variable estimation addresses this endogeneity problem by using an instrument $Z$ that affects $Y$ only through $X$. By restricting to studying variation in $Y$ due to variation in $X$ that originates through $Z$, it is possible to obtain unbiased estimates of $\beta$.

![fig1](/1_IV_traffic_houseprices/IV_expl.png "Figure 1: IV estimate in presence of omitted variable")

Let us build an intuitive understanding of omitted variable bias in OLS and how IV estimates remove the bias. Consider the causal relation described in figure 1a. $A$ is an omitted variable which confounds $X$ and $Y$. For concreteness, let's assume that the true data generating process is given by 
$$
\begin{align*}
 X &= A+Z + \eta\\
 Y &= 2X + 2A + \zeta
\end{align*}
$$

Assume that $A$ and $Z$ are independent, have mean $0$ and variance $1$. The length of line segments in Figure 1b represent the variation in the variables. Without accounting for the omitted variable, the standard OLS $ Y = \beta X + \epsilon $ gives the incorrect causal estimate
$$ \hat \beta_{OLS} = \frac{Cov(X,Y)}{Var(X)} = 3$$

In the IV framework, we use an instrument $Z$ that affects $Y$ only through $X$ (exogeneity requirement). The IV regression proceeds in 2 stages {{< note id="2" />}}
$$
\begin{align*}
  \text{First Stage}&:~~~ X = \delta Z + \hat \eta \implies \hat X =\hat \delta_{IV1} Z \\
  \text{Second Stage}&:~~~ Y = \beta \hat X + \hat \zeta = \beta \hat \delta_{IV1} Z + \hat \zeta 
\end{align*}
$$

In the stage 1, we isolate the variation in $X$ caused by the variation in $Z$ given by $\hat X =\hat \delta_{IV1} Z$. This is represented by the blue part of line segment representing $X$ in Figure 1b. This variation is independent of the omitted variable $A$, and we use this variation in $\hat X$ to identify the causal effect of $X$ on $Y$ (represented by blue part of $Y$'s line segment). The estimates are given by   
$$
\begin{align*}
  \hat \delta_{IV1} &= \frac{Cov(X,Z)}{Var(Z)} = 1 \\
  \hat \beta_{IV2} &= \frac{Cov(\hat X,Y)}{Var(\hat X)} = \frac{1}{\hat \delta_{IV1}} \frac{Cov(Y,Z)}{Var(Z)} = \frac{Cov(Y,Z)}{Cov(X,Z)} = 2 
\end{align*}
$$

which is the correct causal effect of $X$ on $Y$. Although we only looked at the omitted variable bias, IV method is also useful to correct for "simultaneous causality bias" and the "Errors-in-variables bias". To wrap our discussions, let us formally state the necessary conditions required for the IV method {{< note id="3" />}}

1. **Relevance:** The instrument variable $Z$ should be correlated with the causal variable of interest $X$. This can be easily checked from significance level of the first stage estimate. Higher correlation in the first stage means that the instrument can more effectively extract the exogenous variation in the regressor and hence the causal estimate has a lower standard error.
2. **Exogeneity:** The instrument variable is uncorrelated with the error term in the regression equation ($Cor(Z,\epsilon | C) = 0 $ where $C$ is a vector of controls). Since the error term in unobserved, this condition is not statistically testable and needs to be justified theoretically. Sometimes, this is specified as the combination of exclusion restriction and as-if random condition.
    - **Exclusion Restriction:** Fixing controls $C$, the instrument $Z$ affects outcome $Y$ only through $X$.  
    - **As-if random:** Fixing controls $C$, the instrument itself must not be endogenous. This rules out any reverse causality from $Y$ to $X$.


# Shift-Share instruments

In many economic settings, the shocks that a researcher would like to use as instruments operate at a different level than the units being studied. For example, a researcher studying regional labor markets may find plausibly exogenous variation at the *industry* level --- such as changes in trade policy, technology, or national demand that hit specific industries. But the outcome equation is specified at the *regional* level, because that is where workers live, earn wages, and make decisions.

The shock does not map one-to-one onto regions: a single industry shock affects many regions, and a single region is exposed to many industry shocks, each to a different degree depending on its industrial composition. *Shift-share* instrumental variables (also known as Bartik instruments) provide a principled way to translate these shock-level instruments to the unit level. This section draws on the practical guide by Borusyak, Hull, and Jaravel (2025).

## Structure of a shift-share instrument

Consider a model where we wish to estimate the causal effect of treatment $x_i$ on outcome $y_i$ across units $i$:
$$ y_i = \beta x_i + \gamma' \mathbf{w}_i + \varepsilon_i $$
where $\mathbf{w}_i$ is a vector of controls. As before, OLS is biased when $x_i$ is correlated with $\varepsilon_i$. Suppose that a set of shocks $(g_1, \ldots, g_K)$ at some other level $k$ (industries, origin countries, age groups, etc.) are plausibly exogenous. Each unit $i$ has a known vector of **exposure shares** $(s_{i1}, \ldots, s_{iK})$ that capture how much unit $i$ is exposed to each shock $k$. The shift-share instrument aggregates these into a single unit-level variable:
$$ z_i = \sum_{k=1}^{K} \underbrace{s_{ik}}_{ \text{Share} } \cdot \underbrace{g_k}_{ \text{Shift} } $$

When the shares sum to one, $z_i$ is a share-weighted *average* of the shifts. The instrument inherits its exogeneity from the shifts, while the shares give it cross-sectional variation at the unit level --- different regions are affected differently by the same set of national shocks because their industrial compositions differ.

### Example 1: Inverse elasticity of regional labor supply

The canonical example is Bartik's (1991) instrument for local labor demand. Suppose we want to estimate the inverse elasticity of regional labor supply $\beta$ by relating wage growth $y_i$ to employment growth $x_i$ across regions $i$. Local employment can be decomposed across industries:
$$x_i = \sum_k \frac{X_{ik0}}{X_{i0}} \cdot x_{ik}$$
where $X_{ik0}/X_{i0}$ is the initial employment share of industry $k$ in region $i$, and $x_{ik}$ is the local industry growth rate. To isolate demand-driven variation, the Bartik instrument replaces local industry shifts $x_{ik}$ with *national* industry growth rates $g_k$, while keeping the local shares $s_{ik} = X_{ik0}/X_{i0}$. The national growth rates proxy for aggregate demand shifts and should be uncorrelated with local labor supply shocks.

### Example 2: US labor market impact of Chinese import competition

Autor, Dorn, and Hanson (2013) study how Chinese import competition affected US local labor markets. Their treatment is the change in import exposure per worker in commuting zone $i$, measured as a share-weighted sum of industry-level changes in US imports from China. Since realized US imports may reflect US-specific demand shocks, they instrument with Chinese import growth in eight other high-income countries:
$$ \Delta IPW_{oit} = \sum_j \underbrace{\frac{L_{ij,t-1}}{L_{uj,t-1}}}_{\text{Share}} \cdot \underbrace{\frac{\Delta M_{ocjt}}{L_{i,t-1}}}_{\text{Shift}} $$
where $L_{ij,t-1}/L_{uj,t-1}$ is region $i$'s lagged share of national employment in industry $j$, and $\Delta M_{ocjt}$ is the change in imports from China to other developed markets in industry $j$. Lagged employment avoids simultaneity. The identification relies on China's export surge being driven by internal supply-side factors (productivity growth, WTO accession) rather than correlated demand shocks across importing countries.

## Two paths to identification

As discussed above, the causal identification in the IV method requires the instrument to be relevant and exogenous. The core challenge with any shift-share instrument is arguing that $z_i$ is exogenous, i.e. uncorrelated with $\varepsilon_i$. Since $z_i$ combines two distinct sources of variation --- shifts and shares --- there are two paths to making this argument.

### Path 1: Exogenous shifts

The first strategy places the exogeneity burden on the shifts. If each shift $g_k$ is as-good-as-randomly assigned and only affects the outcome through the treatment, then a weighted average of many such random shifts will also be exogenous. The intuition is that of a "weighted average of lotteries": if each industry shock is like an independent draw, then the shift-share instrument --- which averages across many of them --- inherits this randomness by a law of large numbers argument.

What makes this powerful is that the shares need not be exogenous at all. Regions that specialize in high-skill industries may have systematically different unobservables from those that specialize in low-skill industries. But as long as the shocks hitting high-skill and low-skill industries are themselves random, these compositional differences wash out in expectation.

More formally, exogeneity of the instrument requires a weaker condition than full randomization of each $g_k$:
$$ \mathbb E\left[ g_k \left( \sum_i s_{ik} \varepsilon_i \right) \right] = 0 $$
This is sufficient for $\mathbb{E}[z_i \varepsilon_i] \approx 0$. In words: each shift shock must not be systematically correlated with the idiosyncratic unobservables of the units most heavily exposed to it.

Returning to the China shock example: even if regions with more manufacturing employment have systematically different labor market trends, the instrument is valid as long as China's productivity shocks across industries are unrelated to US regional labor market conditions.

**Requirements:**
- Many shifts $g_1, \ldots, g_K$ are necessary. Otherwise, there might be spurious correlation between shift shocks $g_k$ and average idiosyncratic shocks $\bar \varepsilon_i^k= \sum_i s_{ik} \varepsilon_i $.
- Shares must sum to one for each unit ($\sum_k s_{ik} = 1$). Otherwise, if shares do not sum to one, then $\mathbb{E}[z_i \mid s_{ik}] = \mu \sum_k s_{ik}$ where $\mu = \mathbb{E}[g_k]$. Units with a larger sum of shares systematically get higher values of the instrument, and this sum may be correlated with $\varepsilon_i$, creating bias. Including $S_i = \sum_k s_{ik}$ as a control resolves this.

**Practical considerations:**
- Shift-share aggregates of any shift-level confounders $q_k$ should be included as controls (i.e. control for $\sum_k s_{ik} q_k$)
- Shares should be lagged to the beginning of the natural experiment to avoid the shifts themselves reshaping the shares
- Standard errors should be "exposure-robust", obtained from the equivalent shift-level IV regression (available via the `ssaggregate` package in Stata and R)

### Path 2: Exogenous shares

A different strategy assumes that the exposure shares $s_{ik}$ are exogenous. This can be interpreted as each share satisfying a parallel trends condition: outcomes of units with high versus low values of $s_{ik}$ would have trended similarly absent the treatment $g_k$.

Under share exogeneity, the shift-share estimate can be viewed as pooling together $K$ "one-at-a-time" estimates, each using a single share $s_{ik}$ as the instrument. The exogenous shares approach is appropriate when the researcher is comfortable using any of the individual shares as an exogenous instrument --- that is, when there are no conceivable unobserved shocks that affect the outcome via the same shares used to construct the instrument. This is bolstered when the shares are "tailored" to the treatment, in the sense of mediating only the shocks to $x_i$ and not a broad set of shocks that might affect $y_i$.

For example, Card (2009) studies the effect of immigration on native wages across US cities. The share $s_{ik}$ is the fraction of immigrants from origin country $k$ living in city $i$ in 1980, and the shift $g_k$ is the national inflow of immigrants from country $k$ in later decades. The share of Cuban immigrants in Miami, say, is a plausible instrument because it is "tailored" --- it captures exposure specifically to Cuban immigration shocks, not to labor market shocks in general. The parallel trends assumption is that cities with high versus low Cuban immigrant shares would have seen similar wage trends absent the immigration surge.

**Practical considerations:**
- Shares must be "tailored" to the treatment, not "generic" (capturing exposure to many types of shocks)
- Balance tests should be performed on individual shares, focusing on those with high Rotemberg weights
- Rotemberg weights (computed via the `bartik_weight` command) measure the importance of each share instrument and the sensitivity of the estimate to violations of exogeneity for each share
- Sensitivity to alternative ways of combining share instruments should be checked (e.g. overidentification tests, visual instrument variable plots)
- Standard heteroskedasticity- or cluster-robust standard errors are appropriate

## Choosing between the two approaches

| | Exogenous Shifts | Exogenous Shares |
|---|---|---|
| **Identification** | Shifts are as-good-as-randomly assigned and only affect outcome through treatment | Each share satisfies parallel trends: units with high vs. low shares would have trended similarly absent treatment |
| **Estimation** | Control for sum of shares (if not one) and shift-share aggregates of shift-level controls | Check robustness to using share instruments directly (e.g. one share at a time, or pooled via 2SLS/LIML/GMM) |
| **Inference** | Exposure-robust standard errors from equivalent shift-level IV regression | Conventional heteroskedasticity- or cluster-robust standard errors |
| **Balance tests** | For both the shift-share instrument and the shifts | For both the instrument and shares with high Rotemberg weights |
| **Do not use when...** | Shifts are too few or endogenous to use directly as instruments | Shares are "generic" (capturing exposure to many types of shocks) |

In some settings one approach is clearly more appropriate. For instance, the exogenous shifts approach requires many shifts for the law of large numbers argument to work, while the exogenous shares approach requires shares that are tailored to the specific treatment. In other settings, thinking through the potential bias and efficiency properties under each approach can help the researcher decide.

# References

- Autor, David H., David Dorn, and Gordon H. Hanson. 2013. "The China Syndrome: Local Labor Market Impacts of Import Competition in the United States." *American Economic Review* 103(6): 2121--68.
- Bartik, Timothy J. 1991. *Who Benefits from State and Local Economic Development Policies?* W. E. Upjohn Institute for Employment Research.
- Borusyak, Kirill, Peter Hull, and Xavier Jaravel. 2022. "Quasi-Experimental Shift-Share Research Designs." *Review of Economic Studies* 89(1): 181--213.
- Borusyak, Kirill, Peter Hull, and Xavier Jaravel. 2025. "A Practical Guide to Shift-Share Instruments." *Journal of Economic Perspectives* 39(1): 181--204.
- Card, David. 2009. "Immigration and Inequality." *American Economic Review* 99(2): 1--21.
- Goldsmith-Pinkham, Paul, Isaac Sorkin, and Henry Swift. 2020. "Bartik Instruments: What, When, Why, and How." *American Economic Review* 110(8): 2586--2624.
- Adão, Rodrigo, Michal Kolesár, and Eduardo Morales. 2019. "Shift-Share Designs: Theory and Inference." *Quarterly Journal of Economics* 134(4): 1949--2010.
