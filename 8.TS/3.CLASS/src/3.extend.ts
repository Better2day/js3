// JS에서는 상속을 한 번만 받을 수 있지만, TS에서는 두 번 이상도 가능
interface BasicInfo {
  name: string;
  age: number;
}

interface ContactInfo {
  email: string;
  phone: string;
}

interface Employee extends BasicInfo, ContactInfo {
  employeeId: number;
}

const john: Employee = {
  name: 'John',
  age: 25,
  email: 'john@john.com',
  phone: '123-456-7890',
  employeeId: 1001
}

console.log(`John info: ${john.name}, ${john.age}`);
