# Command Line Challenge
### Summary

```
1. The prompt for this assignment was to write a command line
program to display the current open food trucks in San
Francisco.  The trucks are displayed 10 at a time and more
trucks can be seen based on user input.  All of the display
and commands are seen/done in the command line.  The food
truck's name and address are displayed in alphabetical
order.  The script for this program is located in
'Command-Line-Script/command.js'

2. For purpose of better visualization and for fun I decided
to make this an app in React.js as well.  Please feel free
to check this out if you wish.  It is a very simple app
that simply displays the food trucks in a table format and
more trucks can be seen on user scroll.
```

### Instruction For Use

##### Command Line Program

```
1. To install dependencies:
From the directory of the Program '/Command-Line-Challenge' run `npm install`
2. To run the program:
From the directory of the Program '/Command-Line-Challenge' run `node Command-Line-Script/command.js`
3. The first display will take 10 seconds to show as I set this using set timeout
to ensure that the data is retrieved before the display function is run
4. After this you will be prompted to answer the question `Show More Food Trucks? Y or N :`
Answering Y will show 10 more food trucks if that many are currently open
Otherwise the readline closes and the process (steps 2 - 4) can be repeated
```

##### React.js Program

```
1. To install dependencies:
From the directory of the Program '/Command-Line-Challenge' run `npm install`
2. In two separate terminals:
run `npm run react-dev` and `npm start`
3. To see the program:
Go to `http://localhost:2222`
4. More food trucks are displayed on user scroll
```