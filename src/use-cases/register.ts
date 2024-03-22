import { IUsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

interface IRegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor( private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)
  
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
  
    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }
  
    // const prismaUsersRepository = new PrismaUsersRepository()
  
    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}