const firstName: string = "Jon";
const lastName: string = "Dou";
const age: number = 21;
const isMarried: boolean = false;
const sex: string = "M";
const address: string | undefined = undefined;
const phone: string | undefined = "094588372";
const hobbies: string[] = ["reading", "running"];
const id: number = 73248376248;
const isConfirmed: boolean = true;

function showUserData(
  firstName: string,
  lastName: string,
  address: string | undefined,
  phone: string | undefined
): void {
  return console.log(
    `User: ${firstName} ${lastName}${address ? `, address: ${address},` : ""}${
      phone ? `, phone: ${phone}` : ""
    }`
  );
}

showUserData(firstName, lastName, address, phone);
