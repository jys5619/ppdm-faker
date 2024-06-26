import { DbUtil } from "./db-util";
import { Database } from "./entity/database";
import { Menu } from "./entity/menu";
import { MenuRole } from "./entity/menu-role";
import { QueryForm } from "./entity/query-form";
import { User } from "./entity/user";
import { UserRole } from "./entity/user-role";
import { promisify } from "util";

async function run() {
  const sqlite3 = require("sqlite3").verbose();
  const db = new sqlite3.Database("D:/dev/workspace/ppdm/ppdm-server/db/dev/ppdm.db");
  const query = promisify(db.all).bind(db);

  const sqlList: string[] = [];
  sqlList.push("DELETE FROM TB_USER_ROLE");
  sqlList.push("DELETE FROM TB_USER");
  sqlList.push("DELETE FROM TB_MENU_ROLE");
  sqlList.push("DELETE FROM TB_MENU");
  sqlList.push("DELETE FROM TB_DATABASE");
  sqlList.push("DELETE FROM TB_QUERY_FORM");
  sqlList.push("DELETE FROM TB_QUERY_FORM_INPUT");
  sqlList.push("DELETE FROM TB_QUERY_FORM_SQL");
  console.log("DELETE TABLE".padEnd(80, "-") + `(${sqlList.length})`);

  const userData = User(100);
  sqlList.push(...userData.result);

  const userRoleData = UserRole(userData.users);
  sqlList.push(...userRoleData.result);

  const menuData = Menu();
  sqlList.push(...menuData.result);

  const menuRoleData = MenuRole(menuData.menus);
  sqlList.push(...menuRoleData.result);

  const databaseData = Database();
  sqlList.push(...databaseData.result);

  const queryFormData = QueryForm();
  sqlList.push(...queryFormData.result);

  for (const sql of sqlList) {
    await query(sql);
  }
}

run();
