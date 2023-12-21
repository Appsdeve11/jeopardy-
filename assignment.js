// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const response = await fetch('API_URL');
    const data = await response.json();
    const categoryIds = data.map(category => category.id);
    return categoryIds;
  }
  
/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    const response = await fetch(`API_URL/${catId}`);
    const categoryData = await response.json();
    const clues = categoryData.map(clue => ({ question: clue.question, answer: clue.answer, showing: null }));
    return { title: categoryData.title, clues: clues };
  }

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    const table = document.querySelector('#jeopardy');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    const td = evt.target;
    const question = td.dataset.question;
    const answer = td.dataset.answer;
    const showing = td.dataset.showing;

    if (showing === null) {
        td.textContent = question;
        td.dataset.showing = 'question';
      } else if (showing === 'question') {
        td.textContent = answer;
        td.dataset.showing = 'answer';
      }
    }

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    const table = document.querySelector('#jeopardy');
    const loadingSpinner = document.querySelector('#loading-spinner');
    const startButton = document.querySelector('#start-button');
  
    table.innerHTML = '';
    loadingSpinner.style.display = 'block';
    startButton.textContent = 'Loading...';
  }
  

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    const loadingSpinner = document.querySelector('#loading-spinner');
    const startButton = document.querySelector('#start-button');
  
    loadingSpinner.style.display = 'none';
    startButton.textContent = 'Start';};