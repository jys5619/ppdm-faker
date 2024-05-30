import { fakerKO as faker } from "@faker-js/faker";
import { DbUtil } from "../db-util";

export function MenuRole(menus: any[]) {
  const menuRoles = [];

  for (const menu of menus) {
    const id = faker.string.uuid();
    const name = "USER";
    const createdAt = faker.date.past().toISOString().slice(0, 19).replace("T", " ");
    const updatedAt = faker.date.recent().toISOString().slice(0, 19).replace("T", " ");
    const menuId = menu.id;
    menuRoles.push({ id, name, menuId, createdAt, updatedAt });
  }

  const result: string[] = [];

  menuRoles.forEach(data => {
    result.push(
      `INSERT INTO TB_MENU_ROLE (ID, NAME, MENU_ID, CREATED_AT, UPDATED_AT)
       VALUES ('${data.id}','${data.name}', '${data.menuId}', '${data.createdAt}', '${data.updatedAt}');`
    );
  });

  console.log("CREATE TB_MENU_ROLE".padEnd(80, "-") + `(${result.length})`);
  return { menuRoles, result };
}
