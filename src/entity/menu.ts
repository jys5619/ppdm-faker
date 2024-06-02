import { fakerKO as faker } from '@faker-js/faker'

interface IMenu {
  id?: string
  name?: string
  url?: string
  parentName?: string
  parentId?: string
  sequence?: number
}

export function Menu() {
  let menus = []
  let result: string[] = []

  // MAIN
  let mainMenus: IMenu[] = [
    { name: 'My', url: `/my`, sequence: 1 },
    { name: 'Data', url: `/data/database/info`, sequence: 2 },
    { name: 'Sample', url: `/sample/ui/typography`, sequence: 3 },
    { parentName: 'Data', name: 'Database', url: `/data/database/info`, sequence: 1 },
    { parentName: 'Sample', name: 'UI', url: `/sample/ui/typography`, sequence: 1 },
    { parentName: 'Sample', name: 'DB', url: `/sample/db/connection`, sequence: 2 },
    { parentName: 'Database', name: 'Database Info', url: `/data/database/info`, sequence: 1 },
    { parentName: 'UI', name: 'Typography', url: `/sample/ui/typography`, sequence: 1 },
    { parentName: 'UI', name: 'Link', url: `/sample/ui/link`, sequence: 2 },
    { parentName: 'UI', name: 'Button', url: `/sample/ui/button`, sequence: 3 },
    { parentName: 'UI', name: 'Table ', url: `/sample/ui/table`, sequence: 4 },
    { parentName: 'UI', name: 'Input ', url: `/sample/ui/input`, sequence: 5 },
    { parentName: 'UI', name: 'Input ', url: `/sample/ui/input`, sequence: 5 },
    { parentName: 'DB', name: 'Connection', url: `/sample/db/connection`, sequence: 1 },
    { parentName: 'DB', name: 'Query Form', url: `/sample/db/query-form`, sequence: 1 },
  ]

  mainMenus = mainMenus.map((m) => {
    return { ...m, id: faker.string.uuid() }
  })

  mainMenus = mainMenus.map((m) => {
    const findMenu = m.parentName && mainMenus.find((mm) => mm.name === m.parentName)
    return {
      ...m,
      parentId: findMenu ? findMenu.id : '',
    }
  })

  for (const menu of mainMenus) {
    const id = menu.id
    const name = menu.name
    const url = menu.url
    const parentId = menu.parentId || ''
    const sequence = menu.sequence || 0
    const createdAt = faker.date.past().toISOString().slice(0, 19).replace('T', ' ')
    const updatedAt = faker.date.recent().toISOString().slice(0, 19).replace('T', ' ')
    menus.push({ id, name, url, parentId, sequence, createdAt, updatedAt })
  }

  menus.forEach((data) => {
    result.push(
      `INSERT INTO TB_MENU (ID, NAME, URL, STATE, PARENT_ID, SEQUENCE, CREATED_AT, UPDATED_AT) VALUES ('${data.id}','${data.name}', '${data.url}', 'Active', '${data.parentId}', ${data.sequence}, '${data.createdAt}', '${data.updatedAt}');`,
    )
  })

  console.log('CREATE TB_MENU'.padEnd(80, '-') + `(${result.length})`)
  return { menus, result }
}
