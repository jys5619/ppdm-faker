import { fakerKO as faker } from "@faker-js/faker";
import { DbUtil } from "../db-util";

export function UserRole(users: any[]) {
  const userRoles = [];

  for (const user of users) {
    const id = faker.string.uuid();
    const name = "USER";
    const createdAt = faker.date.past().toISOString().slice(0, 19).replace("T", " ");
    const updatedAt = faker.date.recent().toISOString().slice(0, 19).replace("T", " ");
    const userId = user.id;
    userRoles.push({ id, name, userId, createdAt, updatedAt });
  }

  const result: string[] = [];

  userRoles.forEach(data => {
    result.push(
      `INSERT INTO TB_USER_ROLE (ID, NAME, USER_ID, CREATED_AT, UPDATED_AT)
       VALUES ('${data.id}','${data.name}', '${data.userId}', '${data.createdAt}', '${data.updatedAt}');`
    );
  });

  console.log("CREATE TB_USER_ROLE".padEnd(80, "-") + `(${result.length})`);
  return { userRoles, result };
}
