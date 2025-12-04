const NameGen = require('./UserGen/NameGen');
const GenderGen = require('./UserGen/GenderGen');
const BirthdateGen = require('./UserGen/BirthdateGen');
// const AddressGen = require('/AddressGen');

const nameGen = new NameGen();
// const nameGen = new NameGen('이름후보1.txt'); // 텍스트 파일에 있는 이름 후보를 읽어오도록 확장할 수 있다.
// const newName = nameGen.createName();
const newName = nameGen.generate();

const genderGen = new GenderGen('ENG');
// const genderGen = new e('KOR'); // 언어에 맞는 성별명을 만들도록 확장
// const newGender = genderGen.makeGender();
const newGender = genderGen.generate();

const birthdateGen = new BirthdateGen(2000, 2050);
// const newBirthdate = birthdateGen.generateBirthdate();
const newBirthdate = birthdateGen.generate();

// const addressGen = new AddressGen();
// const newAddress = AddressGen.generateBirthdate();
console.log(`${newName} ${newGender} ${newBirthdate}`);
