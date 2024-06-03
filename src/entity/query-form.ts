import { fakerKO as faker } from "@faker-js/faker";

interface IQueryForm {
  title?: string;
  favorites?: string;
  description?: string;
  inputList?: {
    name?: string;
    title?: string;
    type?: string;
    arrayData?: string;
  }[];
  sqlList?: {
    title?: string;
    description?: string;
    sql?: string;
  }[];
  state?: string;
}

export function QueryForm() {
  let dataList = [];
  let result: string[] = [];

  // MAIN
  let mainIQueryForms: IQueryForm[] = [
    {
      title: "SQL1",
      favorites: "#1 #2 #3",
      description: "SQL1 Description",
      inputList: [
        {
          name: "v1",
          title: "V1필드",
          type: "INPUT",
          arrayData: "",
        },
        {
          name: "v2",
          title: "V2필드",
          type: "SELECT",
          arrayData: "AA|BB|CC",
        },
      ],
      sqlList: [
        {
          title: "쿼리문1",
          description: "쿼리문1 설명",
          sql: "SELECT :v1, :v2 FROM DUAL",
        },
        {
          title: "쿼리문2",
          description: "쿼리문2 설명",
          sql: "SELECT :v1, :v2 FROM DUAL",
        },
      ],
      state: "Active",
    },
  ];

  mainIQueryForms = mainIQueryForms.map(m => {
    return { ...m, id: faker.string.uuid() };
  });

  for (const mainIQueryForm of mainIQueryForms) {
    const id = faker.string.uuid();
    const createdAt = faker.date.past().toISOString().slice(0, 19).replace("T", " ");
    const updatedAt = faker.date.recent().toISOString().slice(0, 19).replace("T", " ");
    dataList.push({ id, createdAt, updatedAt, ...mainIQueryForm });
  }

  dataList.forEach(data => {
    result.push(
      `INSERT INTO TB_QUERY_FORM (ID, TITLE, FAVORITES, DESCRIPTION, STATE, CREATED_AT, UPDATED_AT) VALUES ('${data.id}','${data.title}', '${data.favorites}', '${data.description}', '${data.state}', '${data.createdAt}', '${data.updatedAt}');`
    );

    if (data.inputList && data.inputList.length > 0) {
      data.inputList.forEach(input => {
        result.push(
          `INSERT INTO TB_QUERY_FORM_INPUT (ID, NAME, TITLE, TYPE,ARRAY_DATA, QUERY_FORM_ID CREATED_AT, UPDATED_AT) VALUES ('${faker.string.uuid()}','${
            input.name
          }', '${input.title}', '${input.type}', '${input.arrayData}', '${data.id}', '${
            data.createdAt
          }', '${data.updatedAt}');`
        );
      });
    }

    if (data.sqlList && data.sqlList.length > 0) {
      data.sqlList.forEach(sql => {
        result.push(
          `INSERT INTO TB_QUERY_FORM_SQL (ID, TITLE, DESCRIPTION, SQL, QUERY_FORM_ID CREATED_AT, UPDATED_AT) VALUES ('${faker.string.uuid()}','${
            sql.title
          }','${sql.description}','${sql.sql}','${data.id}','${data.createdAt}', '${
            data.updatedAt
          }');`
        );
      });
    }
  });

  console.log("CREATE TB_QUERY_FORM".padEnd(80, "-") + `(${result.length})`);
  return { dataList, result };
}
