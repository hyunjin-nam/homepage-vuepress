---
title: COVID-19
date: 2018-10-03 18:05:37 +0000
thumbnail: "/upload/bookstore/1-1.jpg"
description: Statistics about Corona-19

---


sdfdsf


<p>This is an R HTML document. When you click the <b>Knit HTML</b> button a web page will be generated that includes both content as well as the output of any embedded R code chunks within the document. You can embed an R code chunk like this:</p>

<!--begin.rcode

urlfile<-'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv'
raw.data<-read.csv(url(urlfile))

library(tidyr)
library(dplyr)


# Make Data

data <- raw.data[,-3:-4]
data [data$`Country/Region` == 'Mainland China',2] <- 'China'
colnames(data)[1] <- 'State'
colnames(data)[2] <- 'Country'

data <- data %>%
  pivot_longer(- c(State,Country), 
               names_to = "date", 
               values_to = "count")


data <- data %>%
  mutate( date = as.Date(data$date,  c("X%m.%d.%y"))) %>%
  mutate( count = as.numeric(count))


## Data Visualization
library(devtools)
#devtools::install_github('cttobin/ggthemr',force = TRUE)
library(ggthemr)
ggthemr("pale", layout="clean") 
#ggthemr_reset()

Which_Country <-'South Korea'
Which_Country <-'Sweden'

plot <- data %>%
  filter(Country == Which_Country) %>%
  ggplot(aes(x = date, y = count)) + 
  geom_bar(stat="identity",  width=0.8)+
  geom_text(aes(label=count), vjust=-0.3, size=2)+
  scale_x_date( breaks="1 day",date_labels = "%b %d") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1,size = 7)) + 
  labs(title = paste('Number of confirmed case in',Which_Country),
    x = "Date of incidents",
    y = "Number of confirmed case") 


end.rcode-->

<p>You can also embed plots, for example:</p>

<!--begin.rcode fig.width=7, fig.height=6
plot
end.rcode-->



sdfssfsf