function leftTriangle(numOfRows) {
  let stars = '';
  for (let row = 1; row <= numOfRows; row++) {
    for (let col = 1; col <= row; col++) {
      stars += '*';
    }
    console.log(stars);
    stars = '';
  }
}

function rightTriangle(numOfRows) {
  let stars = '';
  for (let row = numOfRows - 1; row >= 0; row--) {
    for (let col = 1; col <= row; col++) {
      stars += ' ';
    }
    for (let col = 1; col <= numOfRows - row; col++) {
      stars += '*';
    }
    console.log(stars);
    stars = '';
  }
}

leftTriangle(5);
rightTriangle(5);


function leftTriangle_repeat(num_of_rows) {
  for (let r = 1; r <= num_of_rows; r++) {
    console.log('*'.repeat(r));

  }
}

function rightTriangle_repeat(num_of_rows) {
  for (let row = 1; row <= num_of_rows; row++) {
    console.log(' '.repeat(num_of_rows - row) + '*'.repeat(row));
  }
}

leftTriangle_repeat(5);
rightTriangle_repeat(5);