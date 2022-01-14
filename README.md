# Pre-assignment: farm-data

## Fast development - only 4 nights to code

I am currently working as a junior web developer by day, so I have about 3 hours/day to complete this project.

I will be pushing to my repo constantly, so you can see my progress. I will make a remark below starting time and I will push changes to my repo, so my working times are visible.

### Working diary

- 14.1-15.1 night

## Constraints

- I will try to implement as many core features as possible
- I will be using tailwind CSS as frontend, so the CSS part gets done faster
- I will not be making everything "pixel-perfect" -> I will try to show as broad knowledge as I possibly can

## Technology choices

- DB: mySQL
- backend: node-server (express)
- frontend: ReactJS

## Prerequisites: 

- clone the whole repository to preferred location
- Need to have installed: 
    - node js
    - npm
    - mySql

### Database

- import a mysql database dump in "data" folder

### Backend

- go to backend folder in terminal and run [node index.js]

### Frontend

- go to frontend folder in terminal and run npm start


## Configurations

TBD

## Tests

- frontend tests with Jest
- backend TBD

# TODO

### Frontend
- write simple tests
    - heading, button render
    - fetch and if it doesn't work, error
    - render after fetch
- make 3 views
    - Press teh button
    - result page
    - give new data as CSV
- make get request to backend

## Database init

- Create database and tables for data
- Parse and validate data before dump
- dump data
### Backend

- CSV parsing and validation
- Endpoints to fetch data from farms with different granularities (by month, by metric)
- Aggregate calculation endpoints, endpoint which returns monthly averages, min/max and other statistical analysis
- Input and output validation
