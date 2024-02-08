import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
  console.error('❌ Invalid enviroment variables', _env.error.format())
  
  // Nenhum código a partir daqui executa mais. Isso vai derrubar a aplicação.
  // Ou seja, não tem como nosso código continuar se der algum erro na validação das variáveis de ambientes
  throw new Error('Invalid environment variables.')
}

export const env = _env.data
