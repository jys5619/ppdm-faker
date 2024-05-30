import { fakerKO as faker } from "@faker-js/faker";

export function User(cnt: number) {
  const PASSWORD = "$2b$10$Mp5R2AHplfghFMQJ5sQhae8cM1yiqv9TPAKlLmqGZxyhBS4J3rHCS"; // aaaa1111
  const users = [];
  for (let i = 0; i < cnt; i++) {
    const id = faker.string.uuid();
    const name = faker.person.firstName() + faker.person.lastName();
    const email = faker.internet.email();
    const createdAt = faker.date.past().toISOString().slice(0, 19).replace("T", " ");
    const updatedAt = faker.date.recent().toISOString().slice(0, 19).replace("T", " ");
    users.push({ id, name, email, createdAt, updatedAt });
  }

  const result: string[] = [];

  users.forEach(data => {
    result.push(
      `INSERT INTO TB_USER (ID, NAME, EMAIL, PASSWORD, STATE, CREATED_AT, UPDATED_AT) 
       VALUES ('${data.id}','${data.name}', '${data.email}', '${PASSWORD}', 'Active', '${data.createdAt}', '${data.updatedAt}');`
    );
  });

  // const user = {
  //   name: "홍길동",
  //   email: "email@domain.com",
  //   password: "${PASSWORD}",
  //   createdAt: "2024-05-29 05:37:38",
  //   updatedAt: "2024-05-29 05:37:38",
  //   id: "ce1f310a-f96d-4a3d-856c-89c779ab0998",
  // };

  // result.push(
  //   `INSERT INTO TB_USER (ID, NAME, EMAIL, PASSWORD, STATE, CREATED_AT, UPDATED_AT)
  //    VALUES ('${user.id}','${user.name}', '${user.email}', '${PASSWORD}', 'Active', '${user.createdAt}', '${user.updatedAt}');`
  // );

  console.log("CREATE TB_USER".padEnd(80, "-") + `(${result.length})`);
  return { users, result };
}
