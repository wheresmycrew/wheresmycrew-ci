import { exec } from 'https://deno.land/x/exec@0.0.5/mod.ts'
import { Application, Router } from 'https://deno.land/x/oak@v6.0.1/mod.ts'

let router = new Router()

router
  .get('/', (context) => {
    context.response.body = 'deployment server is up'
  })
  .post('/deploy', (context) => {
    exec('bash -c "cd wheresmycrew-server && git pull && deno run --allow-read --allow-net app.js"')
    context.response.body = 'Deployment in progress'
})

let app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

app.listen({ port: 3000 })
console.log('worx')