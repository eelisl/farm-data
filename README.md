# Pre-assignment: farm-data

## Fast development - only 3 nights to code

I am currently working as a junior web developer by day and I have a family, so I have about 3 hours/day to complete this project.

I will be pushing to my repo as best as I can, so you can see my progress. I will make a remark below starting time and I will push changes to my repo, so my working times are visible.

### Working diary

- 14.1-15.1 night
- 15.1. night

## Constraints

- I will try to implement as many core features as possible
- I will be using tailwind CSS as frontend, so the CSS part gets done faster
- I will not be making everything "pixel-perfect" -> I will try to show as broad knowledge as I possibly can

## Technology choices

- DB: mySQL
- backend: Typescript node-server (express)
- frontend: ReactJS with TailwindCSS

## Prerequisites: 

- clone the whole repository to preferred location
- Need to have installed: 
    - node js
    - npm
    - mySql server

### Backend


- go to backend folder in terminal and run install all the node modules by running "npm install"
- to start typescript server, use command "npm start"
- make sure backend stays up, run it in the background or use different terminal for frontend

### Frontend

- go to frontend folder in terminal and install all the node modules by running "npm install" 
- start frontend in dev mode, use command "npm start"
- frontend can be found at "localhost:3000"


## Configurations

### Git repo

Clone this git repo to your preferred directory.

### Database

- import a mysql database dump in "data" folder
- change .env file to represent your preferred mysql database (.env file provided in the email)


## Tests

- All the tests were manual because of time constraints. I started writing some Jest tests at first, but scrapped it, because in order to deliver a MVP and because the app is quite simple, manual tests are the best way to go

### How I would've tested, if I was making this to a paying client?

If the project specs dictate, I would do TDD, so everything. But here's a list I think would be efficient to test automatically.

- Data validation
    - does backend behave as intended with data sent by the frontend?
    - does backend filter the right data?
- frontend
    - do tables look good with the results from the API

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

✔️ Create database and tables for data
✔️ Parse and validate data before insertion
✔️ insert data
### Backend

✔️ CSV parsing and validation
✔️ Endpoints to fetch data from farms with different granularities (by month, by metric)
- Aggregate calculation endpoints, endpoint which returns monthly averages, min/max and other statistical analysis
- Input and output validation
