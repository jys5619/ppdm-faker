import { fakerKO as faker } from '@faker-js/faker'

export function User(cnt: number): string[] {
  const sampleData = []
  for (let i = 0; i < cnt; i++) {
    const id = faker.string.uuid()
    const name = faker.person.firstName() + faker.person.lastName()
    const email = faker.internet.email()
    const createdAt = faker.date.past().toISOString().slice(0, 19).replace('T', ' ')
    const updatedAt = faker.date.recent().toISOString().slice(0, 19).replace('T', ' ')
    sampleData.push({ id, name, email, createdAt, updatedAt })
  }

  const result: string[] = []

  sampleData.forEach((data) => {
    result.push(
      `INSERT INTO "USER" ("ID", "NAME", "EMAIL", "CREATED_AT", "UPDATED_AT") VALUES ('${data.id}','${data.name}', '${data.email}', '${data.createdAt}', '${data.updatedAt}');`,
    )
  })
  return result
}
