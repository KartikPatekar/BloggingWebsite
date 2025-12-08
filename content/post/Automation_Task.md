---
title: "Automation, AI, and the Future of Work: Insights from Economics"
subtitle: ""
date: 2025-12-05T18:19:00+05:30
author: "Kartik Patekar"
tags: ["automation", "AI"]
categories: ["Economics"]
draft: false
description: "A economic analysis of how AI and automation affect labor markets, featuring a task-based framework by Acemoglu and Restrepo."
notes:
    1: Kaldor facts documents the empirical regularity that labor's share of income has remained stable over time.
    2: Inelastic labor supply is a common assumption in economics, and it means that the same amount of labor is available at any wage. The competition between firms determine the equilibrium wage instead of labor supply.
    3: Due to assumed inelastic labor supply, this model will not be able to capture change in labor demand directly as instead wages would be lowered. Relaxation of this assmption is needed to capture the change in labor demand.
    4: This framework assumes that the total measure of tasks do not change. Therefore creation of new labor intensive tasks leads to phasing out of some machine intensive tasks with low labor productivity to machine productivity. However, getting rid of this assumption does not have any meaningful impact on interpretation of the model.
---

## Introduction

As artificial intelligence and robotics accelerate technological change, a critical question emerges: What does automation mean for workers and wage inequality? This post explores this question through the lens of modern economic theory, drawing on groundbreaking research by Daron Acemoglu and Pascual Restrepo [[References]].

While automation has historically led to job creation and rising living standards, recent developments raise concerns about whether this pattern will persist. Using a **task-based framework**, we can decompose automation's effects into distinct channels: some harmful to workers (displacement), others beneficial (productivity and task creation). Understanding these mechanisms is essential as we attempt to figure out how the AI revolution will reshape the labor market.

This post synthesizes insights from the chapter **Artificial Intelligence, Automation, and Work** by *Daron Acemoglu and Pascual Restrepo* from *The Economics of Artificial Intelligence* handbook, providing both intuitive explanations and formal mathematical models to illuminate how different types of technological progress shape labor market outcomes.

## Channels of Automation's Impact on Labor Demand

There are several key mechanisms through which automation influences labor demand, wages, and labor's share in the economy. Importantly, the displacement effect stands out as the main negative force, while other mechanisms counterbalance it to varying degrees.

### The Displacement Effect: The Negative Impact

**Displacement effect**: Automation makes capital more productive and leads to the substitution of labor with capital. As a result, labor demand and equilibrium wages tend to decline, reducing employment and labor’s share of national income. This is the primary adverse channel through which automation can negatively affect workers.

### Countervailing Forces: Pathways for Positive Change

While the displacement effect negatively affects labor demand, history has shown us that technology growth has often led to increases in labor demand and wages. There are several countervailing forces against the displacement effect described above.

1. **Productivity Effect**: Automation reduced prices of goods and services whose production is automated. This enables consumers to spend more and therefore increases demand for goods and services that are not automated or are partially automated. 
2. **Capital accumulation**: Automation increases the demand for capital by making capital more productive. Over long period, the economy would accumulate capital and therefore increase the demand for labor. This could result in increase in wages.
3. **Deepening of Automation**: Some technologies can also improve the productivity of already-automated tasks and therefore do not displace labor demand significantly. However, they would still raise labor demand in production processes of non-automated tasks through productivity effects.

These forces may offset the displacement effect of automation on labor demand and wages. However, Acemoglu and Restrepo argue that they are not sufficient to fully counteract the negative impact of automation on the wage share—the proportion of national income going to labor. This is because automation necessarily increases the capital demand in existing production process, therefore squeezing labor into a narrower set of tasks and reducing labor share in national income. However, this is in contradiction with observed data showing steady wage share over level decades (Balanced growth {{< note id="1" />}}). To understand this, an additional mechanism must be considered.

4. **Reinstatement Effect**: Automation results in creation of new labor-intensive tasks, which increases labor demand and balances the growth process by increasing labor share. Looking at history, the rapid rise of automation in the 19th century UK was accompanied with expansion of jobs ranging from engineers, machinists, repairmen, conductors, and back-office workers to operate new technologies. The mechanization of agriculture in US during earlier twentieth century created new jobs in burgeoning industries of farm equipment and cotton processing. Looking forward, the rise of AI and robotics will likely create new roles such as prompt engineers, explanability specialists, data curaters, and several other roles that can only be identified in the future.



## Key Challenges

While these four positive forces tend to counteract the displacement effect of AI and automation, as history has often shown, there are several reasons for concern. Even though automation creates new jobs, it requires the displaced workers to identify and transition to new roles. This adjustment is often a slow process and can create a depressed labor market and negatively affect workers (at least for some period of time). The adjustment process is further complicated by the fact that the new tasks created by automation require workers to develop additional skills.  To successfully prepare future workers for these shifts, the education system must be strengthened to equip them with the necessary skills in a fast-changing world.

This mismatch between worker skill growth and technology growth can also limit the productivity gains from new technologies. If certain skills are necessary to operate new technologies but the education system is not able to equip sufficient workers with these skills, then the technology growth will outpace the productivity growth. This mismatch would result in uneven distribution of gains from automation, thus exacerbating inequality. 

# Modelling using Task-based framework

In this section, I present a formal mathematical model incorporating the key forces described above. This model, developed by Acemoglu and Restrepo, presents a task-based framework for understanding the impact of automation on employment.

The production process consists of a continuous series of tasks. A task is indexed by $x$ and results in production $y(x)$. For mathematical convenience, the set of all tasks is normalized to have measure 1 such that $x\in [N-1, N]$ (more on this normalization later). It is assumed that the aggregate output of the economy is given by the following Cobb-Douglas aggregator with unit elasticity
$$ \ln Y =  \int^N_{N-1} \ln y(x) dx$$

The (assumed substitutable) factors of production of a task $x$ are the human labor $l(x)$ and machines $m(x)$. The tasks are ordered so that the at the given time $t$, tasks $x\in [N-1, I]$ are automated while the tasks $x\in (I, N]$ are not. Automated tasks can be produced either by labor or machines, while non-automated tasks can only be produced by labor. Let $\gamma_M(x)$ and $\gamma_L(x)$ be the productivity of a single unit of machines and labor respectively. The total production in task $x$ is given by
$$
    y(x) = \begin{cases}
       \gamma_L(x) l(x) + \gamma_M(x) m(x) & \text{if } x \in [N-1, I] \\
       \gamma_L(x) l(x) & \text{if } x \in (I, N]
    \end{cases}
$$

With this description, we can better define the ordering. Tasks are ordered in increasing order of marginal productivity ratios $\frac{\gamma_L(x)}{\gamma_M(x)}$ (we can think of non-automated tasks as having $\gamma_M = 0 \implies \frac{\gamma_L(x)}{\gamma_M(x)} = \infty$ and therefore placed last). The threshold $I$ denotes the frontier of automation possibilities—the most "difficult" task that can currently be automated. An increase in automation can be thought of as an increase in $I$.

The total supply of labor and capital is given by $L$ and $K$ respectively, and these are assumed to be fixed and inelastic {{< note id="2" />}} {{< note id="3" />}}. I will try to present the extension of the framework with elastic labor supply later. 

### Types of Technological Change

As discussed earlier, there are four main channels through which technological progress affects labor markets. Each channel reflects a distinct way that technological advances improve productivity. Because these types of technological growth differ, they have varying impacts on labor demand, wages, and the labor share of income. Let’s explore these forms of technological change and see how they are represented in the model.

1. **Labor-augmenting technological advances**: These complement labor in production by increasing labor productivity given by $\gamma_L(x)$. 
2. **Automation at extensive margin**:  This reflects the increase in proportion of tasks that can be automated (increase in $I$). The newly automated tasks, which could earlier only be performed by labor, can now be performed by either labor or machines. 
3. **Automation at intensive margin (Deepening of automation)**: This reflects increase in productivity of machines in tasks that were already automated and this growth is captured by an increase in $\gamma_M(x)$ in the framework. 
4. **Creation of new tasks**: Automation leads to creation of new tasks pertaining to manufacturing, maintenance, and management of machines. This is captured by an increase in $I$ in the framework. 

### Equilibrium

Let the equilibrium wage rate be $W$ and the rental cost of machines be $R$. The following simplifying assumption help with the further analysis
- *Assumption A1.1*: $\frac{W}{R} > \frac{\gamma_L(I)}{\gamma_M(I)}$: This ensures that any task that can be automated ($x \in [N-1, I]$) is automated as machines deliver higher productivity per unit cost.
- *Assumption A1.2*: $\frac{\gamma_L(N)}{\gamma_M(N-1)} > \frac{W}{R}$: An introduction of new tasks resulting in increase in $N$ will increase aggregate output. This is because, per unit cost, the labor intensive tasks at upper of distribution $(N)$ have higher production than automates tasks at lower end $(N-1)$. 

In the absence of assumption *A1.1*, advancement of the technology frontier would not lead to adoption of new technologies since labor would retain a comparative advantage. Future work may explore ideas from Acemoglu and Restrepo (2016) that relax this assumption and distinguish between the technology frontier and equilibrium automation. 

Under these assumptions, it can be shown that the aggregate output is given by the constant return to scale Cobb-Douglas production function

$$ Y = B K^{I-N+1} L^{N-I} $$

$B$ is a constant depending on machine and labor productivities, as well as on $N$ and $I$. The output elasticities wrt capital (machines) and labor is given by $I-N+1$ and $N-I$ respectively. As is well known for Cobb-Douglas production function, the share of labor income and capital income in national income is given by

$$s_L = \frac{WL}{Y} = N - I$$
$$s_K = 1 - s_L = I - N + 1$$

The take-away from this expression is that the labor income share increases as more tasks are created (increase in $N$), but decreases as the technology frontier expends (increase in $I$).

{{< toggle title="Mathematical derivation of aggregate output" collapsed="true" >}}
The aggregate output is given by
$$
\begin{align*}
    \ln Y = \max_{\{m(x), l(x)\}} \int_{N-1}^I \ln(\gamma_M(x) m(x))dx + \int_I^N \ln(\gamma_L(x) l(x)) dx \\
    s.t. ~~ \int_{N-1}^I m(x) dx = K, ~~ \int_I^N l(x) dx = L
\end{align*}
$$

Maximizing this using lagrange multiplier shows results in constant $m(x)$ and $l(x)$ in the respective intervals. This gives the aggregate output as

$$
\begin{align*}
    \ln Y &= \int_{N-1}^I \ln(\frac{\gamma_M(x) K}{I-N+1})dx + \int_I^N \ln(\frac{\gamma_L(x) L}{N-I}) dx \\
    &=  \ln B + (I-N+1) \ln K + (N-I) \ln L \\
\end{align*}
$$

where B is given by

$$
\begin{align*}
    B &=  \left( \frac{1}{I - N + 1} \right)^{I - N + 1}
            \left( \frac{1}{N - I} \right)^{N - I}
            \exp\left\{ 
        \int_{N-1}^{I} \ln \gamma_M \, x \, dx + 
        \int_{I}^{N} \ln \gamma_L \, x \, dx 
    \right\}
\end{align*}
$$

To compute equilibrium wages, the standard method is to optimize over aggregate labor demand $L$ and capital demand by producers $K$. The aggregate demanded equals the aggregate supply of labor and capital at equilibrium wage.  

{{< /toggle >}}


{{< toggle title = "Interpreting assumption on price ratio" collapsed = "true" >}}
Instead of expressing assumptions *A1.1* and *A1.2* in terms of equilibrium wage and capital rent, which are determined ex-post, we can express these assumptions using ex-ante aggregate capital and labor available in the economy. To see this, note that, in equilibrium
$$ \frac{W}{R} = \left(\frac{WL/Y}{RK/Y}\right)\frac{K}{L} = \frac{s_L K}{s_K L} = \left(\frac{N-I}{I-N+1}\right)\frac{K}{L} $$
Therefore, assumption 2 can we re-written as 
$$ \frac{K}{L} \in (\underline \kappa, \bar \kappa)$$
with 
$$\underline  \kappa = \frac{I - N + 1}{N - I} \, \frac{\gamma_L(I)}{\gamma_M(I)} ,\ \text{and}\ \overline{\kappa} = \frac{I - N + 1}{N - I} \, \frac{\gamma_L(N)}{\gamma_M(N - I)} $$
turned around, it means that as long as capital to labor ratio is within this range, we will have the equilibrium described above where all automated tasks are performed by machines and task creation leads to overall productivity gains.

{{< /toggle >}}

## Technology growth effects on labor demand

Under this framework, it is possible to go back to the five mechanisms of automation's impact on labor market discussed above and understand their influence on labor markets through the model.

#### Improvement in technology frontier $I$: Displacement effect and Productivity effect

From the equation $W = (N-I)\frac{Y}{L}$, it is easy to separate out the effect of technology frontier improvement on wage rate

$$ 
\frac{d\ln W}{dI} =
    \underbrace{\frac{d\ln(N-I)}{dI}}_{\substack{\text{Displacement effect $<0$}}}
    +
    \underbrace{\frac{d\ln(Y/L)}{dI}}_{\substack{\text{Productivity effect $>0$}}} 
$$

Technology advancement displaces workers by substituting workers by machines in the production process. This displacement effect leads to reduction in wages. However, this effect is counteracted by the productivity effect, where the gains from increased production are shared with workers through increase in wages. The positivity of the productivity effect is a direct mathematical consequence of assumption *A1.1*. A change $\delta I$ leads to subsitution of $\frac{W}{\delta I} $ ( total productivity $\frac{W \gamma_L(I)}{\delta I} $) by $\frac{K}{\delta I} $ units of machines (higher productivity $\frac{K \gamma_K(I)}{\delta I} $).

This also highlights what technologies are more worrysome when looking at their effect of wages. The most brilliant and productive technologies in AI and robotings would likely have large productivity effects leading to higher (real) wages stemming from an increasing pie. However, the advancements in "so-so" technologies, which are just productive enough to replace workers but do not increase output by much, would lead to net losses for the workers. Mathematically, the productivity effect is given by

$$\frac{d\ln(Y/L)}{dI} = \ln\left( \frac{W}{\gamma_L(I)} \right) - \ln\left( \frac{R}{\gamma_M(I)} \right) > 0$$

and the positive productivity effect is smallest when the new technologies are only marginally better than labor in production $\gamma_M(I)/R \approx \gamma_L(I)/W$.

On the other hand, automation always increases output more than wage, resulting in declining share of labor in national income (making capital owners well-off)
$$\frac{d s_L}{d I} = -1 < 0$$

#### Labor-augmenting technological change: Only productivity effect
Technologies that only increase worker productivity $\gamma_L$ but do not change task content lead to higher overall output without displacing workers from their jobs. If this technological change is not large enough to shift some of the prodctions tasks from machine to labor (which would result in violation of assumption *A1.1*), then wage increase would be proportional to the productivity increase. The share of labor in national income would not be affected. If, however, labor productivity increases so much that it becomes more favorable to employ labor in tasks that were earlier accomplished by machines, labor share in national income would also increase.


#### Capital Accumulation

The model discussed above assumed that capital and labor supply is fixed, which is likely valid in the short term. Therefore, an increate in automation (higher I), leads to increase in rental rate $R$. 

In the medium run, the supply of machines or capital would increase. Since machines and labor are complements in production, the higher capital would increase wages due to higher productivity. However, we still have $s_L = \frac{WL}{Y} = N - I$ and therefore the increase in wage do not keep up with the increase in output due to capital accumulation, leader to decline in wage-share.


#### Automation at intensive margin: Deepening of automation

Improvements in productivity of machines in already automated task is captured by an increase in $\gamma_M(x)$. To see the effect on wages, assume for now that all tasks have constant macine productivity, $\gamma_M(x) = \gamma_M$. The impact of deepening of automation on wages is captured by 

$$ \frac{d \ln W}{d \ln \gamma_M} = \frac{\ln (Y/L)}{d \ln \gamma_M} = I - N + 1 > 0$$

Hence, the deepening of automation will always lead to increase labor demand and wages, at it increases the overall output levels and result in more gains being shared with workers. However, as before, the increase in wages are smaller than the increase in output, resulting in a decline in wage-share.

#### Creation of new labor-intensive tasks: Reinstatement Effect
Advances in technology leads to creation of new tasks (captured by an increase in $N$) in which workers have comparitive advantage over machines. According to assumption *A1.2*, this task creation results in an increase of productivity expressed by 

$$ \frac{d\ln Y/L}{dN} = \ln\left( \frac{R}{\gamma_M(N-1)} \right) - \ln\left( \frac{W}{\gamma_L(N)} \right) > 0  $$

More importantly, since wage-share in economy is given by proportion of tasks that are labor-intensive ($s_L = \frac{WL}{Y} = N - I$), the creation of new labor intensive tasks increases labor demand and equilibrium wages also through reinstantement effect

$$\frac{d\ln W}{dN} =
\underbrace{
    \ln\left(\frac{R}{\gamma_M(n-1)}\right)
    - \ln\left(\frac{W}{\gamma_L(N)}\right)
}_{\text{Productivity effect$>0$}}
+ 
\underbrace{
    \frac{1}{N - I}
}_{\text{Reinstatement effect$>0$}} $$

Unlike the other countervalining forces, the re-instatement effect has a positive impact on labor share 
$$ \frac{ds_L}{dN} = 1 $$

The combined effect of task creation (increase in $N$) and labor displacement (increase in $I$) is given by

$$ \begin{align*}
    d\ln W = &\left[ \ln\left( \frac{R}{\gamma_M(N-1)} \right) - \ln\left( \frac{W}{\gamma_L(N)} \right) \right] dN \\
    &\qquad + \left[ \ln\left( \frac{W}{\gamma_L(I)} \right) - \ln\left( \frac{R}{\gamma_M(I)} \right) \right] dI
    + \frac{1}{N-I} (dN - dI) \\
    d s_L &= dN - dI
\end{align*} $$

When the task creation rates and the displacement rates are same, wages grow proportionally to the output, resulting in a stable wage share as observed in historical growth. The displacement effect and reinstatement effect cancels out, and the productivity effect (leading to capital accumulation over time) lead to wage growth.

## Model takeaways

This simplified model enables us to formalize the economic ideas about the mechanisms through which AI and automation influences the labor markets. Importantly, it highlights how the increased labor or machine productivity due to technology growth can lead to higher labor demand and wage, but they do not counter the decline of labor share in national income caused by the displacement effect. Even in longer term, the accumulation of capital leads to higher productivity and higher wages, but does not increase the labor share in national income. It is only the creation of new labor-intensive tasks that accomodates the workers that accomodates the workers displaced from now automated tasks which can counter the labor share decline. Historically, this reinstatement effect has managed to counter the displacement effect to maintain constant wage-share. Whether the current developments in AI and automation will lead to sufficient creation of new tasks will be a key determinant of the future labor market outcomes.

It is important to note that while the mathematical simplifications used in this model are useful for exposition and clarity, the core results are robust and hold more generally. Relaxing the functional form of aggregate output does not change the qualitative findings. Additionally, the assumption that the measure of tasks remains constant can be relaxed with minor technical modifications without altering the fundamental insights.  

## Unemployment

In the model above, labor supply was assumed to be perfectly inelastic, so any change in labor demand manifests as wage changes. In reality, however, equilibrium employment depends directly on labor demand. Therefore, new automation technologies can lead to higher or lower unemployment rates through changes in task content and the creation of new labor-intensive tasks.


# References
1. https://pascual.scripts.mit.edu/research/ai_nber_chapter/ai_nber_chapter.pdf